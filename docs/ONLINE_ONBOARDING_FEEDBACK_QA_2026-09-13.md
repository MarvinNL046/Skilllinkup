# Online onboarding, recovery and toast feedback

Date: 13 September 2026. Environment: localhost:3011, development Clerk and Convex accurate-anaconda-993. Base commit: 2d2a38d49d2bbc6d7d9f108bb6dcbc5df84bead5 plus the local changes described below. These changes have not been deployed by this task.

## Changes

- Existing Sonner notifications now share AppToaster: white surface, brand typography, semantic icons, close control, six-second default duration and top placement below navigation. No second notification library or duplicate host.
- Successful onboarding confirms persistence before navigating. Stable toast ID avoids stacking the same confirmation. Validation/save errors remain in the form, with focus and retry; no false success on failed writes.
- Restored Clerk's own header. The old global `display: none` hid recovery instructions and the verification destination, not just the initial sign-in title.

## Browser evidence

Only the existing development freelancer QA account was used; no new production accounts, public fake inventory, customer messages or password changes.

| Check | Result |
|---|---|
| Online role, empty skills, Finish setup | Refused; “Choose at least one online skill.” receives focus |
| Select Web development, enter synthetic QA headline, reload | Step 2, skill and headline restored; visible restored-draft notice |
| Finish setup | Dashboard redirect; “Your account setup is saved.” visible in global notification region |
| Open profile after navigation/reload | QA headline and selected skill persisted |
| Save Profile | Existing success toast uses the shared host |
| Desktop and 390 × 844 viewport | Toast visually verified below navigation, text fits, close control inside card |
| Alt+T and dismiss | Focus reaches notification region; notification remains while focused; close button removes it |
| Logout/login with preserved /my-profile return | Successful email-code sign-in returns to intended profile |
| Invalid development verification code | “Incorrect code” shown; retry available |
| Forgot password → Reset your password | “Reset password”, email destination and code instructions visible after fix |
| Valid development recovery code | “Set new password” with password/confirmation fields reached |

The first recovery attempt was interrupted by hot reload and followed the normal email-code sign-in path. A second uninterrupted attempt explicitly verified recovery through “Set new password”. The final credential entry/submission was not performed: browser control requires the user to complete password changes. This is not an end-to-end password reset signoff, nor proof of real email delivery (development test codes were used).

This account already existed. Fresh production invitation/registration remains a separate acceptance gate. Browser viewport coverage is not a new physical-device signoff.

## Automated verification

- Dashboard MVP suite passed: 38 scenario groups plus order-attention and history-search checks. Existing onboarding failure/retry tests extended to assert no success notification after failure, and exactly one confirmation after persistence and before redirect.
- Auth redirect suite passed: 11 checks, including 43 rejected URL variants.
- ESLint passed for changed JS/JSX and regression harness.
- TypeScript no-emit check passed.
- Next production build passed after the final authentication styling change.

## Remaining work

- User-completed final password change and subsequent login, when a full reset signoff is required.
- Preview/release verification before publishing these local changes.
- Separate currency consistency finding: onboarding labels hourly rate in EUR, while the English profile editor labels it with `$`. No nonzero rate was used in this test; investigate currency storage and display together before changing labels or values.
- Broader first-user acceptance (new invitation/registration) and production release evidence remain in the Online-first launch plan.
