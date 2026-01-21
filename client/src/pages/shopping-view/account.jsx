import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import { useSelector } from "react-redux";
import { User, MapPin, Package, UserCircle } from "lucide-react";

function ShoppingAccount() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col pt-[120px] bg-[#fafafa] min-h-screen">
      {/* User Header */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-lg">
            <UserCircle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">
              {user?.userName || "Member"}
            </h1>
            <p className="text-muted-foreground font-medium text-sm">
              {user?.email || "Exclusive Boutique Member"}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pb-20">
        <div className="glass bg-white p-8 md:p-12 rounded-[40px] shadow-2xl overflow-hidden min-h-[600px]">
          <Tabs defaultValue="orders" className="space-y-12">
            <div className="flex justify-center border-b border-gray-100 mb-12">
              <TabsList className="bg-transparent border-none p-0 flex gap-4 md:gap-12 overflow-x-auto custom-scrollbar h-auto pb-4">
                <TabsTrigger
                  value="profile"
                  className="bg-transparent border-none shadow-none text-muted-foreground data-[state=active]:text-black data-[state=active]:bg-transparent relative h-auto p-0 group"
                >
                  <div className="flex flex-col items-center gap-2 px-4">
                    <User className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      My Profile
                    </span>
                    <div className="h-1 w-0 bg-primary absolute -bottom-4 left-0 transition-all duration-300 group-data-[state=active]:w-full"></div>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="bg-transparent border-none shadow-none text-muted-foreground data-[state=active]:text-black data-[state=active]:bg-transparent relative h-auto p-0 group"
                >
                  <div className="flex flex-col items-center gap-2 px-4">
                    <Package className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Past Orders
                    </span>
                    <div className="h-1 w-0 bg-primary absolute -bottom-4 left-0 transition-all duration-300 group-data-[state=active]:w-full"></div>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="address"
                  className="bg-transparent border-none shadow-none text-muted-foreground data-[state=active]:text-black data-[state=active]:bg-transparent relative h-auto p-0 group"
                >
                  <div className="flex flex-col items-center gap-2 px-4">
                    <MapPin className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Saved Addresses
                    </span>
                    <div className="h-1 w-0 bg-primary absolute -bottom-4 left-0 transition-all duration-300 group-data-[state=active]:w-full"></div>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="profile"
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tighter uppercase">
                    Member Information
                  </h2>
                  <p className="text-muted-foreground italic">
                    &ldquo;Customize your presence in our boutique
                    collection.&rdquo;
                  </p>
                </div>
                <div className="grid gap-6 p-8 bg-gray-50 rounded-[32px] text-left border border-gray-100 shadow-inner">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      Display Name
                    </Label>
                    <p className="text-xl font-bold">{user?.userName}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                      Email Address
                    </Label>
                    <p className="text-xl font-bold">{user?.email}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-muted-foreground font-medium italic">
                      Profile editing functionality is arriving in the next
                      seasonal update.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="orders"
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <ShoppingOrders />
            </TabsContent>

            <TabsContent
              value="address"
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
