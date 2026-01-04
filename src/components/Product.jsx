import React, { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import useFetchProducts from "../utils/useFetchProducts";
import { useCart } from "../utils/useCart";

export const Product = () => {
  const [selectedRating, setSelectedRating] = useState("");
  const { addToCart, cartItems } = useCart();
  const { prodList, loading } = useFetchProducts();

  // Log cart updates for debugging
  useEffect(() => {
    console.log("🛒 Cart Context Updated:", cartItems);
  }, [cartItems]);

  // Extract unique ratings for the dropdown
  const ratings = useMemo(() => {
    if (!prodList?.products) return [];
    return [...new Set(prodList.products.map((p) => Math.floor(p.rating)))]
      .sort((a, b) => b - a);
  }, [prodList]);

  // Filter products based on selected rating
  const filteredProducts = useMemo(() => {
    if (!selectedRating) return prodList?.products || [];
    return prodList?.products?.filter(
      (p) => Math.floor(p.rating) >= selectedRating
    );
  }, [prodList, selectedRating]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-bold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Header />

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-64">
          <select
            className="w-full appearance-none px-4 py-2.5 bg-white border-2 border-orange-200 
                       text-gray-700 rounded-xl shadow-sm transition-all focus:outline-none 
                       focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-pointer"
            value={selectedRating}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedRating(val === "" ? "" : Number(val));
            }}
          >
            <option value="">All Ratings</option>
            {ratings.map((rating) => (
              <option key={rating} value={rating}>
                {rating} Stars & above
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-orange-500">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

      
      </div>

     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl 
                         transition-shadow duration-300 flex flex-col overflow-hidden group"
            >
           
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={prod.images?.[0] || "https://via.placeholder.com/300"}
                  alt={prod.title}
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-sm font-bold text-orange-600 shadow-sm">
                  ★ {prod.rating}
                </div>
              </div>

            
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-800 text-lg truncate">
                  {prod.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {prod.description}
                </p>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-gray-900">
                    ${prod.price}
                  </span>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 
                               rounded-xl transition-colors active:scale-95 shadow-md shadow-green-100"
                    onClick={() => addToCart(prod)}
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredProducts?.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">No products found with this rating.</p>
          </div>
        )}
      </main>
    </div>
  );
};