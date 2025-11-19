import { connectToDB } from "@/utils/database";
import Tractor from "@/models/tractor";

export async function GET(request, context) {
  try {
    await connectToDB();
    const params = await context.params;
    const count = params.count;
    const Tractors = await Tractor.find()
      .sort({ invoice: -1 })
      .limit(count)
      .select("bname fname mobile model saledate docs");
    if (!Tractors) return new Response("Data Not Found", { status: 404 });
    return new Response(JSON.stringify(Tractors), { status: 200 });
  } catch (e) {
    return new Response("Something Went Wrong " + e, { status: 500 });
  }
}
