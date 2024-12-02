import { revalidatePath } from "next/cache";
// import { Mock } from "node:test";
import { auth, currentUser } from "@clerk/nextjs/server";

type MockUser = {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export default async function MockUsers() {
    const authObj = await auth();
    const userObj = await currentUser();
    console.log({authObj, userObj,});

    const response = await fetch("https://67484e955801f51535904371.mockapi.io/users");
    const users = await response.json();

    async function addUser(formData: FormData) {
        "use server"
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const response = await fetch(
            "https://67484e955801f51535904371.mockapi.io/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: ""
                },
                body: JSON.stringify({ name, email, phone }),
            }
        );
        const newUser = await response.json();
        revalidatePath("/mock-users");
        console.log(newUser);
    }

    return (
        <div className="py-10">
            <form action={addUser} className="mb-4">
                <input type="text" name="name" placeholder="Name" required className="border p-2 mr-2" />
                <input type="email" name="email" placeholder="Email" required className="border p-2 mr-2" />
                <input type="text" name="phone" placeholder="PhoneNo." required className="border p-2 mr-2" />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >Add User</button>
            </form>
            <div className="grid grid-cols-4 gap-4 py-10">
                {users.map((user: MockUser) => (
                    <div
                        key={user.id}
                        className="p-4 bg-white shadow-md rounded-lg text-grey-700"
                    >
                        {user.name} <br />({user.email})
                    </div>
                ))}
            </div>
        </div>
    );
}