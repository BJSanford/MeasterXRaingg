import Link from "next/link";

export default function VerificationPendingPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Verification Pending</h1>
                <p className="mb-4">
                    Your account is pending verification by a moderator. Please check Discord for further instructions.
                </p>
                <Link href="/login">
                    <a className="text-blue-500 underline">Go back to Login</a>
                </Link>
            </div>
        </div>
    );
}
