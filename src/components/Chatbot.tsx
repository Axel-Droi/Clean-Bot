import { useState } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const prompts = [
  {
    question: "What is CleanBot?",
    answer:
      "CleanBot is an AI-powered robot designed to autonomously detect, collect, and dispose of litter, helping keep public spaces clean and sustainable."
  },
  {
    question: "How does CleanBot detect trash?",
    answer:
      "CleanBot uses advanced computer vision and AI algorithms to identify and locate litter in real time."
  },
  {
    question: "Is CleanBot eco-friendly?",
    answer:
      "Yes! CleanBot is solar-powered and built with sustainable materials to minimize its environmental impact."
  },
  {
    question: "Where can CleanBot be used?",
    answer:
      "CleanBot can be deployed in parks, beaches, streets, and other public spaces to help maintain cleanliness."
  },
  {
    question: "How can I get CleanBot in my community?",
    answer:
      "Contact us through the website to learn more about pilot programs and deployments."
  }
];

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end">
        {open && (
          <div className="w-80 bg-card border border-border rounded-xl shadow-lg p-4 mb-2 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-foreground">CleanBot Chatbot</span>
            </div>
            <div className="space-y-2 mb-4">
              {prompts.map((prompt, idx) => (
                <Button
                  key={prompt.question}
                  variant={selected === idx ? "secondary" : "outline"}
                  className="w-full text-left"
                  onClick={() => setSelected(idx)}
                >
                  {prompt.question}
                </Button>
              ))}
            </div>
            {selected !== null && (
              <div className="bg-muted rounded-lg p-3 text-foreground text-base">
                {prompts[selected].answer}
              </div>
            )}
          </div>
        )}
        <Button
          variant="hero"
          className="rounded-full shadow-lg"
          onClick={() => setOpen((o) => !o)}
        >
          <Bot className="w-5 h-5 mr-2" />
          {open ? "Close Chatbot" : "Chatbot"}
        </Button>
      </div>
    </div>
  );
};
