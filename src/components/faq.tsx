
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is WanderWise AI?",
    answer: "WanderWise AI is a smart travel planner that uses artificial intelligence to create personalized itineraries, manage bookings, and provide real-time assistance to make your travel seamless and enjoyable."
  },
  {
    question: "Is WanderWise AI free to use?",
    answer: "Yes, the basic features of WanderWise AI, including itinerary generation and the AI assistant, are free. We may introduce premium features in the future."
  },
  {
    question: "How does WanderWise AI personalize trip recommendations?",
    answer: "Our AI analyzes your inputs such as destination, trip type, interests, and budget to create a custom itinerary. The more details you provide, the more personalized your plan will be."
  },
  {
    question: "Can I access my itinerary offline?",
    answer: "Currently, you need an internet connection to access all features. We are working on an offline mode for viewing your itinerary."
  },
  {
    question: "How do I adjust my WanderWise plan?",
    answer: "You can use the 'Improve Itinerary' feature by providing feedback to the AI, or directly edit the generated plan. Our AI assistant can also help you make adjustments on the fly."
  },
  {
    question: "Where can I get support for WanderWise AI?",
    answer: "For support, you can use the AI assistant chatbot within the app or contact our support team through the 'Contact Us' section on our website."
  }
];

export default function Faq() {
  return (
    <section className="container py-10 sm:py-14" id="faq">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-headline font-bold text-center mb-8">FAQs</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index} className="bg-secondary/30 rounded-2xl mb-3 border px-4">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-foreground/80">{faq.answer}</p>
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
        </motion.div>
    </section>
  );
}
