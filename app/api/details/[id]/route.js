import { connectToDB } from "@/utils/database";
import Tractor from "@/models/tractor";
import mongoose from "mongoose";

export async function GET(request,context){
    try{
        connectToDB()
        const params = await context.params;
        const TractorDetail = await Tractor.findById(params.id)
        if(!TractorDetail)
            return new Response("Not Found",{status:404})
        return new Response(JSON.stringify(TractorDetail),{status:200})
    }
    catch(error){
        return new Response("Something Went Wrong While Getting Details",{status:500})
    }
}


export async function DELETE(request, context) {
    try {
        console.log("--- DELETE API CALLED ---");
        await connectToDB();
        
        const params = await context.params;
        const id = params.id; 
        console.log("1. Received ID to delete:", id);
        
        if (!id) {
            return new Response("ID is required", { status: 400 });
        }

        const objectId = new mongoose.Types.ObjectId(id);
        
        // Let's check if the server can even see this document before deleting
        const exists = await Tractor.findById(objectId);
        console.log("2. Did server find tractor before deleting?", exists ? "YES" : "NO");

        const result = await Tractor.deleteOne({ _id: objectId });
        console.log("3. MongoDB Delete Result:", result);
        
        if (result.deletedCount === 0) {
            console.log("4. FAILED: MongoDB said 0 documents were deleted.");
            return new Response("Tractor not found in DB", { status: 404 });
        }
        
        console.log("4. SUCCESS: Document deleted from DB.");
        return new Response("Deleted Successfully", { status: 200 });
    } catch (error) {
        console.error("Delete API Error:", error);
        return new Response("Failed to delete", { status: 500 });
    }
}