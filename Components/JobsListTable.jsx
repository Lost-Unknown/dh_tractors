import React from 'react'
import { useState ,useEffect } from 'react'

const JobsListTable = ({ data  }) => {
    const [tabelData,setTableData] = useState({
        rowData:[{
            name:'',
            rate:0,
            taxableValue:0,
            gstRate:0,
            cgst:0,
            sgst:0,
            igst:0,
            finalTotal:0
        }],
        totalTaxableValue:0,
        totalCGST:0,
        totalSGST:0,
        totalIGST:0,
        totalValue:0
    })

    useEffect(() => {
  const getDetails = () => {
    if (!data) return;

    let totalTaxableValue = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;
    let totalValue = 0;

    const rowData = data.map((item, index) => {
    const name = item.type;
      const gstRate = 18;
      // Taxable value
      const taxableValue = (item.cost *100)/118 ;

      // GST splits
      const cgstRate = gstRate / 2;
      const sgstRate = gstRate / 2;
      const igstRate = 0; // assuming intra-state for now

      const cgstAmt = (taxableValue * cgstRate) / 100;
      const sgstAmt = (taxableValue * sgstRate) / 100;
      const igstAmt = (taxableValue * igstRate) / 100;

      const finalTotal = taxableValue + cgstAmt + sgstAmt + igstAmt;

      // Accumulate totals
      totalTaxableValue += taxableValue;
      totalCGST += cgstAmt;
      totalSGST += sgstAmt;
      totalIGST += igstAmt;
      totalValue += finalTotal;

      return {
        name: name || "",
        taxableValue: taxableValue.toFixed(2),
        gstRate,
        cgst: cgstAmt.toFixed(2),
        sgst: sgstAmt.toFixed(2),
        igst: igstAmt.toFixed(2),
        finalTotal: finalTotal.toFixed(2),
      };
    });

    setTableData({
      rowData,
      totalTaxableValue: totalTaxableValue.toFixed(2),
      totalCGST: totalCGST.toFixed(2),
      totalSGST: totalSGST.toFixed(2),
      totalIGST: totalIGST.toFixed(2),
      totalValue: totalValue.toFixed(2),
    });
  };

  if (data) getDetails();
}, [data]);

    return (
        <table className="w-full border border-gray-400 text-xs text-center">
            <thead>
                <tr className="">
                    <th className="border border-gray-400 w-min ">S. No.</th>
                    <th className="border border-gray-400 ">Desc. of Goods</th>
                    <th className="border border-gray-400 ">Taxable<br/> Value</th>
                    <th colSpan={2} className="border border-gray-400 ">CGST</th>
                    <th colSpan={2} className="border border-gray-400 ">SGST</th>
                    <th className="border border-gray-400 ">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                        <td className="border border-gray-400 w-min "></td>
                        <td className="border border-gray-400 w-min "></td>
                        <td className="border border-gray-400 w-min "></td>
                        <td className="border border-gray-400 w-min ">Rate</td>
                        <td className="border border-gray-400 w-min ">Amt.</td>
                        <td className="border border-gray-400 w-min ">Rate</td>
                        <td  className="border border-gray-400 w-min ">Amt.</td>
                        <td className="border border-gray-400 w-min "></td>
                    </tr>
                {tabelData.rowData.map((spare, index) => (
                    <tr key={`spare-${index}`}>
                        <td className="border border-gray-400 w-min ">{index + 1}</td>
                        <td className="border border-gray-400  text-left">
                            {spare.name}
                        </td>
                        <td className="border border-gray-400 ">{spare.taxableValue}</td>
                        <td className="border border-gray-400 ">{spare.gstRate/2}</td>
                        <td className="border border-gray-400 ">{spare.cgst}</td>
                        <td className="border border-gray-400 ">{spare.gstRate/2}</td>
                        <td className="border border-gray-400 ">{spare.sgst}</td>
                        <td className="border border-gray-400 ">{spare.finalTotal}</td>
                    </tr>
                ))}
                {/* Parts Total Row */}
                <tr className="font-semibold">
                    <td colSpan={2} className="border border-gray-400  text-right pr-1">
                        Labour Total
                    </td>
                    <td className="border border-gray-400 ">{tabelData.totalTaxableValue}</td>
                    <td colSpan={2} className="border border-gray-400 ">{tabelData.totalCGST}</td>
                    <td colSpan={2} className="border border-gray-400 ">{tabelData.totalSGST}</td>
                    <td className="border border-gray-400 ">{tabelData.totalValue}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default JobsListTable