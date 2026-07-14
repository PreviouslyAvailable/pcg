import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/validation';

export async function POST(request: Request) {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — bots that fill hidden fields are silently ignored.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';

  if (!name) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.CAMPAIGN_MONITOR_API_KEY?.trim();
  const listId = process.env.CAMPAIGN_MONITOR_LIST_ID?.trim();

  if (!apiKey || !listId) {
    console.error('[newsletter] Missing CAMPAIGN_MONITOR_API_KEY or CAMPAIGN_MONITOR_LIST_ID');
    return NextResponse.json(
      { error: 'Newsletter signup is not configured yet. Please try again later.' },
      { status: 503 },
    );
  }

  const auth = Buffer.from(`${apiKey}:x`).toString('base64');

  const response = await fetch(`https://api.createsend.com/api/v3.3/subscribers/${listId}.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      EmailAddress: email,
      Name: name,
      Resubscribe: true,
      ConsentToTrack: 'Yes',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[newsletter] Campaign Monitor error', response.status, errorText);

    // Already subscribed — treat as success so the form doesn't error.
    if (response.status === 400 && /already|exists|subscribed/i.test(errorText)) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { error: 'We could not subscribe you right now. Please try again.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
