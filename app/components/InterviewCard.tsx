import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";
import { Calendar, Star, ArrowUpRight } from "lucide-react";

const InterviewCard = ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("DD MMM YYYY");

  return (
    <div className="border border-neutral-800 hover:border-[#3ECF8E]/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between h-full">
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={getRandomInterviewCover()}
              alt="Interview cover"
              width={38}
              height={38}
              className="rounded-xl object-cover"
            />
            <div className="absolute inset-0"></div>
          </div>
          <span className="bg-black/60 backdrop-blur-sm border border-neutral-700 text-white px-3 py-1 rounded-full text-sm font-normal capitalize tracking-wide">
            {normalizedType}
          </span>
        </div>

        <h3 className="text-white text-xl font-bold capitalize group-hover:text-[#3ECF8E] transition-colors">
          {role} Interview
        </h3>

        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <span>{formattedDate}</span>
          </div>
          {feedback && (
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#3ECF8E]" />
              <span className="font-medium">{feedback.totalScore}/100</span>
            </div>
          )}
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px]">
          {feedback?.finalAssessment ||
            "Simulate a real interview environment with AI-powered feedback."}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-800">
        <DisplayTechIcons techStack={techstack} />
        <Link
          href={
            feedback
              ? `/interview/${id}/feedback`
              : `/interview/${id}`
          }
          className="group-hover:translate-x-1 transition-transform"
        >
          <Button className="cursor-pointer bg-[#3ECF8E] hover:bg-[#35b87c] text-black font-medium px-4 py-2 rounded-xl transition flex items-center gap-1 shadow-md shadow-[#3ECF8E]/10">
            {feedback ? "View Feedback" : "Start"} <ArrowUpRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewCard;
