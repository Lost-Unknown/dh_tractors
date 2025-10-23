import { connectToDB } from "@/utils/database";
import Spare from "@/models/spare";

export async function GET(request, context) {
    try {
        await connectToDB()
        const params = await context.params;
        const parts = params.parts.split("_");
        const spares = await Spare.find({ code: { $in: parts } }).lean();
        
        // 2. Build a lookup map
        const sparesMap = new Map();
        for (const spare of spares) {
            sparesMap.set(spare.code, spare);
        }
        // 3. Reorder according to `codes`
        const orderedSpares = parts
            .map(code => sparesMap.get(code)) // could be undefined if not found
            .filter(Boolean); // remove missing ones safely
        if (!orderedSpares)
            return new Response("Data Not Found", { status: 404 })
        return new Response(JSON.stringify(orderedSpares), { status: 200 })
    }
    catch (e) {
        return new Response("Something Went Wrong " + e, { status: 500 })
    }
}   