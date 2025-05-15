import Link from "next/link";

export default function VerificationPendingPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Verification Pending</h1>
                <p className="mb-4 text-gray-300">
                    Your account is pending verification by a moderator. Please check Discord for further instructions.
                </p>
                <Link href="/login">
                    <a className="text-blue-500 underline">Go back to Login</a>
                </Link>
            </div>
        </div>
    );
}
