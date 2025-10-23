import { connectToDB } from "@/utils/database";
import Service from "@/models/service";

export async function GET (request,context){
    try {
        await connectToDB()
        const params = await context.params;
        const count = params.count;
        const Services = await Service.find().sort({invoice:-1}).limit(count).select("ownername model mobile hours chassis");
        if(!Services)
            return new Response("Data Not Found",{status:404})
        return new Response(JSON.stringify(Services), { status: 200 })
    }
    catch(e){
        return new Response("Something Went Wrong " + e,{status:500})
    }
}   