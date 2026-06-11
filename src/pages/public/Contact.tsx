import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Mail, Phone, Clock, MessageSquare, Globe, ArrowRight, CheckCircle } from "lucide-react";
import PublicLayout from "@/layouts/PublicLayout";
import { toast } from "sonner";
import CategorySection from "@/components/common/CategorySection";

const SUBJECTS = [
  { value: "membership", label: "Membership" },
  { value: "partnership", label: "Partnerships" },
  { value: "media", label: "Media & Press" },
  { value: "technical", label: "Technical Support" },
  { value: "general", label: "General Inquiry" },
];

const OFFICES = [
  { city: "Dubai", country: "UAE (HQ)", address: "DIFC, Level 14, Gate Building, Dubai", hours: "Sun–Thu, 9am–6pm GST", phone: "+971 4 000 0000" },
  { city: "London", country: "United Kingdom", address: "1 Canada Square, Canary Wharf, London E14", hours: "Mon–Fri, 9am–6pm GMT", phone: "+44 20 0000 0000" },
  { city: "Singapore", country: "Singapore", address: "Marina Bay Financial Centre, Tower 1, Level 22", hours: "Mon–Fri, 9am–6pm SGT", phone: "+65 6000 0000" },
  { city: "New York", country: "USA", address: "1 World Trade Center, Suite 8500, NYC 10007", hours: "Mon–Fri, 9am–6pm EST", phone: "+1 212 000 0000" },
];

const SUPPORT_CHANNELS = [
  { icon: MessageSquare, title: "Live Chat", desc: "Available in-dashboard for all members. Avg. response: 2 minutes.", badge: "Instant" },
  { icon: Mail, title: "Email Support", desc: "hello@supremeworld.ai — for general and membership enquiries.", badge: "24hr response" },
  { icon: Phone, title: "Phone (Elite)", desc: "Dedicated phone line for Elite and Executive members.", badge: "Elite+" },
  { icon: Globe, title: "Help Center", desc: "Comprehensive knowledge base with guides, FAQs, and tutorials.", badge: "Self-service" },
];

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const first = fd.get("fname") as string;
    const email = fd.get("email") as string;
    if (!first || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Message received. We will respond within 24 hours.");
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            We Respond Within 24 Hours
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-4">
            Contact <span className="text-gold">SupremeWorld</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Reach our team for membership inquiries, partnership opportunities, press enquiries, or technical support.
          </p>
        </div>
      </section>

      {/* Support channels */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUPPORT_CHANNELS.map((c) => (
              <div key={c.title} className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:border-gold/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-foreground text-sm">{c.title}</p>
                    <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground">{c.badge}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Send a Message</h2>
              <p className="text-muted-foreground mb-6 text-sm">Our team will respond within 24 business hours.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle className="w-12 h-12 text-success mb-4" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Message Sent</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">Thank you for reaching out. A member of our team will respond within 24 hours.</p>
                  <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fname">First Name <span className="text-destructive">*</span></Label>
                      <Input id="fname" name="fname" placeholder="John" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="lname">Last Name</Label>
                      <Input id="lname" name="lname" placeholder="Smith" className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                      <Input id="email" name="email" type="email" placeholder="john@company.com" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" placeholder="Your company name" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-1.5 block">Subject Area</Label>
                    <CategorySection categories={SUBJECTS} selected={subject} onSelect={setSubject} label="Select subject" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message <span className="text-destructive">*</span></Label>
                    <Textarea id="message" name="message" placeholder="Tell us how we can help..." className="mt-1 min-h-[140px]" required />
                  </div>
                  <Button type="submit" className="w-full bg-royal-black text-gold border border-gold hover:bg-royal-black-light h-11 font-semibold">
                    Send Message
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>

            {/* Office info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">Global Offices</h2>
                <p className="text-muted-foreground text-sm mb-6">We operate from four offices across three continents.</p>
              </div>
              {OFFICES.map((o) => (
                <div key={o.city} className="p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{o.city}</p>
                        <span className="text-xs text-muted-foreground">{o.country}</span>
                      </div>
                      <p className="text-muted-foreground text-xs mb-1">{o.address}</p>
                      <div className="flex flex-col gap-0.5 mt-2">
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Clock className="w-3 h-3" />{o.hours}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Phone className="w-3 h-3" />{o.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-5 rounded-xl bg-muted/50 border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">General Enquiries</p>
                <a href="mailto:hello@supremeworld.ai" className="text-gold text-sm hover:underline">hello@supremeworld.ai</a>
                <p className="font-semibold text-foreground text-sm mt-3 mb-1">Press & Media</p>
                <a href="mailto:press@supremeworld.ai" className="text-gold text-sm hover:underline">press@supremeworld.ai</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
