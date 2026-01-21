import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import PropTypes from "prop-types";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto group hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] transition-all duration-500 border-none bg-white rounded-[32px] overflow-hidden relative">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={
              product?.image ||
              "https://images.unsplash.com/photo-1594032194509-0056023973b2?q=80&w=1974&auto=format&fit=crop"
            }
            alt={product?.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1594032194509-0056023973b2?q=80&w=1974&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>

          {product?.totalStock === 0 ? (
            <Badge className="absolute top-4 left-4 bg-black text-white border-none py-1.5 px-3 font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg">
              Archived
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-4 left-4 bg-orange-500 text-white border-none py-1.5 px-3 font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg">
              {`Limited: ${product?.totalStock}`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-4 left-4 bg-white text-black border-none py-1.5 px-3 font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg">
              Special Offer
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-[10px] font-black text-primary/60 uppercase tracking-[0.2em] block mb-1">
                {brandOptionsMap[product?.brand]}
              </span>
              <h2 className="text-xl font-bold tracking-tighter text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                {product?.title}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {product?.salePrice > 0 ? (
              <>
                <span className="text-xl font-black text-gray-900 tracking-tighter">
                  ৳{product?.salePrice.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-muted-foreground line-through decoration-red-500/50">
                  ৳{product?.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                ৳{product?.price.toLocaleString()}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-5 pt-0">
        {product?.totalStock === 0 ? (
          <Button
            className="w-full bg-gray-100 text-gray-400 cursor-not-allowed h-12 rounded-2xl border-none shadow-none"
            disabled
          >
            Sold Out
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
            className="w-full h-12 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Add to Bag
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

ShoppingProductTile.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    totalStock: PropTypes.number,
    salePrice: PropTypes.number,
    price: PropTypes.number,
    brand: PropTypes.string,
  }),
  handleGetProductDetails: PropTypes.func,
  handleAddtoCart: PropTypes.func,
};

export default ShoppingProductTile;
