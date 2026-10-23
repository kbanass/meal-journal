# Backlog

A detailed working list — unlike the README, small things can land here.
Not ordered by priority.

## Bugs

- **Double submit creates a duplicate meal.** The "Save meal" button in `EditMealModal`
  stays enabled while the photo is being compressed and saved (plus the 800 ms delay
  before the modal closes), so a second tap calls `saveMeal` again. The result is two
  records with different `id`s and the same `photoHash`. Deleting one of them also
  deletes the shared photo, so the other one is left without an image. Seen on a real
  user's device. Planned fix:
  1. Disable the submit button as soon as it's pressed, until the save finishes. This
     alone fixes the bug; 2 and 3 are UX improvements.
  2. Compress the photo in a Web Worker, starting when the modal opens rather than on
     submit, so the main thread isn't blocked and most of the work is done before the
     user taps "Save meal".
  3. Show a loading state and a placeholder while the photo is being processed.

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
