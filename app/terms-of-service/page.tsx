import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 animate-text bg-[size:300%_300%]">
          MeasterRewards Terms of Service
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Overview of MeasterRewards</h2>
            <p>
              MeasterRewards is a community-based loyalty and reward system, designed to reward participants in the
              Measter streaming community and those engaging with Rain.gg via affiliated activity. It is not an online
              store; nothing on the platform is bought or sold. Rewards are provided solely at Measter’s discretion as a
              gesture of appreciation for engagement and loyalty.
            </p>
            <p className="mt-4">
              Participation is voluntary and offers no guarantee of monetary value or compensation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. General Terms</h2>
            <p>
              By participating in MeasterRewards, you agree to abide by these Terms of Service. Rewards are limited, not
              guaranteed, and are subject to availability, performance, and eligibility criteria.
            </p>
            <p className="mt-4">
              Measter reserves the right to update, suspend, or terminate the program and its associated benefits at any
              time, with or without notice. Continued use of the platform after updates constitutes acceptance of the
              revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Account Creation and Security</h2>
            <p>
              When you create an account or connect to MeasterRewards, you must provide accurate, current, and complete
              information. Failing to do so constitutes a breach of the Terms and may result in immediate suspension or
              termination of your account.
            </p>
            <p className="mt-4">You are responsible for:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Safeguarding your login credentials.</li>
              <li>Any activity that occurs under your account, whether authorized or not.</li>
              <li>Immediately reporting any unauthorized use or security breach to Measter staff.</li>
            </ul>
            <p className="mt-4">
              Usernames that impersonate others, violate trademarks, or contain offensive or obscene language are
              strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. User Responsibilities</h2>
            <p>You must:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Use MeasterRewards in good faith.</li>
              <li>Avoid manipulation, exploitation, or abuse of the system or community.</li>
              <li>Follow all applicable laws, platform rules, and community standards.</li>
            </ul>
            <p className="mt-4">Violations may result in account suspension, reward revocation, or permanent bans.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Prohibited Activities</h2>
            <p>Strictly prohibited actions include:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Using bots, scripts, or automation to interact with the platform or claim rewards.</li>
              <li>Sharing, renting, or selling your account.</li>
              <li>Fraudulent manipulation of engagement or activity metrics.</li>
              <li>Harassment or abuse of other users or Measter staff.</li>
              <li>Attempting to exploit system vulnerabilities or gain unfair advantages.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Content Policy</h2>
            <h3 className="text-xl font-semibold text-white mb-2">User Content Rights</h3>
            <p>
              If you post or submit content to MeasterRewards (such as usernames, messages, or media), you retain
              ownership of your content, but you grant Measter a non-exclusive, royalty-free, global license to use,
              modify, display, and distribute it as part of the platform.
            </p>
            <p className="mt-4">You confirm that:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>You own or have rights to the content you post.</li>
              <li>Your content does not violate laws, privacy, copyrights, or the rights of others.</li>
            </ul>
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Content Restrictions</h3>
            <p>You may not submit content that is:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Illegal, defamatory, obscene, or threatening.</li>
              <li>Harassing, hateful, or discriminatory.</li>
              <li>Infringing upon intellectual property rights.</li>
              <li>Fraudulent, misleading, or malicious.</li>
            </ul>
            <p className="mt-4">
              Measter reserves the right (but not the obligation) to review, edit, or remove content at its sole
              discretion. Violation may lead to restricted access or termination of your account.
            </p>
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">Content Backups</h3>
            <p>
              Although backups may be performed regularly, Measter does not guarantee that submitted content will be
              preserved. Users are responsible for maintaining independent backups of any content they wish to retain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Copyright and Intellectual Property</h2>
            <h3 className="text-xl font-semibold text-white mb-2">Copyright Policy</h3>
            <p>
              Measter respects intellectual property rights. If you believe your copyrighted work has been used on
              MeasterRewards without authorization, you may submit a detailed claim via Measter's official contact
              channels (e.g., platform support, Discord staff, or official ticketing system).
            </p>
            <p className="mt-4">False or malicious claims may result in account penalties or legal liability.</p>
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">DMCA Notice</h3>
            <p>
              To comply with the Digital Millennium Copyright Act (DMCA), copyright holders may submit formal notices
              with all required legal elements. Upon receiving a valid notice, Measter will review and, if necessary,
              remove the content in question.
            </p>
            <p className="mt-4">
              Further actions, including warnings or account termination, may follow if infringement is confirmed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Dispute Resolution</h2>
            <p>
              Any disputes related to MeasterRewards will be resolved internally by Measter and its designated team. By
              using the service, you agree that:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Measter’s decisions on reward eligibility, access, and enforcement are final.</li>
              <li>
                You waive your right to participate in class-action lawsuits or mass arbitration related to
                MeasterRewards.
              </li>
              <li>
                All disputes must go through informal resolution with Measter staff before pursuing external recourse.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">9. Termination of Access</h2>
            <p>
              Measter reserves the right to suspend or terminate your access to MeasterRewards at any time, with or
              without notice, especially if you are found to violate these terms or compromise the integrity of the
              platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">10. Acknowledgment</h2>
            <p>By continuing to use MeasterRewards, you acknowledge that:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>You have read, understood, and agreed to these Terms of Service.</li>
              <li>You understand MeasterRewards is a discretionary reward system, not a marketplace.</li>
              <li>
                You release Measter from liability for any loss of access, content, or unclaimed rewards, except where
                required by law.
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
