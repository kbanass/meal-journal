# Authentication

## Decision

Passwordless login with a short-lived numeric code sent by email, plus a JWT access
token and a rotating refresh token for the session.

## Why not a magic link

A magic link requires the user to click a link from their email app. On iOS, that link
always opens Safari, never an already-installed home-screen PWA — this is a platform
limitation, not something the app can control, since the OS decides which app handles the
link before any of the app's own code runs. The user would end up logged in inside Safari,
with no reliable way to jump into the installed app automatically.

A code typed into a form sidesteps this entirely: the user stays in whichever context they
already opened the app in (browser tab or installed app), reads the code from their email,
and types it in. No cross-app handoff involved.

## Why not a password

The project has no existing user base, no password reset flow to maintain, and a single
sign-in method keeps the attack surface small. Email delivery is already required for the
code anyway.

## Flow

1. User enters their email on the login screen.
2. Server generates a 6-digit code, stores its hash in D1 with an expiry and an attempt
   counter, and emails it via Resend.
3. User types the code into the app.
4. Server checks the hash and expiry, increments the attempt counter on every check.
5. On success: issue an access token (JWT, short-lived) and a refresh token (long-lived),
   delete the used code. On failure: increment attempts; after a limit, invalidate the code
   and require a new one.

## Session refresh

Access tokens are short-lived (minutes) and sent with every API request. Refresh tokens
are long-lived (weeks) and only used to obtain a new access token, so a user who loses
network for a while doesn't get logged out — reconnecting silently refreshes the access
token instead of forcing a new login.

Refresh tokens rotate on every use: each refresh issues a new refresh token and invalidates
the one just used. If an already-rotated-away refresh token is ever presented again, that's
a signal the token leaked — the whole session is revoked, not just that one token.

The app doesn't need any token while working offline. Local reads/writes to IndexedDB and
OPFS don't touch the server at all; the token is only checked when actually syncing.

## Data model (D1)

- **Login codes:** hash of the code, the email it was sent to, expiry, attempt count.
- **Sessions:** hash of the current refresh token, user id, expiry. Used to detect
  rotation reuse and to support "log out everywhere".

## Security notes to apply when implementing

- Code: 6 digits, expires in 10–15 minutes, max 5 verification attempts before it's
  invalidated and a new one must be requested.
- Store hashes of codes and refresh tokens in D1, never the raw values.
- JWT signing secret lives as a Worker secret, never committed, never in `wrangler.jsonc`.
- Rate-limit the "send code" endpoint per email address, to stop someone from spamming a
  stranger's inbox.

## Open questions

- Where the refresh token is stored on the client. `httpOnly` cookies are safer against
  XSS but awkward across the client/API origin split; IndexedDB is simpler but readable
  by any JS on the page. Leaning IndexedDB for now as a deliberate, acceptable tradeoff
  for a personal project, not an oversight.
- Whether the login/code-verification screen needs to detect `display-mode: standalone` /
  `navigator.standalone` and adjust its messaging when the user is already inside the
  installed app vs. a regular browser tab.
