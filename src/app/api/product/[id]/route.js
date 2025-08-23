

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET product by ID
export async function GET(req, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("sunTech"); 
    const collection = db.collection("products");

    const { id } = params;
    console.log(id)

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

