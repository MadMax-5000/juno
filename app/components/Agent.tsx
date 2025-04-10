"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk"; 
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { Phone, PhoneOff, Mic } from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  // Generate random colors for Vercel-like avatar
  const generateGradient = () => {
    const colors = [
      ['#FF4D4D', '#FF9999'],
      ['#3ECF8E', '#35b87c'],
      ['#6366F1', '#818CF8'],
      ['#F59E0B', '#FCD34D'],
      ['#8B5CF6', '#A78BFA']
    ];
    const randomPair = colors[Math.floor(Math.random() % colors.length)];
    return `linear-gradient(135deg, ${randomPair[0]} 0%, ${randomPair[1]} 100%)`;
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex sm:flex-row flex-col gap-5 items-stretch justify-between w-full">
        {/* AI Interviewer Card */}
        <div className="bg-gradient-to-br from-[#0c0c0c] to-[#121212] border border-neutral-800 rounded-xl px-4 py-5 flex-1 flex flex-col items-center justify-center shadow-md h-[320px]">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3ECF8E]/20 to-[#35b87c]/20 rounded-full blur-lg"></div>
            <div className="relative z-10 bg-gradient-to-br from-[#3ECF8E] to-[#35b87c] rounded-full w-20 h-20 flex items-center justify-center">
              {isSpeaking && (
                <span className="absolute inline-flex w-full h-full animate-ping rounded-full bg-[#3ECF8E] opacity-30"></span>
              )}
              <div className="bg-black/30 backdrop-blur-sm rounded-full p-4">
                <Mic size={24} className="text-white" />
              </div>
            </div>
          </div>
          <div className="inline-block bg-black/40 backdrop-blur-md border border-neutral-700 px-3 py-1 rounded-full mb-2">
            <span className="text-[#3ECF8E] text-base font-medium">
              AI Interviewer
            </span>
          </div>
          <p className="text-gray-400 text-base text-center">
            {isSpeaking ? "Speaking..." : callStatus === CallStatus.ACTIVE ? "Listening..." : "Ready for interview"}
          </p>
          
          {callStatus === CallStatus.ACTIVE && (
            <div className="mt-4 flex space-x-1">
              <span className="w-2 h-2 bg-[#3ECF8E] rounded-full animate-pulse"></span>
              <span className="w-2 h-2 bg-[#3ECF8E] rounded-full animate-pulse delay-100"></span>
              <span className="w-2 h-2 bg-[#3ECF8E] rounded-full animate-pulse delay-200"></span>
            </div>
          )}
        </div>

        {/* User Profile Card */}
        <div className="bg-gradient-to-br from-[#0c0c0c] to-[#121212] border border-neutral-800 rounded-xl px-4 py-5 flex-1 flex flex-col items-center justify-center shadow-md h-[320px] max-md:hidden">
          <div className="relative mb-4">
            <div 
              className="relative z-10 rounded-full w-20 h-20 flex items-center justify-center shadow-md" 
              style={{ background: generateGradient() }}
            >
              <span className="text-white text-2xl font-bold">
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          </div>
          <div className="inline-block bg-black/40 backdrop-blur-md border border-neutral-700 px-3 py-1 rounded-full mb-2">
            <span className="text-white text-base ">
              Candidate
            </span>
          </div>
          <p className="text-gray-300 font-medium">{userName}</p>
          
          {callStatus === CallStatus.ACTIVE && !isSpeaking && (
            <div className="mt-4 px-3 py-1 bg-neutral-800/50 rounded-full">
              <span className="text-gray-400 text-xs">Your turn to speak</span>
            </div>
          )}
        </div>
      </div>

      {/* Transcript Section */}
      {messages.length > 0 && (
        <div className="bg-gradient-to-br from-[#0c0c0c] to-[#121212] border border-neutral-800 rounded-xl p-4 w-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="size-2 bg-[#3ECF8E] rounded-full"></div>
            <span className="text-sm font-medium text-white">Latest Message</span>
          </div>
          <p className={cn(
              "text-gray-300 text-sm animate-fadeIn opacity-100",
              "transition-opacity duration-500"
            )}>
            {lastMessage}
          </p>
        </div>
      )}

      {/* Call Controls */}
      <div className="w-full flex justify-center pt-2">
        {callStatus !== CallStatus.ACTIVE ? (
          <button 
            onClick={() => handleCall()}
            className="bg-[#3ECF8E] hover:bg-[#35b87c] text-black font-medium py-3 px-6 rounded-lg transition text-sm shadow-lg shadow-[#3ECF8E]/20 flex items-center gap-2 cursor-pointer"
          >
            {callStatus === CallStatus.CONNECTING ? (
              <>
                <div className="animate-pulse flex items-center gap-1">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                </div>
                <span className="ml-1">Connecting</span>
              </>
            ) : (
              <>
                <Phone size={16} />
                <span>Start Interview</span>
              </>
            )}
          </button>
        ) : (
          <button 
            onClick={() => handleDisconnect()}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition text-sm shadow-lg shadow-red-500/20 flex items-center gap-2"
          >
            <PhoneOff size={16} />
            <span>End Interview</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Agent;