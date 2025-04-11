import dayjs from "dayjs";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/app/components/ui/button"; 
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  // Supabase green color
  const supabaseGreen = "#3ECF8E";

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-5xl font-medium tracking-tight mb-6">
          Feedback Summary  <br/>
          <span className="text-gray-500 ml-1">{interview.role} Interview</span>
        </h1>
        
        <div className="flex flex-wrap gap-6 text-base text-gray-600">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${supabaseGreen}20` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill={supabaseGreen} />
              </svg>
            </div>
            <div>
              <p className="font-medium">Overall Score</p>
              <p className="mt-1">
                <span className="font-medium" style={{ color: supabaseGreen }}>{feedback?.totalScore}</span>
                <span className="text-gray-500">/100</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-2" style={{ backgroundColor: `${supabaseGreen}20` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={supabaseGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 2V6" stroke={supabaseGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 2V6" stroke={supabaseGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 10H21" stroke={supabaseGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="font-medium">Date</p>
              <p className="mt-1 text-gray-500">
                {feedback?.createdAt
                  ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-3xl font-medium mb-4">Final Assessment</h2>
        <p className="text-gray-400 leading-relaxed font-thin text-lg">{feedback?.finalAssessment}</p>
      </div>

      <div className=" border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-3xl font-medium mb-6">Performance Breakdown</h2>
        <div className="space-y-6">
          {feedback?.categoryScores?.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <p className="font-regular text-lg">{category.name}</p>
                <p className="text-lg">
                  <span style={{ color: supabaseGreen }}>{category.score}</span>
                  <span className="text-gray-500">/100</span>
                </p>
              </div>
              
              <div className="w-full  rounded-full h-2 mb-3">
                <div
                  className="h-2 rounded-full"
                  style={{ 
                    width: `${category.score}%`,
                    backgroundColor: supabaseGreen 
                  }}
                ></div>
              </div>
              
              <p className="text-gray-500 leading-relaxed font-thin text-base">{category.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className=" border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-medium mb-4 flex items-center">
            <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={supabaseGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke={supabaseGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H9.01" stroke={supabaseGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9H15.01" stroke={supabaseGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Strengths
          </h2>
          <ul className="space-y-2">
            {feedback?.strengths?.map((strength, index) => (
              <li key={index} className="flex items-start">
                <div className="min-w-5 mt-1 mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke={supabaseGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-gray-400 leading-relaxed font-thin text-lg">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className=" border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-medium mb-4 flex items-center">
            <svg className="mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 15H16" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H9.01" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9H15.01" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Areas for Improvement
          </h2>
          <ul className="space-y-2">
            {feedback?.areasForImprovement?.map((area, index) => (
              <li key={index} className="flex items-start">
                <div className="min-w-5 mt-1 mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-gray-400 leading-relaxed font-thin text-lg">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="w-full sm:w-1/2">
          <Button className="w-full border border-gray-200 text-gray-700 transition-colors py-2 h-12 rounded-md text-lg">
            Back to Dashboard
          </Button>
        </Link>

        <Link href={`/interview/${id}`} className="w-full sm:w-1/2">
          <Button 
            className="w-full py-2 h-12 rounded-md transition-colors text-xl"
            style={{ 
              backgroundColor: supabaseGreen,
              color: 'white'
            }}
          >
            Retake Interview
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Feedback;