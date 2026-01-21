import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0,
        )
      : 0;

  function handlePlaceOrder() {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });

      return;
    }
    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "confirmed",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "paid",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data, "order creation");
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  }

  if (isPaymentStart) {
    return <Navigate to="/shop/payment-success" />;
  }

  return (
    <div className="flex flex-col pt-[120px] bg-[#fafafa] min-h-screen">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
          className="h-full w-full object-cover object-center brightness-90 transition-transform duration-[20000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-center md:text-left">
          <h1 className="text-5xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
            Finalizing <br /> Choice
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 py-16">
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase">
                Delivery Destination
              </h2>
            </div>
            <Address
              selectedId={currentSelectedAddress}
              setCurrentSelectedAddress={setCurrentSelectedAddress}
            />
          </div>
          <div className="lg:sticky lg:top-40 h-fit space-y-8">
            <div className="glass bg-white p-8 rounded-[32px] shadow-2xl space-y-6">
              <h2 className="text-xl font-black tracking-tighter uppercase mb-6 pb-4 border-b">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-[400px] overflow-auto pr-2 custom-scrollbar">
                {cartItems && cartItems.items && cartItems.items.length > 0 ? (
                  cartItems.items.map((item) => (
                    <UserCartItemsContent
                      key={item.productId}
                      cartItem={item}
                    />
                  ))
                ) : (
                  <p className="text-muted-foreground italic text-center py-8 underline decoration-wavy underline-offset-8 decoration-gray-200">
                    Bag is currently empty
                  </p>
                )}
              </div>

              <div className="space-y-4 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="text-xs uppercase font-bold tracking-widest">
                    Subtotal
                  </span>
                  <span className="font-bold">
                    ৳{totalCartAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground border-b border-gray-100 pb-4">
                  <span className="text-xs uppercase font-bold tracking-widest">
                    Shipping
                  </span>
                  <span className="font-bold uppercase text-[10px]">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-black uppercase tracking-widest">
                    Grand Total
                  </span>
                  <span className="text-2xl font-black tracking-tighter text-primary">
                    ৳{totalCartAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                className={`w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all duration-300 ${!currentSelectedAddress ? "opacity-50 grayscale" : "hover:scale-[1.02] active:scale-95"}`}
                disabled={isPaymentStart || !currentSelectedAddress}
              >
                {isPaymentStart ? "Processing Request..." : "Confirm & Pay"}
              </Button>

              {!currentSelectedAddress && (
                <p className="text-[10px] text-center text-orange-500 font-bold uppercase tracking-widest animate-pulse">
                  &bull; Select a delivery address to proceed &bull;
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
