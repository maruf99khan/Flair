import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1 space-y-8">
            <Link
              to="/shop/home"
              className="text-3xl font-black tracking-tighter flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-black text-xl font-black">S</span>
              </div>
              SMART SERVICE
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium">
              Curating high-end modest fashion for the modern individual.
              Experience the intersection of grace, quality, and timeless
              design.
            </p>
            <div className="flex gap-4">
              {["FB", "IG", "TW", "LI"].map((icon) => (
                <div
                  key={icon}
                  className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-gray-500">
              Navigation
            </h3>
            <ul className="space-y-4 text-sm font-bold tracking-tight text-gray-400">
              <li>
                <Link
                  to="/shop/home"
                  className="hover:text-white transition-colors"
                >
                  Front Page
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/listing"
                  className="hover:text-white transition-colors"
                >
                  The Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/lookbook"
                  className="hover:text-white transition-colors"
                >
                  Lookbook
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/about"
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-gray-500">
              Boutique
            </h3>
            <ul className="space-y-4 text-sm font-bold tracking-tight text-gray-400">
              <li>
                <Link
                  to="/shop/listing"
                  className="hover:text-white transition-colors"
                >
                  Men&apos;s Modesty
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/listing"
                  className="hover:text-white transition-colors"
                >
                  Women&apos;s Grace
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/listing"
                  className="hover:text-white transition-colors"
                >
                  Young Hearts
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/listing"
                  className="hover:text-white transition-colors"
                >
                  Artisan Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-gray-500">
              Concierge
            </h3>
            <ul className="space-y-6 text-sm font-bold tracking-tight text-gray-400">
              <li>
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-black">
                  Location
                </span>
                Gulshan Avenue, Dhaka, BD
              </li>
              <li>
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-black">
                  Inquiries
                </span>
                concierge@flair-boutique.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 gap-6">
          <p>
            © {new Date().getFullYear()} SMART SERVICE PREMIUM CLASSIFIED. ALL
            RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <span className="cursor-pointer hover:text-white transition-colors">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-white transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
