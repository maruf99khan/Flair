import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts,
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();

  const categorySearchParam = searchParams.get("category");

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  function handleClearFilters() {
    setFilters({});
    sessionStorage.removeItem("filters");
    setSearchParams(new URLSearchParams());
  }

  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
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

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, [categorySearchParam]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({
          filterParams: filters,
          sortParams: sort,
          keyword: keyword,
        }),
      );
  }, [dispatch, sort, filters, keyword]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] pt-[120px]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar Filter */}
          <aside className="relative">
            <div className="sticky top-40 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black tracking-tighter uppercase">
                  Filters
                </h2>
                {Object.keys(filters).length > 0 && (
                  <Button
                    variant="ghost"
                    onClick={handleClearFilters}
                    className="text-[10px] uppercase tracking-widest font-bold text-primary hover:bg-primary/5 p-0 h-auto"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <ProductFilter filters={filters} handleFilter={handleFilter} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-8">
            {/* Toolbar */}
            <div className="glass-dark bg-black p-6 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <h2 className="text-white font-black text-xl tracking-tighter uppercase whitespace-nowrap">
                  Collection
                </h2>
                <div className="relative w-full md:w-[400px]">
                  <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search by name, style, or brand..."
                    className="bg-white/10 border-white/10 text-white placeholder:text-white/40 h-12 rounded-2xl pl-12 focus:bg-white/20 transition-all border-none"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {productList?.length} Items Found
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10 h-10 px-6 rounded-xl flex items-center gap-2"
                    >
                      <ArrowUpDownIcon className="h-4 w-4" />
                      <span className="text-[10px] uppercase font-bold tracking-widest">
                        Sort By
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[200px] rounded-2xl p-2"
                  >
                    <DropdownMenuRadioGroup
                      value={sort}
                      onValueChange={handleSort}
                    >
                      {sortOptions.map((sortItem) => (
                        <DropdownMenuRadioItem
                          value={sortItem.id}
                          key={sortItem.id}
                          className="rounded-xl cursor-pointer"
                        >
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Product Grid */}
            {productList && productList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem._id}
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 space-y-6 animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl">
                  🕯️
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">
                    Nothing found
                  </h3>
                  <p className="text-muted-foreground italic">
                    Adjust your filters or search keywords to find what
                    you&apos;re looking for.
                  </p>
                </div>
                <Button
                  onClick={handleClearFilters}
                  className="rounded-full px-8 font-bold"
                >
                  Reset Collection
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
