import { Button } from "@/app/components/ui/button";
import { dummyInterviews } from "@/constants";
import Link from "next/link";
import React from "react";
import InterviewCard from "../components/InterviewCard";
import { ArrowRight, PlusCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

const Page = async () => {
  const user = await getCurrentUser();
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);
  const hasPassedInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = latestInterviews?.length! > 0;
  return (
    <div className="bg-black min-h-screen pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-6 pt-4 pb-8">
        <div className="bg-gradient-to-br from-[#0c0c0c] to-[#121212] border border-neutral-800 rounded-3xl px-4 py-10 md:px-8 shadow-xl backdrop-blur-sm flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-block bg-black/40 backdrop-blur-md border border-neutral-700 px-4 py-1 rounded-full">
              <span className="text-[#3ECF8E] text-base font-normal">
                ✨ AI-Powered Interview Practice
              </span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Prepare your interviews{" "}
              <span className="text-[#3ECF8E]">with ease</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Practice on real interview questions and get personalized feedback
              instantly. Build confidence for your next career opportunity.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                asChild
                className="bg-[#3ECF8E] hover:bg-[#35b87c] text-black font-medium py-5 px-8 rounded-xl transition text-base shadow-lg shadow-[#3ECF8E]/20 flex items-center gap-2"
              >
                <Link href="/interview">
                  Start an Interview <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative w-72 h-72">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3ECF8E]/20 to-[#35b87c]/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 bg-gradient-to-br from-[#3ECF8E] to-[#35b87c] rounded-3xl w-full h-full opacity-90 shadow-2xl flex justify-center items-center">
              {/* SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="200"
                height="200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="16"
                  y="8"
                  width="32"
                  height="48"
                  rx="4"
                  fill="#3ECF8E"
                />
                <path
                  d="M20 32l8 8l16 -16"
                  stroke="white"
                  strokeWidth="3"
                  fill="none"
                />
                <rect
                  x="16"
                  y="8"
                  width="32"
                  height="48"
                  rx="4"
                  stroke="#2B8F61"
                  strokeWidth="2"
                  fill="none"
                />
                <rect x="25" y="6" width="14" height="4" fill="#2B8F61" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Interviews Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">
            <span className="text-[#3ECF8E]">Recent</span> Interviews
          </h2>
          <Link
            href="/interviews"
            className="text-[#3ECF8E] hover:text-[#35b87c] flex items-center gap-1 text-sm font-medium"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasPassedInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>You haven&pos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      {/* Available Interviews Section */}
      <section className="w-full max-w-6xl mx-auto px-6 pt-12 pb-6">
        <div className="bg-gradient-to-br from-neutral-900 to-black rounded-3xl border border-neutral-800 p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Available Templates
            </h2>
            <Button
              asChild
              className="bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-5 py-2 rounded-xl text-sm flex items-center gap-2 border border-neutral-700"
            >
              <Link href="/create">
                <PlusCircle size={16} /> Create Custom
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
