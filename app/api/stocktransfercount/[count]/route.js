import { connectToDB } from "@/utils/database";
import StockTransfer from "@/models/stocktransfer";

export async function GET (request,context){
    try {
        await connectToDB()
        const params = await context.params;
        const count = params.count;
        const Tractors = await StockTransfer.find().sort({invoice:-1}).limit(count).select("bname mobile model saledate invoice");
        if(!Tractors)
            return new Response("Data Not Found",{status:404})
        return new Response(JSON.stringify(Tractors), { status: 200 })
    }
    catch(e){
        return new Response("Something Went Wrong " + e,{status:500})
    }
}   