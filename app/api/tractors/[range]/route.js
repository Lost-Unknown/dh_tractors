import { connectToDB } from "@/utils/database";
import Tractor from "@/models/tractor";

export async function GET (request,context){
    try {
        await connectToDB()
        const params = await context.params;
        const [startDate, endDate] = params.range.split("=");
        // Mongoose automatically converts JavaScript Date objects into MongoDB dates
        const Tractors = await Tractor.find({
            saledate: {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            }
        }).select("bname fname mobile model saledate docs");

        // .find() returns an array, so check the length instead of !Tractors
        if (Tractors.length === 0) {
            return new Response("Data Not Found", { status: 404 });
        }

        // Added Content-Type header so the client parses it as JSON automatically
        return new Response(JSON.stringify(Tractors), { 
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }
    catch(e){
        console.error("API Error:", e);
        return new Response("Something Went Wrong: " + e.message, { status: 500 });
    }
}   