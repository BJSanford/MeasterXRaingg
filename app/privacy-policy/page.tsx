import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 animate-text bg-[size:300%_300%]">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-400">Effective Date: June 17, 2025</p>
          <p>
            This Privacy Policy explains how MeasterRewards collects, uses, shares, and protects your personal data when
            you participate in the program. By using MeasterRewards, you consent to the practices described below.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. What Information Do We Collect?</h2>
            <h3 className="text-xl font-medium text-white mb-2">Personal Information You Provide</h3>
            <p>We collect personal information that you voluntarily provide, including when you:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Register for MeasterRewards;</li>
              <li>Connect your Rain.gg or streaming accounts;</li>
              <li>Participate in activities related to rewards or community engagement;</li>
              <li>Contact us directly.</li>
            </ul>
            <p className="mt-2">This may include:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Usernames or unique identifiers;</li>
              <li>Contact information (e.g., email addresses if applicable);</li>
              <li>Authentication data;</li>
              <li>Optional social media login data.</li>
            </ul>
            <p className="mt-2">All personal information you provide must be accurate and up-to-date.</p>

            <h3 className="text-xl font-medium text-white mt-6 mb-2">Automatically Collected Data</h3>
            <p>When you use MeasterRewards, we automatically collect:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Log and Usage Data:</strong> IP address, browser type, device characteristics, pages accessed,
                engagement metrics, and timestamps.
              </li>
              <li>
                <strong>Device Data:</strong> Device name, OS, language settings.
              </li>
              <li>
                <strong>Location Data:</strong> Based on your IP address or device settings, where applicable.
              </li>
            </ul>
            <p className="mt-2">
              We use cookies and similar technologies to support these processes. You may adjust your browser settings
              to refuse cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How Do We Process Your Information?</h2>
            <p>We process your data to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Track engagement and distribute rewards accurately;</li>
              <li>Authenticate users and manage accounts;</li>
              <li>Improve MeasterRewards through internal analytics;</li>
              <li>Monitor usage trends and prevent fraud;</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Legal Bases for Processing (GDPR / Canada Compliance)
            </h2>
            <p>We only process your personal data when we have a valid legal basis to do so, including:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Consent, which can be withdrawn at any time;</li>
              <li>Legitimate interests, such as analytics and program security;</li>
              <li>Legal obligations, such as responding to law enforcement;</li>
              <li>Contractual necessity, such as facilitating participation in the rewards program.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. When and With Whom Do We Share Your Information?
            </h2>
            <p>We do not sell your personal data. We may share limited data:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>With trusted service providers or platform partners (e.g., Rain.gg) for reward distribution;</li>
              <li>For analytics to understand user behavior and improve the service;</li>
              <li>In the event of a business transfer, merger, or acquisition;</li>
              <li>To comply with legal or regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Cookies and Tracking Technologies</h2>
            <p>
              MeasterRewards may use cookies, web beacons, or similar tools for functionality, analytics, and user
              experience enhancement. You can disable cookies in your browser settings, but doing so may limit access to
              certain features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Social Logins</h2>
            <p>
              If you register or log in using social media credentials (e.g., Twitch, Discord), we may access basic
              profile data depending on your permissions. We only use this data for authentication and platform
              functionality. Please refer to your social platform’s privacy settings to manage what data is shared.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. How Long Do We Keep Your Information?</h2>
            <p>We retain your data only as long as necessary to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Provide rewards and support user accounts;</li>
              <li>Fulfill our legal obligations;</li>
              <li>Protect the platform from misuse.</li>
            </ul>
            <p className="mt-2">
              When no longer needed, your information is securely deleted or anonymized. Some data may persist in secure
              backups for legal or security purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. How Do We Keep Your Information Safe?</h2>
            <p>
              We use industry-standard encryption and access controls to protect your data. While no system is 100%
              secure, we actively monitor and update our security infrastructure to reduce risk.
            </p>
            <p className="mt-2">You are responsible for safeguarding your account credentials.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Do We Collect Information From Minors?</h2>
            <p>
              MeasterRewards is not intended for users under 18. If we learn that we’ve collected data from a user under
              18, we will promptly delete it. If you believe a minor has provided us with personal data, please contact
              our support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. What Are Your Privacy Rights?</h2>
            <p>Depending on your location (e.g., EEA, UK, Canada), you may have the right to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Request access to your data;</li>
              <li>Request corrections or deletion;</li>
              <li>Restrict or object to processing;</li>
              <li>Withdraw consent at any time.</li>
            </ul>
            <p className="mt-2">
              You may also request to close your account and delete your data via the MeasterRewards support team (e.g.,
              Discord ticket system).
            </p>
            <p className="mt-2">If you are in the EU/UK, you may also contact your local data authority:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>EU: Data Protection Authorities</li>
              <li>Switzerland: Swiss DPA</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">11. Do Not Track (DNT) Controls</h2>
            <p>
              MeasterRewards currently does not respond to Do-Not-Track (DNT) browser signals, as no consistent standard
              has been adopted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">12. California Privacy Rights (CCPA/CPRA)</h2>
            <p>California residents may:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Request a summary of the personal information shared for marketing purposes (if applicable);</li>
              <li>Request the removal of personal content posted publicly by a minor.</li>
            </ul>
            <p className="mt-2">
              To submit a California rights request, please contact the MeasterRewards support team through official
              channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">13. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any major changes will be communicated via platform
              announcements or messages. The latest version will always be available publicly with the most recent
              revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">14. How to Contact Us</h2>
            <p>
              For privacy-related concerns, please reach out to us directly through the MeasterRewards support system
              (e.g., via Discord tickets or platform contact page). No support email is used at this time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">15. Accessing, Updating, or Deleting Your Data</h2>
            <p>
              You may request access, updates, or deletion of your personal information by contacting our support team
              through official Measter channels. We will respond to valid requests in accordance with applicable data
              protection law.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
