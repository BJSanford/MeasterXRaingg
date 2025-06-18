import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-lg mb-4">
        MeasterRewards collects information to accurately provide rewards based on
        your performance and engagement. This information may include your
        Rain.gg account details, wagering history, and other relevant data
        necessary for reward calculation.
      </p>
      <p className="text-lg mb-4">
        Your data is stored securely and is not shared with third parties except
        as required by law or to facilitate reward distribution. By using
        MeasterRewards, you consent to the collection and use of your data as
        outlined in this policy.
      </p>
      <p className="text-lg mb-4">
        MeasterRewards may update this privacy policy at any time. Continued use
        of the platform constitutes acceptance of the updated policy.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Data Collection</h2>
      <p className="text-lg mb-4">
        MeasterRewards collects the following types of data:
        <ul className="list-disc ml-6">
          <li>
            Account information, including usernames and email addresses.
          </li>
          <li>
            Performance metrics, such as wagering history and engagement levels.
          </li>
          <li>
            Device and browser information for security and analytics purposes.
          </li>
        </ul>
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Data Storage and Security</h2>
      <p className="text-lg mb-4">
        All collected data is stored in secure databases with encryption protocols
        to prevent unauthorized access. Regular audits are conducted to ensure data
        integrity and security.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Data Sharing</h2>
      <p className="text-lg mb-4">
        MeasterRewards does not share your data with third parties except under
        the following circumstances:
        <ul className="list-disc ml-6">
          <li>Compliance with legal obligations.</li>
          <li>
            Facilitation of reward distribution through trusted partners.
          </li>
        </ul>
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">User Rights</h2>
      <p className="text-lg mb-4">
        Users have the right to request access to their data, correct
        inaccuracies, and delete their data upon account termination. Requests can
        be made through the support team.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
