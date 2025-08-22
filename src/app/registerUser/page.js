"use client";

export default function Register() {
    const handleRegister = async (e) => {
        e.preventDefault();

        // Access values directly from e.target
        const name = e.target.name.value;
        const email = e.target.email.value;
        const image = e.target.image.value;
        const password = e.target.password.value;

        console.log({ name, email, image, password });

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, image, password }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("User registered successfully!");
            e.target.reset();
        } else {
            alert(data.error || "Something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Profile Image URL"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
