import { NextResponse } from 'next/server';
import { LENDING_LABELS, ROLE_LABELS } from '@/lib/contact';
import { isValidEmail, isValidPhone, stripControlChars } from '@/lib/validation';
import { clientIp, rateLimit } from '@/lib/rateLimit';

const ALLOWED_ROLES = new Set(['borrower', 'investor', 'advisor']);

function parseRecipients(value?: string): string[] {
  if (!value?.trim()) return [];
  return value
    .split(/[,;]+/)
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0 && isValidEmail(entry));
}

function recipientsForRole(roleType: string): string[] {
  const byRole: Record<string, string | undefined> = {
    borrower: process.env.CONTACT_TO_BORROWER,
    investor: process.env.CONTACT_TO_INVESTOR,
    advisor: process.env.CONTACT_TO_ADVISOR,
  };

  const roleList = parseRecipients(byRole[roleType]);
  if (roleList.length > 0) return roleList;

  const fallback = parseRecipients(process.env.CONTACT_TO_FALLBACK);
  if (fallback.length > 0) return fallback;

  // Legacy single fallback
  return parseRecipients(process.env.CONTACT_TO_EMAIL);
}

export async function POST(request: Request) {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot first — bots that fill hidden fields are silently ignored (before rate limit).
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const limit = rateLimit(`contact:${clientIp(request)}`, { limit: 8, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
    );
  }

  const firstName = stripControlChars(body.firstName?.trim() ?? '').slice(0, 100);
  const lastName = stripControlChars(body.lastName?.trim() ?? '').slice(0, 100);
  const email = stripControlChars(body.email?.trim() ?? '').slice(0, 200);
  const phone = stripControlChars(body.phone?.trim() ?? '').slice(0, 40);
  const roleType = stripControlChars(body.roleType?.trim() ?? '').slice(0, 40);
  const lendingAmount = stripControlChars(body.lendingAmount?.trim() ?? '').slice(0, 40);
  const comments = stripControlChars(body.comments?.trim() ?? '').slice(0, 5000);

  if (!firstName || !lastName || !email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter your name and a valid email address.' }, { status: 400 });
  }

  if (!phone || !isValidPhone(phone)) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 });
  }

  if (!ALLOWED_ROLES.has(roleType)) {
    return NextResponse.json({ error: 'Please select whether you are a borrower, investor, or advisor.' }, { status: 400 });
  }

  if (roleType === 'borrower' && !lendingAmount) {
    return NextResponse.json({ error: 'Please select an approximate lending requirement.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!fromEmail?.trim()) {
    console.error('[contact] CONTACT_FROM_EMAIL is not set');
    return NextResponse.json(
      { error: 'Contact form is not configured yet. Please email us directly.' },
      { status: 503 },
    );
  }

  const recipients = recipientsForRole(roleType);

  const message = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Role: ${ROLE_LABELS[roleType] ?? roleType}`,
    roleType === 'borrower' ? `Lending requirement: ${LENDING_LABELS[lendingAmount] ?? lendingAmount}` : null,
    comments ? `\nComments:\n${comments}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  if (!apiKey || recipients.length === 0) {
    console.error('[contact] Missing RESEND_API_KEY or no recipients configured (CONTACT_TO_* env)');
    return NextResponse.json(
      { error: 'Contact form is not configured yet. Please email us directly.' },
      { status: 503 },
    );
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipients,
      reply_to: email,
      subject: `PCG contact enquiry — ${firstName} ${lastName} (${ROLE_LABELS[roleType] ?? roleType})`,
      text: message,
    }),
  });

  if (!response.ok) {
    console.error('[contact] Resend error', await response.text());
    return NextResponse.json(
      { error: 'We could not send your message. Please try again or contact us directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
