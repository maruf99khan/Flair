import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left side: Premium Image with Overlay */}
      <div className="hidden lg:flex relative w-1/2 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Retail"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        <div className="absolute bottom-20 left-20 right-20 space-y-4">
          <span className="text-white/60 font-bold tracking-[0.4em] uppercase text-[10px]">
            Premium E-Commerce
          </span>
          <h1 className="text-6xl font-black text-white tracking-tighter leading-none mb-6">
            SMART <br /> SERVICE
          </h1>
          <p className="text-white/70 text-lg font-medium leading-relaxed max-w-sm italic">
            &ldquo;Experience seamless shopping with cutting-edge technology and
            premium service.&rdquo;
          </p>
        </div>
      </div>

      {/* Right side: Auth Forms */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-[#fafafa]">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
