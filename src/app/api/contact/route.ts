import { NextResponse } from 'next/server';

const LENDING_LABELS: Record<string, string> = {
  '5-10': '$5M – $10M',
  '10-25': '$10M – $25M',
  '25-50': '$25M – $50M',
  '50-75': '$50M – $75M',
  '75+': '$75M+',
};

const ROLE_LABELS: Record<string, string> = {
  borrower: 'Borrower',
  investor: 'Investor',
  advisor: 'Professional Advisor',
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const firstName = body.firstName?.trim() ?? '';
  const lastName = body.lastName?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const phone = body.phone?.trim() ?? '';
  const roleType = body.roleType?.trim() ?? '';
  const lendingAmount = body.lendingAmount?.trim() ?? '';
  const comments = body.comments?.trim() ?? '';

  if (!firstName || !lastName || !email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter your name and a valid email address.' }, { status: 400 });
  }

  if (!roleType) {
    return NextResponse.json({ error: 'Please select whether you are a borrower, investor, or advisor.' }, { status: 400 });
  }

  if (roleType === 'borrower' && !lendingAmount) {
    return NextResponse.json({ error: 'Please select an approximate lending requirement.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'PCG Website <onboarding@resend.dev>';

  const message = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Role: ${ROLE_LABELS[roleType] ?? roleType}`,
    roleType === 'borrower' ? `Lending requirement: ${LENDING_LABELS[lendingAmount] ?? lendingAmount}` : null,
    comments ? `\nComments:\n${comments}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  if (!apiKey || !toEmail) {
    console.error('[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL');
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
      to: [toEmail],
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
