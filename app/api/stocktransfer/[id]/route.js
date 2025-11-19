import { connectToDB } from "@/utils/database";
import StockTransfer from "@/models/stocktransfer";

export async function GET(request,context){
    try{
        connectToDB()
        const params = await context.params;
        const TractorDetail = await StockTransfer.findById(params.id)
        if(!TractorDetail)
            return new Response("Not Found",{status:404})
        return new Response(JSON.stringify(TractorDetail),{status:200})
    }
    catch(error){
        return new Response("Something Went Wrong While Getting Details",{status:500})
    }
}