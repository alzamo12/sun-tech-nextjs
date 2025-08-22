import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const data = await req.json(); 

    const client = await clientPromise;
    const db = client.db("sunTech"); 
    const products = db.collection("products");

    const result = await products.insertOne(data);

    return new Response(JSON.stringify({ message: "Product added", id: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET product by ID
export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("sunTech"); // change to your DB name
    const collection = db.collection("products");

    const { id } = params;
    console.log(id)

    // Validate and find product by ObjectId
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

