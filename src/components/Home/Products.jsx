"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="card bg-accent shadow-xl hover:shadow-2xl transition"
          >
            <figure className="h-48 relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-lg font-semibold">${product.price}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="badge badge-outline">{product.brand}</span>
                <span className="text-yellow-500">⭐ {product.rating}</span>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn  bg-base-200 border-none text-white hover:btn-accent hover:shadow-xl btn-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
