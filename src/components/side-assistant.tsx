
"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { answerTravelQuestion } from "@/ai/flows/answer-travel-questions-chatbot";
import { useAuth } from "./auth-provider";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function SideAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await answerTravelQuestion({ question: input });
      const assistantMessage: Message = { role: 'assistant', content: response.answer };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error with chatbot:", error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I’m having trouble connecting. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed bottom-10 right-10 h-16 w-16 rounded-full shadow-lg transition-transform hover:scale-110 z-50 bg-primary hover:bg-primary/90 text-primary-foreground"
            size="icon"
            aria-label="AI Assistant"
          >
            <Bot className="h-8 w-8" />
          </Button>
        </SheetTrigger>

        <SheetContent
          className="flex flex-col bg-white/20 backdrop-blur-lg border-white/30"
        >
          <SheetHeader className="text-center">
            <SheetTitle className="font-headline text-lg">
              WanderWise AI Assistant
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1 my-4 pr-4 -mr-2">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback className="bg-transparent text-primary">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-white/20 shadow-inner p-3 text-sm">
                  <p>Hello 👋 Ask me about your trip or travel plans!</p>
                </div>
              </div>

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
                      <AvatarFallback className="bg-transparent text-primary">
                        <Bot size={20} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl p-3 text-sm shadow-md",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white/20"
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

              {isLoading && (
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarFallback className="bg-transparent text-primary">
                      <Bot size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-white/10 p-3 text-sm">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

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
                className="rounded-full bg-white/20 backdrop-blur-md border-white/30 focus:ring-primary placeholder:text-foreground/70"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading}
                className="rounded-full flex-shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-110"
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
