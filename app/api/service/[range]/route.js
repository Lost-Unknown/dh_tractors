import { connectToDB } from "@/utils/database";
import Service from "@/models/service";

export async function GET (request,context){
    try {
        await connectToDB()
        const params = await context.params;
        const [startDate, endDate] = params.range.split("=");
        const Services = await Service.find({
            date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          }).select("ownername model mobile hours chassis");
        if(!Services)
            return new Response("Data Not Found",{status:404})
        return new Response(JSON.stringify(Services), { status: 200 })
    }
    catch(e){
        return new Response("Something Went Wrong " + e,{status:500})
    }
}   