import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CONVERSATIONS = [
  { id: "c1", name: "James Thornton", role: "Investor", lastMsg: "Looking forward to our call tomorrow.", time: "10:30 AM", unread: 2 },
  { id: "c2", name: "Amara Nwosu", role: "Entrepreneur", lastMsg: "Thank you for the introduction!", time: "Yesterday", unread: 0 },
  { id: "c3", name: "Priya Sharma", role: "Professional", lastMsg: "I reviewed your pitch deck.", time: "Monday", unread: 1 },
];

const MESSAGES: Record<string, { from: "me" | "them"; text: string; time: string }[]> = {
  c1: [
    { from: "them", text: "Hi, I reviewed your FinTechAfrica pitch deck.", time: "10:15 AM" },
    { from: "me", text: "Thank you James! Happy to discuss further.", time: "10:20 AM" },
    { from: "them", text: "Looking forward to our call tomorrow.", time: "10:30 AM" },
  ],
  c2: [{ from: "me", text: "Hi Amara, I connected you with James at Apex.", time: "Yesterday" }, { from: "them", text: "Thank you for the introduction!", time: "Yesterday" }],
  c3: [{ from: "them", text: "I reviewed your pitch deck.", time: "Monday" }],
};

export default function Messages() {
  const [active, setActive] = useState("c1");
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setInput("");
  };

  return (
    <DashboardLayout>
      <PageHeader title="Messages" description="Your conversations." breadcrumbs={[{ label: "Messages" }]} />
      <div className="flex h-[calc(100vh-220px)] rounded-xl border border-border overflow-hidden bg-card">
        <div className="w-72 flex-shrink-0 border-r border-border overflow-y-auto">
          {CONVERSATIONS.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)} className={`w-full text-left p-4 border-b border-border hover:bg-muted/50 transition-colors ${active === c.id ? "bg-muted" : ""}`}>
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-semibold">{c.name[0]}</div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.role}</p>
                  </div>
                </div>
                {c.unread > 0 && <span className="bg-gold text-royal-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{c.unread}</span>}
              </div>
              <p className="text-xs text-muted-foreground truncate pl-11">{c.lastMsg}</p>
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-border">
            <p className="font-semibold text-foreground">{CONVERSATIONS.find((c) => c.id === active)?.name}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {(MESSAGES[active] ?? []).map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-2 rounded-xl text-sm ${msg.from === "me" ? "bg-royal-black text-gold" : "bg-muted text-foreground"}`}>
                  <p>{msg.text}</p>
                  <p className="text-xs opacity-60 mt-1 text-right">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." onKeyDown={(e) => e.key === "Enter" && send()} className="flex-1" />
            <Button onClick={send} className="bg-gold text-royal-black hover:bg-gold/90" aria-label="Send message"><Send className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
