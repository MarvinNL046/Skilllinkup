# Candidate next steps

Each application status now explains the next available action in plain English. Messaging guidance follows the existing backend eligibility: screening, interview, offer and hired. An offer status explicitly does not accept an offer on the candidate's behalf. Closed and withdrawn applications link to other vacancies. Removed vacancies do not expose a broken message action. Message buttons use the normal shared button size.

Validation on 14 September 2026:
- Dashboard regression suite passed, including all eight status values, message eligibility, closed vacancy links and removed vacancy behavior.
- TypeScript and targeted ESLint passed.
- Chrome with dedicated candidate QA: submitted, screening, offer and withdrawn content reviewed using closed synthetic vacancies. The other-jobs link reached the vacancy directory.
- At 390 × 844, text fits without horizontal overflow. Decorative company icons are hidden below 480px to leave more reading space. No browser console errors. Physical phone testing was not performed.
- Four synthetic vacancies and applications were removed and the temporary helper was removed from the development backend. No messages were sent.

Frontend-only release. No schema or production backend change required. Rollback by reverting the frontend commit if guidance or message actions regress.

Suggested next step: review equivalent status explanations on the employer side, so both participants understand what each stage means.
