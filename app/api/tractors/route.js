import { connectToDB } from "@/utils/database";
import Tractor from "@/models/tractor";

export async function POST(request) {
  try {
    connectToDB()
    const body = await request.json();

    const newTractor = new Tractor({
      bname: body.bname,
      fname: body.fname,
      saledate: body.saledate,
      model: body.model,
      chassis: body.chassis,
      engine: body.engine,
      mobile: body.mobile,
      invoice : body.invoice,
      address: body.address,
      docs: body.docs,
      GSTIN: body.GSTIN,
      GST_rate:body.GST_Rate,
      isIGST:body.isIGST,
      bighsn:body.bighsn,
      saleamount: body.saleamount,
      cashamount: body.cashamount, // array of { amount, receivedate }
      onlineamount: body.onlineamount,
      chequeamount: body.chequeamount, // array of { amount, transid, receivedate }
      loanamount: body.loanamount,
      loantranid: body.loantranid,
      loanprovider: body.loanprovider,
      pendingamount: body.pendingamount,
      oldtractorname: body.oldtractorname,
      oldtractorsaleamount: body.oldtractorsaleamount,
      oldSaleMediator: body.oldSaleMediator,
      regno: body.regno,
      insureno: body.insureno,
      regamount: body.regamount,
      insureamount: body.insureamount,
    });

    await newTractor.save();

    return new Response(JSON.stringify({ message: "Tractor added successfully!" }), {
      status: 201,
    });
  }
  catch (e) {
    console.error(e)
    return new Response("Something Went Wrong!" + e, { status: 500 })
  }
}

export async function PATCH(request) {
  try {
    connectToDB()
    const body = await request.json();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const id = body._id;
    const processArray = (arr) => {
      if (!arr || !Array.isArray(arr)) return arr;
      return arr.map(item => {
        const newItem = {...item};
        delete newItem._id;
        return newItem;
      });
    };
    
    const newTractor = {
      docs: body.docs,
      saleamount: body.saleamount,
      cashamount: processArray(body.cashamount),
      onlineamount: processArray(body.onlineamount),
      chequeamount: processArray(body.chequeamount),
      loanamount: body.loanamount === null? 0 :body.loanamount,
      loantranid: body.loantranid,
      loanprovider: body.loanprovider,
      pendingamount: body.pendingamount === null ? 0 :body.pendingamount,
      regno: body.regno,
      insureno: body.insureno,
      regamount: body.regamount === null ? 0 :body.regamount,
      insureamount: body.insureamount === null ? 0 :body.insureamount,
    };
    const updatedTractor = await Tractor.findByIdAndUpdate(
      id,
      newTractor,
      { new: true, runValidators: true }
    );

    
    if (!updatedTractor) {
      return new Response(JSON.stringify({ message: "Update failed" }), { 
        status: 500 
      });
    }
    
    return new Response(JSON.stringify({ 
      message: "Tractor updated successfully!",
      tractor: updatedTractor
    }), { status: 200 });
  }
  catch (e) {
    console.error(e)
    return new Response("Something Went Wrong!", { status: 500 })
  }

}