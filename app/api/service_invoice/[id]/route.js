import { connectToDB } from "@/utils/database";
import Service from "@/models/service";

export async function GET(request,context){
    try{
        connectToDB()
        const params = await context.params;
        const serviceDetail = await Service.findById(params.id)
        if(!serviceDetail)
            return new Response("Not Found",{status:404})
        return new Response(JSON.stringify(serviceDetail),{status:200})
    }
    catch(error){
        return new Response("Something Went Wrong While Getting Details",{status:500})
    }
}