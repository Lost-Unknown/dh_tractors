import { connectToDB } from "@/utils/database";
import Spare from "@/models/spare";
export async function POST(request) {
    try {
        await connectToDB()
        const body = await request.json();

        await Spare.insertMany(body);
    return new Response(JSON.stringify({ message: " added successfully!" }), {
      status: 201,
    });

    }
    catch (e) {
        return new Response("Something Went Wrong!" + e, { status: 500 })
    }
}

