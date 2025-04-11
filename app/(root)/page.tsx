import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import React from "react";
import InterviewCard from "../components/InterviewCard";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
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
    <div className="bg-black min-h-screen text-white antialiased">
      {/* Navigation */}
     

      {/* Hero Section - Apple-style minimalism */}
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#3ECF8E]/10 text-[#3ECF8E] rounded-full px-3 py-1">
              <Sparkles size={12} /> AI-POWERED INTERVIEW PREPARATION
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight mb-6">
            Interview <span className="text-[#3ECF8E]">confidently.</span><br />
            Succeed <span className="text-[#3ECF8E]">brilliantly.</span>
          </h1>
          
          <p className="text-neutral-400 text-lg md:text-xl text-center max-w-2xl mx-auto mb-10">
            Practice with intelligent AI that simulates real interviews and provides personalized, actionable feedback to help you land your dream job.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="bg-[#3ECF8E] hover:bg-[#35b87c] text-black font-medium py-6 px-8 rounded-lg text-base transition"
            >
              <Link href="/interview" className="flex items-center gap-2">
                Start practicing <ArrowRight size={16} />
              </Link>
            </Button>
            
          </div>
        </div>
      </section>

      {/* Features Section - Vercel-style grid */}
      <section className="py-20 px-6 ">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl border border-neutral-900 bg-black">
              <div className="size-10 rounded-full bg-[#3ECF8E]/10 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z" stroke="#3ECF8E" strokeWidth="2"/>
                  <path d="M20 11.5C20 15.66 16.42 19 12 19C7.58 19 4 15.66 4 11.5" stroke="#3ECF8E" strokeWidth="2"/>
                  <path d="M12 19V22" stroke="#3ECF8E" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Voice Analysis</h3>
              <p className="text-neutral-400 text-sm">Advanced AI evaluates your tone, pace, and clarity to enhance your speaking skills.</p>
            </div>
            
            <div className="p-6 rounded-2xl border border-neutral-900 bg-black">
              <div className="size-10 rounded-full bg-[#3ECF8E]/10 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#3ECF8E" strokeWidth="2"/>
                  <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="#3ECF8E" strokeWidth="2"/>
                  <path d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9" stroke="#3ECF8E" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Response Analysis</h3>
              <p className="text-neutral-400 text-sm">Get instant feedback on your answers with data-driven insights and improvement suggestions.</p>
            </div>
            
            <div className="p-6 rounded-2xl border border-neutral-900 bg-black">
              <div className="size-10 rounded-full bg-[#3ECF8E]/10 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V5" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.5 9.09H20.5" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.6947 13.7H15.7037" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.6947 16.7H15.7037" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.9955 13.7H12.0045" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.9955 16.7H12.0045" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.29431 13.7H8.30329" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.29431 16.7H8.30329" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Industry Templates</h3>
              <p className="text-neutral-400 text-sm">Practice with role-specific templates from tech, finance, healthcare, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Interviews Section - Apple-style cards */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Your Recent Interviews</h2>
            <Link
              href="/interviews"
              className="text-[#3ECF8E] hover:text-[#35b87c] flex items-center gap-1 text-sm"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {hasPassedInterviews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userInterviews?.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </div>
          ) : (
            <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-12 text-center">
              <div className="size-16 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12H19" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">No interviews yet</h3>
              <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                Start your first practice interview to get personalized feedback and improve your skills.
              </p>
              <Button
                asChild
                className="bg-[#3ECF8E] hover:bg-[#35b87c] text-black font-medium py-3 px-6 rounded-full text-sm inline-flex items-center gap-2"
              >
                <Link href="/interview">
                  Start your first interview <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Available Templates Section - Vercel-style */}
      <section className="py-20 px-6 bg-neutral-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Interview Templates</h2>
            <Button
              asChild
              className="bg-black border border-neutral-800 hover:border-neutral-700 text-white font-medium px-4 py-2 rounded-full text-sm flex items-center gap-1.5"
            >
              <Link href="/create">
                <Plus size={14} /> Custom Template
              </Link>
            </Button>
          </div>

          {hasUpcomingInterviews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestInterviews?.map((interview) => (
                <InterviewCard key={interview.id} {...interview} />
              ))}
            </div>
          ) : (
            <div className="bg-black border border-neutral-900 rounded-2xl p-12 text-center">
              <div className="size-16 rounded-full bg-neutral-900 flex items-center justify-center mx-auto mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 2V5" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.5 9.09H20.5" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#3ECF8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">No templates available</h3>
              <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                Check back soon for new interview templates or create a custom one tailored to your needs.
              </p>
              <Button
                asChild
                className="bg-[#3ECF8E] hover:bg-[#35b87c] text-black font-medium py-3 px-6 rounded-full text-sm inline-flex items-center gap-2"
              >
                <Link href="/create">
                  Create template <Plus size={14} />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Apple-style simplicity */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to ace your next interview?</h2>
          <p className="text-neutral-400 text-lg mb-10 max-w-2xl mx-auto">
            Start practicing today and gain the confidence you need to showcase your skills and land your dream job.
          </p>
          <Button
            asChild
            className="bg-[#3ECF8E] hover:bg-[#35b87c] text-black font-medium py-6 px-10 rounded-full text-base inline-flex items-center gap-2"
          >
            <Link href="/interview">
              Begin Practice <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  );
};

export default Page;