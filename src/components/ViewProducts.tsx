import useApi from "@/hooks/useApi";
import { GET_ALL_PRODUCTS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import useVendorStore from "@/store/store";
import { Check, Package } from "lucide-react";
import { useEffect, useState } from "react";

const ViewProducts = () => {
  const {
    products,
    setProducts,
    selectedProducts,
    selectProduct,
    deselectProduct,
  } = useVendorStore();
  const { get } = useApi();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length > 0) return;

    const getProducts = async () => {
      setLoading(true);

      try {
        const result = await get(GET_ALL_PRODUCTS);

        if (result?.success) {
          setProducts(result.data.products);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const isSelected = (id: string) => {
    return selectedProducts.includes(id);
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[200px]">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          <span className="text-gray-600 font-medium">Loading products...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[200px]">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-lg font-medium text-gray-700 mb-1">
            No products found
          </p>
          <p className="text-sm text-gray-500">
            Add some products to get started
          </p>
        </div>
      </div>
    );
  }

  const RenderStars = ({ rating }: { rating: number }) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < Math.floor(rating) ? "text-amber-400" : "text-gray-300"
        }`}
      >
        ⭐
      </span>
    ));
  };

  const CategoryBadge = ({ category }: { category: string }) => {
    return (
      <div
        className={cn(
          "w-4 h-4 rounded-xs border-2 bg-white flex items-center justify-center shadow-sm",
          "border-green-500",
          { "border-red-500": category === "non-veg" }
        )}
      >
        <div
          className={cn("w-2 h-2 rounded-full bg-green-500", {
            "bg-red-500": category === "non-veg",
          })}
        ></div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            className={`border rounded-lg hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer ${
              isSelected(product._id)
                ? "bg-amber-50 border-amber-300 shadow-sm"
                : "bg-white border-amber-200 hover:border-amber-300 hover:bg-amber-50/30"
            }`}
            key={product._id}
            onClick={() => {
              void (isSelected(product._id)
                ? deselectProduct(product._id)
                : selectProduct(product._id));
            }}
          >
            <div className="p-4 flex gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg border border-amber-200"
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 truncate pr-2">
                    {product.name}
                  </h3>
                  <CategoryBadge category={product.category} />
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Price */}
                    <span className="text-xl font-bold text-amber-600">
                      ₹{product.price}
                    </span>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <RenderStars rating={product.rating || 0} />
                      <span className="text-sm text-gray-600 ml-1">
                        ({product.ratingCount || 0})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Checkbox */}
              <div className="flex items-start pt-1">
                <div
                  className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                    isSelected(product._id)
                      ? "border-amber-500 bg-amber-500"
                      : "border-gray-300 hover:border-amber-400"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    void (isSelected(product._id)
                      ? deselectProduct(product._id)
                      : selectProduct(product._id));
                  }}
                >
                  {isSelected(product._id) && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
