# Backlog

A detailed working list — unlike the README, small things can land here.
Not ordered by priority.

## Server / sync

- `server/` is only a skeleton for now (`/health` + defined D1/R2 bindings, no logic)
- Endpoints for uploading metadata (D1) and photos (R2)
- Use `isMetaSynced`/`isPhotoSynced` from `MealLocal` for an actual sync queue
- Authentication (`Login.tsx` is currently an empty stub)

## Tabs

- `Profile.tsx` is currently an empty stub

## Tests

- `DexieMealRepository` via `fake-indexeddb` (the current integration tests mock the whole port)
- Tests for `compressImage` — requires an environment with DOM/Canvas (Vitest Browser Mode);
  the current `environment: "node"` in the test config doesn't support that

## UI

- Migrate the UI to Framework7. Deliberately scheduled for **after** the whole auth +
  sync arc is functionally done, not before and not mixed in with it — two unfamiliar
  big things (backend auth/sync, and a new UI framework) at once make it hard to tell
  which one a bug belongs to. Expect to re-skin the login/sync screens once more as
  part of this migration; that's an accepted cost of not multitasking.

## Small things

- Fine-tune the `getDayMood` algorithm (currently: ≥2 bad meals = bad day) — to be
  verified in real use, whether the threshold reflects the actual feeling well
