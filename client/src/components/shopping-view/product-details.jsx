import PropTypes from "prop-types";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { Badge } from "../ui/badge";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();

  function handleRatingChange(getRating) {
    console.log(getRating, "getRating");

    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId,
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails, dispatch]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-12 p-0 overflow-hidden bg-white/95 backdrop-blur-3xl border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[65vw] rounded-[40px]">
        {/* Left Side: Product Image Section */}
        <div className="relative h-[400px] md:h-full group overflow-hidden bg-gray-50">
          <img
            src={
              productDetails?.image ||
              "https://images.unsplash.com/photo-1594032194509-0056023973b2?q=80&w=1974&auto=format&fit=crop"
            }
            alt={productDetails?.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1594032194509-0056023973b2?q=80&w=1974&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

          <div className="absolute top-8 left-8 flex flex-col gap-2">
            <Badge className="bg-white/20 backdrop-blur-xl border-white/30 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
              Exclusive Collection
            </Badge>
          </div>
        </div>

        {/* Right Side: Product Details Section */}
        <div className="p-8 md:p-16 flex flex-col h-full max-h-[85vh] overflow-auto custom-scrollbar">
          <div className="flex-1">
            <div className="mb-8">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-3 block opacity-60">
                Premium Boutique
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 leading-[1.1] mb-6">
                {productDetails?.title}
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed italic border-l-4 border-gray-100 pl-6 py-2">
                &ldquo;{productDetails?.description}&rdquo;
              </p>
            </div>

            <div className="flex items-end gap-6 mb-12">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                  Price
                </span>
                <p
                  className={`text-4xl font-black tracking-tighter ${productDetails?.salePrice > 0 ? "line-through text-gray-300 text-2xl" : "text-gray-900"}`}
                >
                  ৳{productDetails?.price?.toLocaleString()}
                </p>
              </div>
              {productDetails?.salePrice > 0 && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                    Special
                  </span>
                  <p className="text-4xl font-black tracking-tighter text-primary">
                    ৳{productDetails?.salePrice?.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-12 p-4 bg-gray-50 rounded-2xl w-fit">
              <StarRatingComponent rating={averageReview} />
              <div className="h-4 w-[1px] bg-gray-200"></div>
              <span className="text-xs font-black uppercase tracking-widest text-gray-600">
                {averageReview.toFixed(1)} / 5.0
              </span>
            </div>

            <div className="mb-12">
              {productDetails?.totalStock === 0 ? (
                <Button
                  className="w-full h-16 rounded-2xl bg-gray-100 text-gray-400 cursor-not-allowed border-none font-black uppercase tracking-widest text-xs"
                  disabled
                >
                  Archived / Out of Stock
                </Button>
              ) : (
                <Button
                  className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                  onClick={() =>
                    handleAddToCart(
                      productDetails?._id,
                      productDetails?.totalStock,
                    )
                  }
                >
                  Acquire to Collection
                </Button>
              )}
              {productDetails?.totalStock < 10 &&
                productDetails?.totalStock > 0 && (
                  <p className="text-[10px] text-center mt-4 text-orange-500 font-black uppercase tracking-widest animate-pulse">
                    Only {productDetails?.totalStock} remaining in stock
                  </p>
                )}
            </div>

            <Separator className="mb-12 opacity-50" />

            {/* Reviews Section */}
            <div className="space-y-12">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black tracking-tighter uppercase">
                  Client Reviews
                </h2>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {reviews?.length || 0} Stories
                </span>
              </div>

              <div className="space-y-8">
                {reviews && reviews.length > 0 ? (
                  reviews.map((reviewItem) => (
                    <div key={reviewItem._id} className="flex gap-6 group">
                      <Avatar className="w-12 h-12 border-none ring-2 ring-gray-100 ring-offset-2 transition-transform group-hover:scale-110">
                        <AvatarFallback className="bg-black text-white font-black text-xs">
                          {reviewItem?.userName
                            ? reviewItem?.userName[0].toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-black text-sm uppercase tracking-tighter">
                            {reviewItem?.userName}
                          </h3>
                          <div className="flex scale-75 origin-right opacity-60">
                            <StarRatingComponent
                              rating={reviewItem?.reviewValue}
                            />
                          </div>
                        </div>
                        <p className="text-gray-500 leading-relaxed font-medium">
                          {reviewItem.reviewMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground italic text-center py-10 opacity-60">
                    No reviews yet for this masterpiece.
                  </p>
                )}
              </div>

              {/* Add Review */}
              <div className="glass bg-gray-50 p-8 rounded-[32px] space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    Your Rating
                  </Label>
                  <div className="flex gap-1 scale-110 origin-left">
                    <StarRatingComponent
                      rating={rating}
                      handleRatingChange={handleRatingChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest opacity-60 text-right block">
                    Your Message
                  </Label>
                  <Input
                    name="reviewMsg"
                    value={reviewMsg}
                    onChange={(event) => setReviewMsg(event.target.value)}
                    placeholder="Describe your experience..."
                    className="h-14 rounded-2xl border-none bg-white shadow-inner focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
                  />
                </div>

                <Button
                  onClick={handleAddReview}
                  disabled={reviewMsg.trim() === "" || rating === 0}
                  className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg"
                  variant="secondary"
                >
                  Share Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ProductDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  productDetails: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    salePrice: PropTypes.number,
    totalStock: PropTypes.number,
  }),
};

export default ProductDetailsDialog;
