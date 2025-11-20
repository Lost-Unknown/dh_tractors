import { connectToDB } from "@/utils/database";
import StockTransfer from "@/models/stocktransfer";

export async function POST(request) {
  try {
    connectToDB();
    const body = await request.json();

    const newTransfer = new StockTransfer({
      bname: body.bname,
      saledate: body.saledate,
      model: body.model,
      chassis: body.chassis,
      engine: body.engine,
      mobile: body.mobile,
      invoice: body.invoice,
      address: body.address,
      docs: body.docs,
      GSTIN: body.GSTIN,
      GST_rate: body.GST_Rate,
      isIGST: body.isIGST,
      bighsn: body.bighsn,
      saleamount: body.saleamount,
    });

    await newTransfer.save();

    return new Response(
      JSON.stringify({ message: "Transfer added successfully!" }),
      {
        status: 201,
      },
    );
  } catch (e) {
    console.error(e);
    return new Response("Something Went Wrong!" + e, { status: 500 });
  }
}
export async function GET(request) {
  try {
    await connectToDB();
    const lastRecord = await StockTransfer.findOne()
      .sort({ invoice: -1 })
      .select("saledate invoice");
    if (lastRecord == null) {
      return new Response("No Data Found", { status: 404 });
    }

    return new Response(JSON.stringify(lastRecord), { status: 200 });
  } catch (e) {
    return new Response("Something Went Wrong!" + e, { status: 500 });
  }
}
