import useApi from "@/hooks/useApi";
import { GET_ALL_PRODUCTS } from "@/lib/routes";
import useVendorStore from "@/store/store";
import { Check } from "lucide-react";
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
    const getProducts = async () => {
      if (products.length > 0) return;

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
  }, [get, products.length, setProducts]);

  const isSelected = (id: string) => {
    return selectedProducts.includes(id);
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[200px]">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
          <span className="text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-[200px]">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">📦</div>
          <p>No products found</p>
          <p className="text-sm">Add some products to get started</p>
        </div>
      </div>
    );
  }

  const RenderStars = ({ rating }: { rating: number }) => {
    return Array.from({ length: rating }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid gap-4">
        {products.map((product) => (
          <div
            className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 overflow-hidden"
            key={product._id}
          >
            <div className="p-4 flex gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {product.name}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Price */}
                    <span className="text-xl font-bold text-orange-600">
                      ₹{product.price}
                    </span>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <RenderStars rating={product.rating} />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.ratingCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-2 flex-col h-full justify-start">
                {isSelected(product._id) ? (
                  <div className="border rounded-xs border-amber-600 text-amber-600 ">
                    <Check
                      className="h-4 w-4"
                      onClick={() => deselectProduct(product._id)}
                    />
                  </div>
                ) : (
                  <div
                    className="p-2 border rounded-xs border-gray-400"
                    onClick={() => selectProduct(product._id)}
                  ></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;
