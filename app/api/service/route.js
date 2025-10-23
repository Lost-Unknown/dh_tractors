import { connectToDB } from "@/utils/database";
import Service from "@/models/service";

export async function POST(request) {
    try {
        await connectToDB()
        const lastRecord = await Service.findOne().sort({ invoice: -1 });
        const currentInvoice = lastRecord ? Number(lastRecord.invoice) + 1 : 1;
        const body = await request.json();
        const cleanedSpares = (body.spares || []).map(spare => ({
            code: spare.code,
            quantity: spare.quantity,
            final: spare.final
        }));

        const newService = new Service({
            ownername: body.ownername,
            invoice: currentInvoice,
            model: body.model,
            chassis: body.chassis,
            engine: body.engine,
            mobile: body.mobile,
            date: body.date,
            hours: body.hours,
            spares: cleanedSpares,
            jobs: body.jobs
        })

        await newService.save();
        return new Response(JSON.stringify({ message: "Service added successfully!" }), {
            status: 201,
        });

    }
    catch (e) {
        return new Response("Something Went Wrong!" + e, { status: 500 })
    }
}