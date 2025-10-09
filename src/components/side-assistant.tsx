
"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { answerTravelQuestion } from "@/ai/flows/answer-travel-questions-chatbot";

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
      <button
        onClick={() => setOpen(true)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 z-50 size-12 rounded-full grid place-items-center text-primary-foreground shadow-lg bg-primary hover:bg-primary/90 active:scale-95 transition-transform"
      >
        <div className="relative">
          <Bot className="h-6 w-6 drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
          <span className="absolute inset-0 rounded-full animate-[pulse_2s_ease-in-out_infinite] bg-white/20 blur-md" />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed bottom-20 right-6 z-50 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white/10 backdrop-blur-2xl text-foreground border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.25)] rounded-3xl flex flex-col"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <header className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="font-headline text-lg text-primary">WanderWise AI Assistant</div>
                <button className="size-9 grid place-items-center rounded-full hover:bg-white/5" onClick={() => setOpen(false)} aria-label="Close">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3">
                {msgs.map((m) => (
                  <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                    <div className={
                        (m.role === "user" ? "bg-gradient-to-r from-sky-400/20 to-violet-400/30 text-white" : "bg-secondary/80 text-secondary-foreground") + 
                        " rounded-xl px-4 py-2.5 max-w-[85%] shadow-sm"
                    }>
                        {m.content}
                    </div>
                  </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-secondary/80 text-secondary-foreground rounded-xl px-4 py-2.5 shadow-sm">
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
