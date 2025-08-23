import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("sunTech"); 
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


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