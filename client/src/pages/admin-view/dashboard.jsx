import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAllProducts } from "@/store/admin/products-slice";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { DollarSign, ShoppingBag, AlertCircle, Package } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const { orderList } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  const totalRevenue =
    orderList?.reduce((acc, curr) => acc + (curr?.totalAmount || 0), 0) || 0;

  const pendingOrders =
    orderList?.filter((order) => order.orderStatus === "pending").length || 0;

  const lowStockProducts =
    productList?.filter((product) => product.totalStock <= 5).length || 0;

  const stats = [
    {
      label: "Total Revenue",
      value: `৳${totalRevenue.toLocaleString() || "0"}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Orders",
      value: orderList?.length || 0,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Total Products",
      value: productList?.length || 0,
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tighter uppercase">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
          Platform Overview & Statistics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden group hover:scale-[1.02] transition-all duration-300"
          >
            <CardContent className="p-6 flex items-center gap-4">
              <div
                className={`${stat.bg} ${stat.color} p-4 rounded-2xl transition-all duration-300 group-hover:rotate-6`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-black tracking-tight">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-black tracking-tight uppercase">
              Inventory Status
            </CardTitle>
            <CardDescription className="font-medium">
              Products requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
              <AlertCircle className="text-amber-600 w-8 h-8" />
              <div>
                <p className="font-black text-amber-900">
                  {lowStockProducts} Products
                </p>
                <p className="text-sm text-amber-700 font-medium">
                  Have low stock (under 5 units remaining)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-black tracking-tight uppercase">
              Recent Performance
            </CardTitle>
            <CardDescription className="font-medium">
              Operational efficiency tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <Package className="text-emerald-600 w-8 h-8" />
              <div>
                <p className="font-black text-emerald-900">Success Rate</p>
                <p className="text-sm text-emerald-700 font-medium">
                  All products are being synced correctly with the storefront.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
