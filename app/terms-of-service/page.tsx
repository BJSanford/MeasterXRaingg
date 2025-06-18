import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 animate-text bg-[size:300%_300%]">
          Terms of Service
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">General Terms</h2>
            <p>
              MeasterRewards reserves the right to withhold rewards at its sole discretion. Rewards are not guaranteed
              and are considered extra bonuses provided by MeasterRewards. Participation in the program does not entitle
              you to any specific rewards, and all rewards are subject to availability and eligibility criteria.
            </p>
            <p className="mt-4">
              By using MeasterRewards, you agree to these terms and conditions. MeasterRewards may update these terms at
              any time without prior notice. Continued use of the platform constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their account information and ensuring that
              their activities on the platform comply with all applicable laws and regulations. Any misuse of the
              platform, including fraudulent activities, will result in immediate account suspension and potential legal
              action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Prohibited Activities</h2>
            <p>The following activities are strictly prohibited:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Using automated tools or bots to manipulate rewards or engagement metrics.</li>
              <li>Sharing or selling account access to third parties.</li>
              <li>Engaging in any form of harassment or abusive behavior towards other users or staff.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Dispute Resolution</h2>
            <p>
              Any disputes arising from the use of MeasterRewards will be resolved through binding arbitration in
              accordance with the laws of the jurisdiction in which MeasterRewards operates. Users waive their right to
              participate in class-action lawsuits against MeasterRewards.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
