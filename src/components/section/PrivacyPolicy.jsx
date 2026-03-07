export default function PrivacyPolicy() {
  return (
    <section className="our-terms pb90">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="main-title mb40">
              <h2>Privacy Policy</h2>
              <p className="text">Last updated: March 2026</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-10">
            <div className="terms_condition_grid text-start">
              <div className="grids mb50">
                <h4 className="title mb15">1. Introduction</h4>
                <p className="text fz15 mb15">
                  SkillLinkup B.V. (&ldquo;SkillLinkup&rdquo;, &ldquo;we&rdquo;,
                  &ldquo;us&rdquo;) is a freelance marketplace based in The Netherlands.
                  This Privacy Policy explains what personal data we collect when you use
                  skilllinkup.com, why we collect it, and how we handle it in compliance
                  with the General Data Protection Regulation (GDPR) and applicable Dutch
                  law.
                </p>
                <p className="text fz15">
                  By creating an account or using our platform, you acknowledge that you
                  have read and understood this policy. If you have questions, contact us
                  at{" "}
                  <a href="mailto:info@skilllinkup.com" className="text-thm">
                    info@skilllinkup.com
                  </a>
                  .
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">2. Information We Collect</h4>
                <p className="text fz15 mb15">
                  <strong>Account data</strong> &mdash; When you sign up or log in,
                  authentication is handled by Clerk. Clerk collects your name, email
                  address, and (optionally) a profile photo. If you use Google or another
                  OAuth provider to sign in, Clerk receives the data your provider shares
                  with us. We store your Clerk user ID in our own database to link your
                  account to your marketplace activity.
                </p>
                <p className="text fz15 mb15">
                  <strong>Profile and marketplace data</strong> &mdash; Freelancers can
                  add additional profile information such as skills, a bio, portfolio
                  items, hourly rate, and location. Clients provide project descriptions
                  and requirements when posting jobs or requesting quotes.
                </p>
                <p className="text fz15">
                  <strong>Usage data</strong> &mdash; We use PostHog to collect
                  anonymised analytics including pages visited, features used, session
                  duration, and general geographic region (country level). PostHog
                  processes this data on our behalf and does not sell it to third parties.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">3. How We Use Your Information</h4>
                <p className="text fz15 mb15">
                  We use your personal data to operate and improve SkillLinkup. This
                  includes: authenticating your account and keeping it secure; matching
                  freelancers with relevant job opportunities; processing payments and
                  managing escrow; sending transactional emails (order confirmations,
                  dispute updates, earnings notifications); and resolving disputes between
                  users.
                </p>
                <p className="text fz15">
                  We may also use anonymised, aggregated data to understand how the
                  platform is used and to improve features. We do not sell your personal
                  data to third parties, and we do not use it for automated
                  decision-making that produces legal or similarly significant effects
                  without human review.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">4. Cookies &amp; Tracking</h4>
                <p className="text fz15 mb15">
                  <strong>Authentication cookies</strong> &mdash; Clerk sets session
                  cookies that are strictly necessary to keep you logged in. These cookies
                  do not track you across other websites and cannot be disabled without
                  breaking login functionality.
                </p>
                <p className="text fz15">
                  <strong>Analytics cookies</strong> &mdash; PostHog places cookies to
                  distinguish unique sessions and track user flows within SkillLinkup. We
                  have configured PostHog to anonymise IP addresses and to respect Do Not
                  Track signals. No data collected by PostHog is used for cross-site
                  advertising. You may opt out of PostHog tracking by visiting our cookie
                  settings or by using a browser extension that blocks analytics scripts.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">5. Payment Data</h4>
                <p className="text fz15 mb15">
                  Payments on SkillLinkup are processed by Stripe. When you enter payment
                  details, that information is submitted directly to Stripe and is never
                  seen or stored by SkillLinkup&apos;s servers. Stripe is certified to
                  PCI DSS Level 1, the highest standard for card data security.
                </p>
                <p className="text fz15">
                  We receive from Stripe a transaction reference, the last four digits of
                  your card (for display purposes only), and your payout account details
                  if you are a freelancer connected via Stripe Connect. Your full card
                  number, CVV, and other sensitive payment credentials are never
                  accessible to us.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">6. Data Sharing</h4>
                <p className="text fz15 mb15">
                  We share your data only with the third-party services required to
                  operate the platform. Each provider acts as a data processor under a
                  Data Processing Agreement:
                </p>
                <p className="text fz15 mb15">
                  <strong>Clerk</strong> &mdash; Identity and authentication. Your login
                  credentials and authentication tokens are stored and managed by Clerk.
                  Clerk is SOC 2 Type II certified and stores data in EU-based
                  infrastructure where available.
                </p>
                <p className="text fz15 mb15">
                  <strong>Stripe</strong> &mdash; Payment processing and payouts.
                  Freelancers who accept payments connect a Stripe account; Stripe handles
                  all financial data in accordance with their own privacy policy and PCI
                  DSS obligations.
                </p>
                <p className="text fz15 mb15">
                  <strong>PostHog</strong> &mdash; Product analytics. Anonymised usage
                  events are sent to PostHog to help us understand feature adoption and
                  platform performance.
                </p>
                <p className="text fz15">
                  <strong>Convex</strong> &mdash; Real-time data infrastructure.
                  Marketplace data such as messages, orders, milestones, and gig listings
                  are stored in Convex. Convex processes this data on our behalf and does
                  not use it for its own purposes.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">7. Your Rights Under GDPR</h4>
                <p className="text fz15 mb15">
                  As a resident of the European Economic Area, you have the following
                  rights regarding your personal data:
                </p>
                <p className="text fz15 mb15">
                  <strong>Access</strong> &mdash; You can request a copy of the personal
                  data we hold about you at any time.
                </p>
                <p className="text fz15 mb15">
                  <strong>Rectification</strong> &mdash; You can correct inaccurate or
                  incomplete data by updating your profile or contacting us directly.
                </p>
                <p className="text fz15 mb15">
                  <strong>Erasure</strong> &mdash; You can request that we delete your
                  account and personal data. We will do so unless we are legally required
                  to retain certain records (e.g. financial transaction history for tax
                  purposes).
                </p>
                <p className="text fz15 mb15">
                  <strong>Portability</strong> &mdash; You can request your data in a
                  structured, machine-readable format.
                </p>
                <p className="text fz15">
                  <strong>Objection</strong> &mdash; You can object to processing based
                  on legitimate interests or withdraw consent where processing is based on
                  consent. To exercise any of these rights, email us at{" "}
                  <a href="mailto:info@skilllinkup.com" className="text-thm">
                    info@skilllinkup.com
                  </a>
                  . We will respond within 30 days. You also have the right to lodge a
                  complaint with the Dutch Data Protection Authority (Autoriteit
                  Persoonsgegevens) at autoriteitpersoonsgegevens.nl.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">8. Data Retention</h4>
                <p className="text fz15 mb15">
                  We retain your account data for as long as your account is active. If
                  you close your account, we delete your personal profile data within 90
                  days. We retain financial transaction records for seven years to comply
                  with Dutch bookkeeping requirements (Wet op de jaarrekening).
                </p>
                <p className="text fz15">
                  Anonymised analytics data collected via PostHog may be retained
                  indefinitely as it cannot be linked back to an individual.
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">9. Security</h4>
                <p className="text fz15 mb15">
                  We take technical and organisational measures to protect your data
                  against unauthorised access, loss, or disclosure. These include
                  encrypted data transmission (HTTPS/TLS), row-level security in our
                  database, multi-tenant data isolation, and access controls limiting
                  which team members can view user data.
                </p>
                <p className="text fz15">
                  Authentication is delegated to Clerk, which provides features such as
                  multi-factor authentication, bot protection, and anomaly detection.
                  Despite these measures, no system is completely secure. If you suspect
                  a security issue, please contact us immediately at{" "}
                  <a href="mailto:info@skilllinkup.com" className="text-thm">
                    info@skilllinkup.com
                  </a>
                  .
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">10. Children&apos;s Privacy</h4>
                <p className="text fz15">
                  SkillLinkup is intended for users aged 13 and older. We do not
                  knowingly collect personal data from children under 13. If we become
                  aware that a user is under 13, we will promptly close the account and
                  delete the associated data. If you believe a child under 13 has
                  registered on our platform, please contact us at{" "}
                  <a href="mailto:info@skilllinkup.com" className="text-thm">
                    info@skilllinkup.com
                  </a>
                  .
                </p>
              </div>

              <div className="grids mb50">
                <h4 className="title mb15">11. Changes to This Policy</h4>
                <p className="text fz15">
                  We may update this Privacy Policy when we introduce new features,
                  change our service providers, or when laws require it. We will notify
                  registered users of material changes by email or by displaying a
                  prominent notice on the platform. The &ldquo;Last updated&rdquo; date
                  at the top of this page always reflects the most recent version.
                  Continued use of SkillLinkup after changes take effect constitutes
                  acceptance of the updated policy.
                </p>
              </div>

              <div className="grids">
                <h4 className="title mb15">12. Contact</h4>
                <p className="text fz15">
                  For privacy-related questions, data requests, or complaints, contact us
                  at{" "}
                  <a href="mailto:info@skilllinkup.com" className="text-thm">
                    info@skilllinkup.com
                  </a>
                  . SkillLinkup is registered in The Netherlands. We aim to respond to
                  all privacy enquiries within 5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
