import React from 'react'
import { useState ,useEffect } from 'react'

const TractorTable = ({ data}) => {
    const [tabelData,setTableData] = useState({
        chassis: '',
        model:'',
        engine:'',
        bighsn:true,
        igst:false,
        GST:5,
        gst_amount:0,
        taxablevalue:0,
        price:0
    })

    useEffect(() => {
  const getDetails = () => {
    if (!data) return;
    const tempGST = data.GST_rate;
    const temptaxablevalue = Number(data.saleamount) / (100 + Number(tempGST)) * 100;
    const tempgstamount = Number(data.saleamount) - temptaxablevalue;
    setTableData({
      chassis : data.chassis,
      model: data.model,
      engine: data.engine,
      bighsn: data.bighsn,
      igst: data.isIGST,
      gst_rate: tempGST,
      gst_amount: tempgstamount.toFixed(2),
      taxablevalue: temptaxablevalue.toFixed(2),
      price: data.saleamount,
    });
  };

  if (data) getDetails();
}, [data]);

    return (
        <table className="w-full border border-gray-400 text-xs text-center">
            <thead>
                <tr className="">
                    <th className="border border-gray-400 ">Desc. of Goods</th>
                    <th className="border border-gray-400 ">HSN <br/> Code</th>
                    <th className="border border-gray-400 ">Rate</th>
                    <th className="border border-gray-400 ">Taxable<br/> Value</th>
                    {tabelData.igst ? <>
                        <th colSpan={2} className="border border-gray-400 ">IGST</th>
                    </> :<>
                        <th colSpan={2} className="border border-gray-400 ">CGST</th>
                        <th colSpan={2} className="border border-gray-400 ">SGST</th>
                    </> }
                    <th className="border border-gray-400 ">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-400 w-min "></td>
                    <td className="border border-gray-400 w-min "></td>
                    <td className="border border-gray-400 w-min "></td>
                    <td className="border border-gray-400 w-min "></td>
                    {tabelData.igst ? <>
                    <td className="border border-gray-400 w-min ">Rate</td>
                    <td className="border border-gray-400 w-min ">Amt.</td>
                    </> :<>
                    <td className="border border-gray-400 w-min ">Rate</td>
                    <td className="border border-gray-400 w-min ">Amt.</td>
                    <td className="border border-gray-400 w-min ">Rate</td>
                    <td className="border border-gray-400 w-min ">Amt.</td>
                    </> }
                    <td className="border border-gray-400 w-min "></td>
                </tr>
                <tr key={`spare`}>
                    <td className="border border-gray-400 pl-2  text-left">
                        Model Code :{tabelData.model}
                        <br />
                        Chassis No. :{tabelData.chassis}
                        <br />
                        Engine No. :{tabelData.engine}
                    </td>
                    <td className="border border-gray-400 ">{tabelData.bighsn ? 87019200: 87019100}</td>
                    <td className="border border-gray-400 ">{tabelData.taxablevalue}</td>
                    <td className="border border-gray-400 ">{tabelData.taxablevalue}</td>
                    {tabelData.igst ? <>
                    <td className="border border-gray-400 ">{tabelData.gst_rate}%</td>
                    <td className="border border-gray-400 ">{(tabelData.gst_amount).toString()}</td>
                    </> :<>
                    <td className="border border-gray-400 ">{tabelData.gst_rate/2}%</td>
                    <td className="border border-gray-400 ">{(tabelData.gst_amount/2).toString()}</td>
                    <td className="border border-gray-400 ">{tabelData.gst_rate/2}%</td>
                    <td className="border border-gray-400 ">{(tabelData.gst_amount/2).toString()}</td>
                    </> }
                    <td className="border border-gray-400 ">{tabelData.price}</td>
                </tr>
                {/* Total Row */}
                <tr className="font-semibold">
                    <td colSpan={2} className="border border-gray-400  text-right pr-1">
                        Total
                    </td>
                    <td></td>
                    <td className="border border-gray-400 ">{tabelData.taxablevalue}</td>
                    {tabelData.igst ? <>
                    <td colSpan={2} className="border border-gray-400 ">{(tabelData.gst_amount).toString()}</td>
                    </> :<>
                    <td colSpan={2} className="border border-gray-400 ">{(tabelData.gst_amount/2).toString()}</td>
                    <td colSpan={2} className="border border-gray-400 ">{(tabelData.gst_amount/2).toString()}</td>
                    </> }
                    <td className="border border-gray-400 ">{tabelData.price}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TractorTable