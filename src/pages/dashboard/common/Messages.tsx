import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { useState, useRef, useEffect } from "react";
import { Send, Plus, UserPlus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Seed data interfaces
interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMsg: string;
  time: string;
  unread: number;
}

interface Message {
  from: "me" | "them";
  text: string;
  time: string;
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  { id: "c1", name: "James Thornton", role: "Investor", lastMsg: "Looking forward to our call tomorrow.", time: "10:30 AM", unread: 2 },
  { id: "c2", name: "Amara Nwosu", role: "Entrepreneur", lastMsg: "Thank you for the introduction!", time: "Yesterday", unread: 0 },
  { id: "c3", name: "Priya Sharma", role: "Professional", lastMsg: "I reviewed your pitch deck.", time: "Monday", unread: 1 },
];

const INITIAL_MESSAGES: Record<string, Message[]> = {
  c1: [
    { from: "them", text: "Hi, I reviewed your FinTechAfrica pitch deck.", time: "10:15 AM" },
    { from: "me", text: "Thank you James! Happy to discuss further.", time: "10:20 AM" },
    { from: "them", text: "Looking forward to our call tomorrow.", time: "10:30 AM" },
  ],
  c2: [
    { from: "me", text: "Hi Amara, I connected you with James at Apex.", time: "Yesterday" },
    { from: "them", text: "Thank you for the introduction!", time: "Yesterday" }
  ],
  c3: [
    { from: "them", text: "I reviewed your pitch deck.", time: "Monday" }
  ],
};

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [active, setActive] = useState("c1");
  const [input, setInput] = useState("");

  // New Member Modal/Form States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Entrepreneur");

  // Scroll ref anchor point mapping
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // AUTOMATIC SCROLL PIPELINE: Moves focus smoothly down whenever the active thread or message count modifications execute
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, active]);

  // ACTION: Send message in active channel execution thread
  const send = () => {
    if (!input.trim()) return;

    const currentFormattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const freshMessageObj: Message = {
      from: "me",
      text: input.trim(),
      time: currentFormattedTime
    };

    // 1. Dynamic update mapping to push message data vectors securely inside target active state channel key
    setMessages(prev => ({
      ...prev,
      [active]: [...(prev[active] ?? []), freshMessageObj]
    }));

    // 2. Synchronize side navigation matrix panel tracking views
    setConversations(prevList => 
      prevList.map(c => 
        c.id === active 
          ? { ...c, lastMsg: input.trim(), time: currentFormattedTime, unread: 0 }
          : c
      )
    );

    setInput("");
  };

  // ACTION: Clear unread notification pills immediately on channel selection focus maps
  const handleSelectConversation = (conversationId: string) => {
    setActive(conversationId);
    setConversations(prevList =>
      prevList.map(c => c.id === conversationId ? { ...c, unread: 0 } : c)
    );
  };

  // ACTION: Add new target interaction matrix member profile
  const handleAddNewMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const runtimeUniqueStringID = `c_${Date.now()}`;
    const freshNewUserConversationNode: Conversation = {
      id: runtimeUniqueStringID,
      name: newName.trim(),
      role: newRole,
      lastMsg: "Conversation channel established.",
      time: "Just now",
      unread: 0
    };

    // Setup empty message channel array memory slots for new runtime node profiles
    setConversations(prev => [freshNewUserConversationNode, ...prev]);
    setMessages(prev => ({ ...prev, [runtimeUniqueStringID]: [] }));
    
    // Auto shift operational app window context directly over to newly generated profile matrix
    setActive(runtimeUniqueStringID);

    // Reset workflow states
    setNewName("");
    setShowAddModal(false);
  };

  return (
    <DashboardLayout>
      <PageHeader title="Messages" description="Your conversations." breadcrumbs={[{ label: "Messages" }]} />
      
      <div className="flex h-[calc(100vh-220px)] rounded-xl border border-border overflow-hidden bg-card relative">
        
        {/* Left Hand Sidebar Navigation Channels Control Stack Layout */}
        <div className="w-80 flex-shrink-0 border-r border-border flex flex-col bg-card">
          
          {/* Action Trigger Block: Add Member Header Slot */}
          <div className="p-3 border-b border-border flex items-center justify-between bg-muted/20">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1 select-none">Active Feeds</span>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowAddModal(true)}
              className="h-8 text-xs font-semibold flex items-center gap-1.5 border-gold/40 hover:bg-gold/10 text-gold bg-transparent"
            >
              <UserPlus className="w-3.5 h-3.5" /> New Chat
            </Button>
          </div>

          {/* Conversations Interactive Feed Map List Panel */}
          <div className="flex-1 overflow-y-auto divide-y divide-border/60">
            {conversations.map((c) => (
              <button 
                key={c.id} 
                onClick={() => handleSelectConversation(c.id)} 
                className={`w-full text-left p-4 hover:bg-muted/40 transition-all flex flex-col gap-1 relative ${
                  active === c.id ? "bg-muted border-l-4 border-gold pl-3" : ""
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-bold shadow-inner border border-gold/20 shrink-0">
                      {c.name[0]}
                    </div>
                    <div className="truncate max-w-[140px]">
                      <p className="font-semibold text-sm text-foreground truncate">{c.name}</p>
                      <p className="text-[11px] font-medium text-slate-400">{c.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-[10px] text-muted-foreground font-medium">{c.time}</span>
                    {c.unread > 0 && (
                      <span className="bg-gold text-royal-black text-[10px] font-black rounded-full min-w-4 h-4 px-1 flex items-center justify-center shadow-sm">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground truncate pl-11 mt-0.5">{c.lastMsg}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Hand Component Module Section: Active Dynamic Chat Box Frame Grid Container */}
        <div className="flex-1 flex flex-col bg-slate-950/5">
          
          {/* Selected Chat Context Bar Header */}
          <div className="p-4 border-b border-border bg-card flex items-center justify-between select-none">
            <div>
              <p className="font-bold text-base text-foreground tracking-tight">
                {conversations.find((c) => c.id === active)?.name ?? "Unknown Channel Identity"}
              </p>
              <p className="text-xs text-muted-foreground">
                {conversations.find((c) => c.id === active)?.role ?? "External Matrix Connection"}
              </p>
            </div>
          </div>

          {/* Messages Dialogue Stream Loop Container Panel Layer */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10 scrollbar-none">
            {((messages[active]) ?? []).length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 select-none">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mb-3 border border-border">
                  <Send className="w-5 h-5 text-muted-foreground/60" />
                </div>
                <p className="text-sm font-semibold text-foreground">Secure Connection Established</p>
                <p className="text-xs text-muted-foreground max-w-xs mt-1">Send a transmission message down below to start your conversation securely.</p>
              </div>
            ) : (
              (messages[active]).map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} animate-fade-in`}>
                  <div className={`max-w-md px-4 py-2.5 rounded-2xl text-sm shadow-sm relative ${
                    msg.from === "me" 
                      ? "bg-royal-black text-gold rounded-tr-none border border-gold/10" 
                      : "bg-card border border-border text-foreground rounded-tl-none"
                  }`}>
                    <p className="leading-relaxed font-medium break-words pr-2">{msg.text}</p>
                    <p className="text-[9px] opacity-50 mt-1 text-right font-mono font-bold tracking-tight select-none">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))
            )}
            {/* Native DOM Node pointer element hook mapped continuously for physical anchor position focus scrolling tracking */}
            <div ref={messagesEndRef} />
          </div>

          {/* Secure Chat Submission Text Input Actions Bar Bar Container */}
          <div className="p-4 border-t border-border bg-card flex gap-2 items-center">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Type a message inside secure stream..." 
              onKeyDown={(e) => e.key === "Enter" && send()} 
              className="flex-1 h-11 bg-muted/40 border-border focus-visible:ring-gold/30 rounded-xl px-4 text-sm font-medium" 
            />
            <Button 
              onClick={send} 
              disabled={!input.trim()}
              className="bg-gold text-royal-black hover:bg-gold/90 h-11 px-5 rounded-xl transition-all font-bold tracking-wide flex items-center gap-1.5 shadow-md disabled:opacity-40 disabled:pointer-events-none" 
              aria-label="Send message"
            >
              <span className="hidden sm:inline text-xs font-black uppercase tracking-wider">Send</span>
              <Send className="w-4 h-4 stroke-[2.5]" />
            </Button>
          </div>
        </div>

        {/* FLOATING ACTION OVERLAY SCREEN DIALOGUE BLOCK: ADD NEW MEMBER MATRIX CONTEXT MODAL PANEL */}
        {showAddModal && (
          <div className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <form 
              onSubmit={handleAddNewMemberSubmit}
              className="bg-card border border-border w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-gold" />
                  <h4 className="font-bold text-sm text-foreground tracking-tight">Create Communication Feed</h4>
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block select-none">Full Profile Name</label>
                  <Input 
                    required
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Sterling Archon"
                    className="bg-muted/20 border-border focus-visible:ring-gold/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block select-none">Network Classification Role</label>
                  <select 
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full h-10 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm text-foreground font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-gold/30"
                  >
                    <option value="Entrepreneur" className="bg-card">Entrepreneur</option>
                    <option value="Investor" className="bg-card">Investor</option>
                    <option value="Professional" className="bg-card">Professional</option>
                    <option value="Director" className="bg-card">Director</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-muted/20 border-t border-border flex justify-end gap-2 select-none">
                <Button 
                  size="sm" 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setShowAddModal(false)}
                  className="hover:bg-muted text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  type="submit" 
                  disabled={!newName.trim()}
                  className="bg-gold text-royal-black hover:bg-gold/90 text-xs font-bold px-4"
                >
                  Initialize Feed
                </Button>
              </div>
            </form>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}