"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetails() {
    // Example product data (replace with your DB fetch later)
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/product/${id}`)
                .then((res) => res.json())
                .then((data) => setProduct(data));
        }
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className=" bg-primary text-base-200 w-full mt-24 mb-10 md:mt-36 md:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Product Image */}
                <div className="flex justify-center">
                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain rounded-2xl shadow-lg"
                            priority
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
                    <p className="text-2xl font-semibold text-secondary">{product.price}</p>
                    <p className="text-base md:text-lg leading-relaxed">
                        {product.description}
                    </p>
                    <p className="text-sm text-gray-700 font-bold">{product.category}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-yellow-500">⭐ {product.rating}</span>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button className="btn bg-accent text-white hover:bg-secondary w-full sm:w-auto">
                            Add to Cart
                        </button>
                        <button className="btn bg-base200 text-white hover:bg-secondary w-full sm:w-auto">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
