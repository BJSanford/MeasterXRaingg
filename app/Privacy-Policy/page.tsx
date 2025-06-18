import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 animate-text bg-[size:300%_300%]">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information Collection</h2>
            <p>
              MeasterRewards collects information to accurately provide rewards based on your performance and
              engagement. This information may include your Rain.gg account details, wagering history, and other
              relevant data necessary for reward calculation.
            </p>
            <p className="mt-4">
              Your data is stored securely and is not shared with third parties except as required by law or to
              facilitate reward distribution. By using MeasterRewards, you consent to the collection and use of your
              data as outlined in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Collection</h2>
            <p>MeasterRewards collects the following types of data:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Account information, including usernames and email addresses.</li>
              <li>Performance metrics, such as wagering history and engagement levels.</li>
              <li>Device and browser information for security and analytics purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Storage and Security</h2>
            <p>
              All collected data is stored in secure databases with encryption protocols to prevent unauthorized access.
              Regular audits are conducted to ensure data integrity and security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing</h2>
            <p>MeasterRewards does not share your data with third parties except under the following circumstances:</p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Compliance with legal obligations.</li>
              <li>Facilitation of reward distribution through trusted partners.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">User Rights</h2>
            <p>
              Users have the right to request access to their data, correct inaccuracies, and delete their data upon
              account termination. Requests can be made through the support team.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
