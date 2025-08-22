"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProductForm() {
    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        brand: "",
        stock: "",
        image: "",
        description: "",
    });

    // const { data: session, status } = useSession();
    // const router = useRouter();

    // useEffect(() => {
    //     if (status === "unauthenticated") {
    //         router.push("/login");
    //     }
    // }, [status, router]);


    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("/api/product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...product,
                    price: Number(product.price),
                    stock: Number(product.stock),
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to add product");

            setMessage("Product added successfully!");
            setProduct({
                name: "",
                category: "",
                price: "",
                brand: "",
                stock: "",
                image: "",
                description: "",
            });
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 border rounded-2xl shadow-lg mt-24 md:mt-36 mb-10 lg:mb-20 "
            style={{ backgroundColor: "var(--color-primary)", borderColor: "var(--color-secondary)" }}>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--color-base-200)" }}>
                Add Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "category", "price", "brand", "stock", "image", "description"].map((field) => (
                    <input
                        key={field}
                        type={field === "price" || field === "stock" ? "number" : "text"}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        name={field}
                        value={product[field]}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg focus:outline-none"
                        style={{
                            border: `1px solid var(--color-secondary)`,
                            color: "var(--color-base-200)",
                            backgroundColor: "white",
                        }}
                        required
                    />
                ))}

                <button
                    className="w-full py-3 rounded-lg font-medium transition"
                    style={{
                        backgroundColor: "var(--color-base-200)",
                        color: "var(--color-primary)",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "var(--color-accent)"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--color-base-200)"}
                >
                    Add Product
                </button>
            </form>

            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
}
