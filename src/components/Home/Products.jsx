"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-8">Our Products</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <div
            key={product._id}
            className="card bg-accent shadow-xl hover:shadow-2xl transition"
          >
            <figure className="relative w-full h-52 ">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className=" w-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title mb-0">{product.name}</h2>
              {/* <p className="text-sm text-gray-700 font-bold">{product.category}</p> */}
              <p className="text-lg mt-0 font-semibold">${product.price}</p>
              <div className="flex justify-between items-center">
                <span className="">{product.description}</span>
                {/* <span className="text-yellow-500">⭐ {product.rating}</span> */}
              </div>
              <div className="card-actions justify-end mt-4">
                <button onClick={() => router.push(`/product/${product._id}`)} className="btn  bg-base-200 border-none text-white hover:btn-accent hover:shadow-xl btn-sm">
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
