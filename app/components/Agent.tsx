"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk"; 
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  Loader2, 
  BarChart2, 
  Brain, 
  CheckCircle2, 
  ClipboardList, 
  FileText, 
  LineChart, 
  ListChecks, 
  MessageSquareText, 
  Sparkles,
  Trophy
} from "lucide-react";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  PROCESSING = "PROCESSING",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface ProcessingStep {
  message: string;
  icon: React.ReactNode;
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
  const [currentProcessingStep, setCurrentProcessingStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Array of processing messages with corresponding icons
  const processingSteps: ProcessingStep[] = [
    { message: "Analyzing your interview responses...", icon: <Brain className="text-blue-400" /> },
    { message: "Evaluating communication skills...", icon: <MessageSquareText className="text-purple-400" /> },
    { message: "Assessing technical knowledge...", icon: <ClipboardList className="text-yellow-400" /> },
    { message: "Identifying your strengths...", icon: <Trophy className="text-amber-400" /> },
    { message: "Finding areas for improvement...", icon: <ListChecks className="text-emerald-400" /> },
    { message: "Comparing with industry standards...", icon: <BarChart2 className="text-indigo-400" /> },
    { message: "Preparing personalized feedback...", icon: <FileText className="text-pink-400" /> },
    { message: "Constructing performance insights...", icon: <LineChart className="text-cyan-400" /> },
    { message: "Generating detailed recommendations...", icon: <Sparkles className="text-orange-400" /> },
    { message: "Finalizing your interview report...", icon: <CheckCircle2 className="text-green-400" /> }
  ];

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

  // Processing steps animation effect
  useEffect(() => {
    let stepInterval: NodeJS.Timeout;
    
    if (callStatus === CallStatus.PROCESSING) {
      stepInterval = setInterval(() => {
        setCompletedSteps(prev => [...prev, currentProcessingStep]);
        setCurrentProcessingStep(prev => (prev + 1) % processingSteps.length);
      }, 2000);
    }

    return () => {
      if (stepInterval) clearInterval(stepInterval);
    };
  }, [callStatus, currentProcessingStep, processingSteps.length]);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");
      
      // Set to processing state before making API call
      setCallStatus(CallStatus.PROCESSING);
      
      // Small delay to show the processing UI before making the API call
      setTimeout(async () => {
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
      }, 10000); // Show processing state for at least 10 seconds
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

  // Render the processing UI when in PROCESSING state
  if (callStatus === CallStatus.PROCESSING) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-[600px] gap-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3ECF8E]/30 to-[#6366F1]/30 rounded-full blur-xl"></div>
          <div className="relative z-10 bg-gradient-to-br from-[#3ECF8E] to-[#35b87c] rounded-full w-24 h-24 flex items-center justify-center">
            <Loader2 size={48} className="text-white animate-spin" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white">Preparing Your Interview Feedback</h2>
        
        <div className="w-full max-w-md bg-gradient-to-br from-[#0c0c0c] to-[#121212] border border-neutral-800 rounded-xl p-6 shadow-xl">
          {processingSteps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "flex items-center gap-3 py-3 transition-all duration-500",
                index === currentProcessingStep ? "opacity-100" : 
                completedSteps.includes(index) ? "opacity-60" : "opacity-30"
              )}
            >
              <div className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full transition-all",
                index === currentProcessingStep ? "bg-gradient-to-r from-[#3ECF8E] to-[#35b87c] animate-pulse" : 
                completedSteps.includes(index) ? "bg-[#3ECF8E]/20" : "bg-neutral-800"
              )}>
                {completedSteps.includes(index) ? (
                  <CheckCircle2 size={16} className="text-[#3ECF8E]" />
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center">
                    {index === currentProcessingStep ? (
                      <Loader2 size={16} className="text-white animate-spin" />
                    ) : (
                      step.icon
                    )}
                  </div>
                )}
              </div>
              <span className={cn(
                "text-sm",
                index === currentProcessingStep ? "text-white font-medium" : 
                completedSteps.includes(index) ? "text-gray-300" : "text-gray-500"
              )}>
                {step.message}
              </span>
            </div>
          ))}
        </div>
        
        <p className="text-gray-400 text-sm max-w-md text-center">
          We're analyzing your interview performance and creating personalized feedback. This will only take a moment.
        </p>
      </div>
    );
  }

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
              <span className="text-white text-4xl font-bold">
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
                <Phone size={20} />
                <span className="text-lg">Start Interview</span>
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