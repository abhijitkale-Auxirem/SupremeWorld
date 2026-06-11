import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ChatMessage { role: "user" | "assistant"; content: string; time: string; }

const SUGGESTIONS = [
  "Find investors for my FinTech startup",
  "Recommend networking events in my industry",
  "How do I improve my investment portfolio?",
  "What business opportunities match my profile?",
];

const getResponse = (msg: string): string => {
  if (msg.toLowerCase().includes("investor")) return "Based on your profile, I recommend connecting with investors in the FinTech and AgriTech sectors. Check the Investors section in your dashboard for curated matches aligned with your startup stage.";
  if (msg.toLowerCase().includes("event")) return "Upcoming events relevant to you: Global Entrepreneur Summit (Aug 15, Dubai), Africa Tech Meetup (Jul 22, Lagos), and the Executive Leadership Webinar (Jul 10, Online). Register from the Events section.";
  if (msg.toLowerCase().includes("portfolio") || msg.toLowerCase().includes("investment")) return "Your current portfolio shows a 37% ROI with strong performance in Logistics and FinTech. Consider diversifying into CleanTech which is showing 45% YoY growth among SupremeWorld investors.";
  return "I have analyzed your profile and activity. I recommend focusing on expanding your network in Southeast Asia, exploring the 3 new partnership opportunities in your Opportunities section, and attending the upcoming summit to connect with strategic investors.";
};

export default function AIAssistant() {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>("ai_chat", [
    { role: "assistant", content: "Hello! I am your AI Supreme Assistant. I can help with opportunity discovery, networking suggestions, investment insights, and personalized recommendations. How can I assist you today?", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = async (text: string = input) => {
    if (!text.trim() || isThinking) return;
    const userMsg: ChatMessage = { role: "user", content: text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);
    await new Promise((r) => setTimeout(r, 1200));
    const resp: ChatMessage = { role: "assistant", content: getResponse(text), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, resp]);
    setIsThinking(false);
  };

  return (
    <DashboardLayout>
      <PageHeader title="AI Supreme Assistant" description="Your intelligent business and lifestyle companion." breadcrumbs={[{ label: "AI Assistant" }]} />
      <div className="max-w-3xl flex flex-col h-[calc(100vh-220px)]">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-gold" />
                </div>
              )}
              <div className={`max-w-lg px-4 py-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-royal-black text-gold" : "bg-card border border-border text-foreground"}`}>
                <p className="leading-relaxed">{msg.content}</p>
                <p className="text-xs opacity-50 mt-1.5">{msg.time}</p>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {isThinking && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-gold" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-card border border-border">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map((i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => sendMessage(s)} className="text-xs px-3 py-1.5 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-colors">
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1" />
            <Button onClick={() => sendMessage()} disabled={!input.trim() || isThinking} className="bg-gold text-royal-black hover:bg-gold/90" aria-label="Send message">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
