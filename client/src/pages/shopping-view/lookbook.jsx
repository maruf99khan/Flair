const lookbookImages = [
  "https://images.unsplash.com/photo-1594032194509-0056023973b2?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485230895905-ec17bd36858f?q=80&w=2070&auto=format&fit=crop",
];

function LookbookPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen pt-[120px] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
            Visual Story
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-none">
            The Lookbook
            <br />
            Collection
          </h1>
          <p className="text-xl text-muted-foreground italic max-w-2xl mx-auto leading-relaxed">
            A curated visual journey through our latest seasonal styles,
            captured in their natural element of grace and sophistication.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-12"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lookbookImages.map((img, idx) => (
            <div
              key={idx}
              className={`relative group overflow-hidden rounded-2xl shadow-2xl ${idx % 3 === 1 ? "lg:translate-y-12" : ""}`}
            >
              <img
                src={img}
                alt={`lookbook-${idx}`}
                className="w-full h-[600px] object-cover filter brightness-[0.9] group-hover:brightness-100 group-hover:scale-110 transition-all duration-[1500ms]"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-primary font-bold tracking-widest text-xs uppercase block mb-2">
                  Look {idx + 1}
                </span>
                <h3 className="text-white text-2xl font-black tracking-tight">
                  Seasonal Elegance
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LookbookPage;
