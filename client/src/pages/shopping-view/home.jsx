import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronRightIcon,
  Footprints,
  ShoppingBag,
  ShirtIcon,
  StarIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const NikeLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M21 8.75c-3.14 0-8.32 2.14-11.37 5.17-1.12.38-4.22.84-5.38.99.18-.32 1.35-1.99 2.53-3.46 3.03-3.75 8.16-5.87 14.22-2.7z" />
  </svg>
);

const AdidasLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M2.5 19H6l3-6.5H5.5L2.5 19zm6 0h3.5l3-10H11.5L8.5 19zm6 0H18l3-13.5h-3.5L14.5 19z" />
  </svg>
);

const PumaLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M19.5 6c-1.5 0-3 1-3.5 2.5-.5-1.5-2-2.5-3.5-2.5s-3 1-3.5 2.5c-.5-1.5-2-2.5-3.5-2.5S3 7 2.5 8.5C2 7 1 6 0 6v12c4 0 4-4 8-4s4 4 8 4 4-4 8-4v-12c-1 0-2 1-2.5 2.5-.5-1.5-2-2.5-3.5-2.5z" />
  </svg>
);

const LevisLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
    <path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
    <text
      x="12"
      y="13"
      fontSize="5"
      fontWeight="bold"
      textAnchor="middle"
      fill="currentColor"
    >
      LEVI&apos;S
    </text>
  </svg>
);

const ZaraLogo = () => (
  <div className="font-serif font-black text-2xl tracking-tighter">ZARA</div>
);

const HMLogo = () => (
  <div className="font-serif font-black text-2xl italic text-red-600">H&M</div>
);

const categoriesWithIcon = [
  {
    id: "men",
    label: "Men",
    icon: ShirtIcon,
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "women",
    label: "Women",
    icon: ShoppingBag,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "kids",
    label: "Kids",
    icon: BabyIcon,
    image:
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "accessories",
    label: "Accessories",
    icon: WatchIcon,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
  },
  {
    id: "footwear",
    label: "Footwear",
    icon: Footprints,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
  },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: NikeLogo },
  { id: "adidas", label: "Adidas", icon: AdidasLogo },
  { id: "puma", label: "Puma", icon: PumaLogo },
  { id: "levi", label: "Levi's", icon: LevisLogo },
  { id: "zara", label: "Zara", icon: ZaraLogo },
  { id: "h&m", label: "H&M", icon: HMLogo },
];
const userReviews = [
  {
    name: "Verified User",
    rating: 5,
    comment:
      "Amazing quality products! The delivery was super fast and the packaging was premium.",
  },
  {
    name: "Verified User",
    rating: 4,
    comment:
      "Great experience shopping here. The user interface is very smooth and easy to use.",
  },
  {
    name: "Verified User",
    rating: 5,
    comment:
      "Found exactly what I was looking for. The customer support team is very helpful.",
  },
];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewSlide, setCurrentReviewSlide] = useState(0);

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
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

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);

    const reviewTimer = setInterval(() => {
      setCurrentReviewSlide(
        (prevSlide) => (prevSlide + 1) % userReviews.length,
      );
    }, 7000);

    return () => {
      clearInterval(timer);
      clearInterval(reviewTimer);
    };
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/3 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[120px] animate-float"></div>
      </div>

      {/* Hero Section - Boutique Aesthetic */}
      <div className="relative w-full h-screen overflow-hidden group z-10 shadow-2xl">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <div
                key={index}
                className={`${
                  index === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                } absolute top-0 left-0 w-full h-full transition-all duration-[1500ms] ease-out`}
              >
                <img
                  src={slide?.image}
                  className="w-full h-full object-cover brightness-[1.05] saturate-110 transform group-hover:scale-105 transition-transform duration-[10000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex flex-col justify-center p-8 md:p-24">
                  <div className="max-w-2xl translate-y-8 animate-in fade-in slide-in-from-bottom duration-1000 fill-mode-forwards">
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
                      New Season 2024
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-[0.9] text-glow">
                      {index === 0
                        ? "Graceful Modesty"
                        : index === 1
                          ? "Timeless Accessories"
                          : "Premium Essentials"}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200/90 mb-10 max-w-lg font-light leading-relaxed italic">
                      {index === 0
                        ? "Experience elegance with our new 2024 Abaya and Modest wear collection."
                        : index === 1
                          ? "Sophisticated timepieces and jewelry designed for the modern lifestyle."
                          : "Elevate your everyday look with our curated selection of modest essentials."}
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => navigate("/shop/listing")}
                        size="lg"
                        className="h-14 px-10 text-base font-bold tracking-widest uppercase rounded-none hover:bg-white hover:text-black transition-all duration-300 shadow-2xl group"
                      >
                        Shop Now
                        <ChevronRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </Button>
                      <Button
                        onClick={() => navigate("/shop/lookbook")}
                        variant="outline"
                        size="lg"
                        className="h-14 px-10 text-base font-bold tracking-widest uppercase rounded-none border-white text-white hover:bg-white hover:text-black bg-transparent transition-all duration-300"
                      >
                        Lookbook
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}

        {/* Progress bar for Hero */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
          <div
            className="h-full bg-primary transition-all duration-[5000ms] linear"
            style={{
              width: `${((currentSlide + 1) / (featureImageList?.length || 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Categories Section - Strong Typography & Glass Cards */}
      <section className="py-16 relative z-10 bg-[#fafafa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
              The Departments
            </span>
            <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
              Explore the <br /> Collection
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="group cursor-pointer border-none bg-transparent hover:-translate-y-4 transition-all duration-700 relative overflow-hidden h-[380px] rounded-[40px] shadow-2xl"
              >
                <CardContent className="p-0 h-full relative">
                  {/* Background Image with Low Initial Opacity */}
                  <img
                    src={categoryItem.image}
                    alt={categoryItem.label}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-100"
                  />

                  {/* Graduate Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500"></div>

                  {/* Content Container */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/5 group-hover:bg-transparent transition-all">
                    <div className="w-20 h-20 glass rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-2xl scale-90 group-hover:scale-100">
                      <categoryItem.icon className="w-8 h-8" />
                    </div>

                    <h3 className="font-black text-4xl text-white uppercase tracking-tighter mb-4 drop-shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {categoryItem.label}
                    </h3>

                    <div className="overflow-hidden mt-2">
                      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                        <span>Shop Now</span>
                        <span className="text-lg leading-none">&rarr;</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Brands Architectural Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none grayscale contrast-125">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover"
            alt="luxury bg"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary font-bold tracking-[0.5em] uppercase text-[9px] mb-10 block opacity-80">
            Global Partners
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-12 tracking-tighter leading-none">
            Architects of <br /> Modern Design
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-16 lg:gap-24 max-w-6xl mx-auto items-center">
            {brandsWithIcon.map((brandItem) => (
              <div
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer group flex flex-col items-center justify-center transition-all duration-700 hover:scale-125"
              >
                <div className="text-white filter brightness-0 invert opacity-30 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-2">
                  <brandItem.icon />
                </div>
                <div className="h-0.5 w-0 bg-primary mt-4 group-hover:w-8 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - High Contrast Editorial Grid */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-12">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">
                Seasonal Selection
              </span>
              <h2 className="text-6xl md:text-8xl font-black tracking-[ -0.05em] leading-[0.85] mb-6 md:mb-0">
                New <br /> Arrivals
              </h2>
            </div>
            <div className="flex flex-col items-end gap-6">
              <p className="text-muted-foreground italic text-right max-w-xs text-lg">
                The latest additions to our curated boutique collection.
              </p>
              <Button
                variant="link"
                onClick={() => navigate("/shop/listing")}
                className="text-black font-black text-xs uppercase tracking-[0.3em] p-0 group h-auto"
              >
                View Catalog{" "}
                <span className="inline-block transition-transform group-hover:translate-x-2">
                  &rarr;
                </span>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <div
                    key={productItem._id}
                    className="animate-in fade-in zoom-in-95 duration-1000"
                  >
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddToCart}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>

      {/* Testimonials - Editorial Block */}
      <section className="py-24 bg-[#070707] text-white relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/5 rounded-full blur-[200px] pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-[10px] font-bold mb-12 tracking-[0.6em] uppercase text-primary underline decoration-primary/30 underline-offset-[12px]">
            Testimonials
          </h2>

          <div className="max-w-5xl mx-auto h-[300px] relative">
            {userReviews.map((review, index) => (
              <div
                key={index}
                className={`${
                  index === currentReviewSlide
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-20 scale-95"
                } absolute inset-0 transition-all duration-[1200ms] ease-out`}
              >
                <div className="flex justify-center mb-12">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="w-4 h-4 fill-primary text-primary mx-1 shadow-primary/20"
                    />
                  ))}
                </div>
                <p className="text-4xl md:text-6xl italic font-light leading-[1.1] mb-12 px-12 text-gray-100/90 tracking-tight">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-px bg-primary/40 mb-2"></div>
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.5em]">
                    {review.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-24">
            {userReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReviewSlide(index)}
                className={`h-0.5 transition-all duration-[800ms] rounded-full ${
                  index === currentReviewSlide
                    ? "bg-primary w-20"
                    : "bg-white/10 w-8 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
