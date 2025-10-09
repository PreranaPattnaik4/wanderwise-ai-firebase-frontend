
"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { answerTravelQuestion } from "@/ai/flows/answer-travel-questions-chatbot";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function SideAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "m0",
      role: "assistant",
      content: "Hello 👋 I’m your AI guide. How can I assist with your travel plans?",
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [open, msgs]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Msg = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    setMsgs((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await answerTravelQuestion({ question: currentInput });
      const assistantMessage: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.answer,
      };
      setMsgs((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error with chatbot:", error);
      const errorMessage: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I’m having trouble connecting. Please try again later.",
      };
      setMsgs((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open AI Assistant"
              className="fixed bottom-5 right-8 z-50 size-12 rounded-full grid place-items-center text-primary-foreground shadow-lg bg-primary hover:bg-primary/90 active:scale-95 transition-transform"
            >
              <div className="relative">
                <Bot className="h-6 w-6 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                <span className="absolute inset-0 rounded-full animate-[pulse_2s_ease-in-out_infinite] bg-white/20 blur-md" />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>💬 Ask AI</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white/10 text-foreground border-l border-white/20 shadow-2xl flex flex-col backdrop-blur-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <header className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="font-headline text-lg text-primary">WanderWise AI Assistant</div>
                <button className="size-9 grid place-items-center rounded-full hover:bg-white/5" onClick={() => setOpen(false)} aria-label="Close">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {msgs.map((m) => (
                  <div key={m.id} className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === 'assistant' && (
                      <Bot className="shrink-0 size-7 p-1.5 rounded-full bg-secondary text-foreground/70" />
                    )}
                    <div className={
                        (m.role === "user" ? "bg-primary/20 text-primary-foreground" : "bg-secondary/80 text-secondary-foreground") + 
                        " rounded-2xl px-4 py-2.5 max-w-[85%] shadow-sm"
                    }>
                        {m.content}
                    </div>
                  </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-secondary/80 text-secondary-foreground rounded-2xl px-4 py-2.5 shadow-sm">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        </div>
                    </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="p-3 border-t border-white/10 flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full bg-secondary/50 border border-border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                <button onClick={handleSendMessage} className="inline-grid place-items-center size-10 rounded-full text-primary-foreground bg-primary hover:bg-primary/90 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Send" disabled={isLoading}>
                  <Send className="size-4" />
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
