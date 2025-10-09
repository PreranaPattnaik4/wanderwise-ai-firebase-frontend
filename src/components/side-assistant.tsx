"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { answerTravelQuestion } from "@/ai/flows/answer-travel-questions-chatbot";
import { useAuth } from "./auth-provider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function SideAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await answerTravelQuestion({ question: input });
      const assistantMessage: Message = {
        role: "assistant",
        content: response.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error with chatbot:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, I’m having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating glowing AI button */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-10 right-10 h-16 w-16 rounded-full shadow-lg transition-transform hover:scale-110 
                       z-50 bg-gradient-to-tr from-sky-500 to-violet-500 text-white"
            size="icon"
            aria-label="AI Assistant"
          >
            <div className="relative">
              <Bot className="h-8 w-8 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
              <span className="absolute inset-0 rounded-full animate-[pulse_2s_ease-in-out_infinite] bg-sky-400/20 blur-md" />
            </div>
          </Button>
        </SheetTrigger>

        {/* Transparent glass popup */}
        <SheetContent
          className="flex flex-col border-l border-white/10 
                     bg-white/10 backdrop-blur-3xl 
                     shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] 
                     text-white"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(164,193,179,0.08), rgba(212,211,188,0.04))",
          }}
        >
          {/* Header */}
          <SheetHeader className="text-center">
            <SheetTitle className="font-headline text-lg relative text-[#A4BFB2]/90">
              WanderWise AI Assistant
              <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-1/4 h-[2px] bg-gradient-to-r from-sky-400 to-violet-400" />
            </SheetTitle>
          </SheetHeader>

          {/* Chat area */}
          <ScrollArea className="flex-1 my-4 pr-4 -mr-2">
            <div className="space-y-6">
              {/* Greeting */}
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback className="bg-transparent text-sky-400">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-white/15 backdrop-blur-md shadow-inner p-3 text-sm text-white/90">
                  <p>Hello 👋 Ask me about your trip or travel plans!</p>
                </div>
              </div>

              {/* Chat messages */}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === "user" && "justify-end"
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 border-2 border-primary">
                      <AvatarFallback className="bg-transparent text-sky-400">
                        <Bot size={20} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl p-3 text-sm shadow-md",
                      message.role === "user"
                        ? "bg-gradient-to-r from-sky-500 to-violet-500 text-white"
                        : "bg-white/15 backdrop-blur-md text-white/90"
                    )}
                  >
                    <p>{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoURL || ""} />
                      <AvatarFallback>
                        <User size={20} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Loading animation */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback className="bg-transparent text-sky-400">
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-white/10 p-3 text-sm">
                    <Loader2 className="h-5 w-5 animate-spin text-sky-400" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input bar */}
          <SheetFooter>
            <form
              onSubmit={handleSendMessage}
              className="flex w-full items-center space-x-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about destinations..."
                disabled={isLoading}
                className="rounded-full bg-white/10 backdrop-blur-md border-white/20 
                           focus:ring-sky-400 text-white placeholder:text-white/60"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading}
                className="rounded-full flex-shrink-0 bg-gradient-to-br from-sky-500 to-violet-500 
                           text-white transition-transform hover:scale-110"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
