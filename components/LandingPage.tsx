"use client";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-2xl shadow-lg px-8 py-12 flex flex-col items-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome to NextGen</h1>
        <p className="text-gray-600 mb-8 text-center">
          Experience a simple, modern registration journey.<br />
          Click below to get started!
        </p>
        <button
          onClick={() => router.push("/registration")}
          className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition"
        >
          Go to Registration
        </button>
      </div>
    </div>
  );
};

export default LandingPage;