import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    // Simulate API call
    console.log("Contact Form Submitted:", formData);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] pt-[100px] py-12 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/3 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
              Get in Touch
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">
              Contact Us
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="glass rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
            {/* Info Section */}
            <div className="md:w-5/12 bg-black p-12 text-white relative h-full">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-12 translate-y-12"></div>
              <h2 className="text-4xl font-black mb-8 tracking-tight">
                Global Support
              </h2>
              <p className="mb-12 text-gray-400 italic leading-relaxed text-lg">
                &ldquo;Our dedicated team is here to assist you with any
                inquiries regarding our flagship services and products.&rdquo;
              </p>
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                    <span className="text-2xl">📞</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                      Phone
                    </span>
                    <span className="text-lg font-bold">+880 123 456 789</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                    <span className="text-2xl">✉️</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                      Email
                    </span>
                    <span className="text-lg font-bold">
                      concierge@smart-service.com
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-500">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                      Office
                    </span>
                    <span className="text-lg font-bold tracking-tight">
                      Gulshan Avenue, Dhaka, BD
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="md:w-7/12 p-12 bg-white/80 backdrop-blur-md">
              <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
                Direct Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="name"
                      className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      required
                      placeholder="Name"
                      className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="subject"
                    className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    required
                    placeholder="Regarding seasonal collection..."
                    className="h-14 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-1"
                  >
                    Inquiry Details
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="How can we assist you today?"
                    className="rounded-3xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg resize-none p-6"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-16 text-sm font-bold tracking-[0.3em] uppercase rounded-3xl shadow-2xl hover:scale-[1.02] transition-transform"
                >
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
