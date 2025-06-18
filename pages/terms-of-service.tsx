import React from "react";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="text-lg mb-4">
        MeasterRewards reserves the right to withhold rewards at its sole
        discretion. Rewards are not guaranteed and are considered extra bonuses
        provided by MeasterRewards. Participation in the program does not entitle
        you to any specific rewards, and all rewards are subject to availability
        and eligibility criteria.
      </p>
      <p className="text-lg mb-4">
        By using MeasterRewards, you agree to these terms and conditions.
        MeasterRewards may update these terms at any time without prior notice.
        Continued use of the platform constitutes acceptance of the updated terms.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">User Responsibilities</h2>
      <p className="text-lg mb-4">
        Users are responsible for maintaining the confidentiality of their account
        information and ensuring that their activities on the platform comply
        with all applicable laws and regulations. Any misuse of the platform,
        including fraudulent activities, will result in immediate account
        suspension and potential legal action.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Prohibited Activities</h2>
      <p className="text-lg mb-4">
        The following activities are strictly prohibited:
        <ul className="list-disc ml-6">
          <li>
            Using automated tools or bots to manipulate rewards or engagement
            metrics.
          </li>
          <li>Sharing or selling account access to third parties.</li>
          <li>
            Engaging in any form of harassment or abusive behavior towards other
            users or staff.
          </li>
        </ul>
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Dispute Resolution</h2>
      <p className="text-lg mb-4">
        Any disputes arising from the use of MeasterRewards will be resolved
        through binding arbitration in accordance with the laws of the
        jurisdiction in which MeasterRewards operates. Users waive their right
        to participate in class-action lawsuits against MeasterRewards.
      </p>
    </div>
  );
};

export default TermsOfService;
