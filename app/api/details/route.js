import { connectToDB } from "@/utils/database";
import Tractor from "@/models/tractor";

export async function GET(request) {
    try {
        await connectToDB();
        const lastRecord = await Tractor.findOne().sort({ invoice: -1 }).select("saledate invoice");
       
        return new Response(JSON.stringify(lastRecord), { status: 200 })
    }
    catch (e) {
        return new Response("Something Went Wrong!" + e, { status: 500 })
    }
}