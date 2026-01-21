import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] pt-[100px]">
      {/* Hero Section */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/3 rounded-full blur-[150px]"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
            Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-none">
            The Future of <br /> Retail Therapy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 italic leading-relaxed">
            We are more than a store. We are a curated ecosystem designed for
            the modern individual who values both logic and beauty.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>
          <Button
            onClick={() => navigate("/shop/home")}
            size="lg"
            className="h-14 px-10 font-bold tracking-widest uppercase rounded-none transition-all duration-300 shadow-2xl"
          >
            Explore the Platform
          </Button>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="p-10 rounded-[32px] glass relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full translate-x-12 -translate-y-12"></div>
            <h2 className="text-3xl font-black mb-4 tracking-tight">
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg italic text-left">
              &ldquo;To provide a robust, scalable, and user-centric platform
              that simplifies the complexities of online commerce for CSE-3532.
              We bridge the gap between service providers and consumers through
              innovative MERN stack technology.&rdquo;
            </p>
          </div>
          <div className="p-10 rounded-[32px] bg-black text-white relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-12 translate-y-12"></div>
            <h2 className="text-3xl font-black mb-4 tracking-tight text-white">
              Our Vision
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg italic text-left">
              &ldquo;We envision a world where every entrepreneur has access to
              high-end digital tools. Our goal is to set the standard for
              internet programming projects through clean code, Redux-driven
              state, and premium design.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              {/* Card Left */}
              <div className="w-full md:w-5/12 group relative">
                <div className="aspect-[3/4] overflow-hidden rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transition-all duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200 font-bold text-8xl">
                    S
                  </div>
                  {/* Decorative element */}
                  <div className="absolute inset-0 border-[20px] border-white/20 pointer-events-none rounded-[40px]"></div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl shadow-xl z-10 animate-float">
                  <span className="text-primary font-black text-xl tracking-tight block">
                    CORE ACHIEVED
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    MERN Stack Certified
                  </span>
                </div>
              </div>

              <div className="w-full md:w-7/12 text-left">
                <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
                  The Creator
                </span>
                <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                  Architect of <br /> Vision
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl font-black tracking-tight mb-2 uppercase text-gray-900">
                      Saiful
                    </h3>
                    <p className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-6">
                      Lead Full Stack Developer & Systems Designer
                    </p>
                  </div>

                  <div className="prose prose-lg text-muted-foreground italic leading-relaxed">
                    <p>
                      Responsible for the end-to-end architecture of the Smart
                      E-commerce platform. Focused on delivering a premium user
                      experience through clean code, Redux-driven state
                      persistence, and professional-grade UI/UX design.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                        Project ID
                      </span>
                      <span className="font-bold text-gray-900">CSE-3532</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                        Focus Area
                      </span>
                      <span className="font-bold text-gray-900">
                        Full Stack MERN
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
