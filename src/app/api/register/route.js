import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, image, password } = await req.json();
    // console.log(name)

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const client = await clientPromise;
    const db = client.db("sunTech"); // replace "mydb" with your DB name
    const usersCollection = db.collection("users");

    // check if user exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User already exists" }),
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user
    const result = await usersCollection.insertOne({
      name,
      email,
      image: image || "",
      password: hashedPassword,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, userId: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
