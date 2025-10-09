
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
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." };
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
            className="fixed bottom-10 right-10 h-16 w-16 rounded-full shadow-lg transition-transform hover:scale-110 z-50 bg-gradient-to-br from-sky-500 to-violet-500 text-white" 
            size="icon"
            aria-label="AI Assistant"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-violet-500 rounded-full opacity-50 blur-lg group-hover:opacity-75 transition-opacity"></div>
            <Bot className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-white/10 backdrop-blur-lg border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
          <SheetHeader className="text-center">
            <SheetTitle className="font-headline text-lg relative text-foreground">
                WanderWise AI Assistant
                <span className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-1/4 h-[2px] bg-gradient-to-r from-sky-400 to-violet-400"></span>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 my-4 pr-4 -mr-2">
            <div className="space-y-6">
                <div className={cn("flex items-start gap-3")}>
                    <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback className="bg-transparent"><Bot size={20} className="text-primary"/></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-white/20 p-3 text-sm">
                        <p>Hello 👋 Ask me about your trip or travel plans!</p>
                    </div>
                </div>
              {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' && "justify-end")}>
                  {message.role === 'assistant' && (
                     <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback className="bg-transparent"><Bot size={20} className="text-primary"/></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("max-w-[80%] rounded-xl p-3 text-sm", message.role === 'user' ? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white' : 'bg-white/20')}>
                    <p>{message.content}</p>
                  </div>
                   {message.role === 'user' && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL || ''}/>
                        <AvatarFallback><User size={20}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className={cn("flex items-start gap-3")}>
                    <Avatar className="h-8 w-8 border-2 border-primary">
                        <AvatarFallback className="bg-transparent"><Bot size={20} className="text-primary"/></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-white/20 p-3 text-sm">
                        <Loader2 className="h-5 w-5 animate-spin text-foreground"/>
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <SheetFooter>
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about destinations..."
                disabled={isLoading}
                className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 focus:ring-sky-500 text-foreground placeholder:text-muted-foreground"
              />
              <Button type="submit" size="icon" disabled={isLoading} className="rounded-full flex-shrink-0 bg-gradient-to-br from-sky-500 to-violet-500 text-white transition-transform hover:scale-110">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
