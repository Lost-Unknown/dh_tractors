import React from 'react'
import { useState ,useEffect } from 'react'

const PartsListTable = ({ data ,spares }) => {
    const [tabelData,setTableData] = useState({
        rowData:[{
            name:'',
            hsn:'',
            quantity:0,
            rate:0,
            taxableValue:0,
            gstRate:0,
            cgst:0,
            sgst:0,
            igst:0,
            finalTotal:0
        }],
        totalQantity:0,
        totalTaxableValue:0,
        totalCGST:0,
        totalSGST:0,
        totalIGST:0,
        totalValue:0
    })

    useEffect(() => {
  const getDetails = () => {
    if (!data || !spares) return;

    let totalQuantity = 0;
    let totalTaxableValue = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;
    let totalValue = 0;

    const rowData = data.map((item, index) => {
        const name = spares[index].name;
        const hsn = spares[index].hsn;
      const gstRate = Number(spares[index]?.gst || 0);
      const quantity = Number(item.quantity) || 0;
      const final = Number(item.final) || 0;

      // Rate without GST
      const rate = (final / (100 + gstRate)) * 100;

      // Taxable value
      const taxableValue = rate * quantity;

      // GST splits
      const cgstRate = gstRate / 2;
      const sgstRate = gstRate / 2;
      const igstRate = 0; // assuming intra-state for now

      const cgstAmt = (taxableValue * cgstRate) / 100;
      const sgstAmt = (taxableValue * sgstRate) / 100;
      const igstAmt = (taxableValue * igstRate) / 100;

      const finalTotal = taxableValue + cgstAmt + sgstAmt + igstAmt;

      // Accumulate totals
      totalQuantity += quantity;
      totalTaxableValue += taxableValue;
      totalCGST += cgstAmt;
      totalSGST += sgstAmt;
      totalIGST += igstAmt;
      totalValue += finalTotal;

      return {
        name: name || "",
        hsn: hsn || "",
        quantity,
        rate: rate.toFixed(2),
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
      totalQantity: totalQuantity,
      totalTaxableValue: totalTaxableValue.toFixed(2),
      totalCGST: totalCGST.toFixed(2),
      totalSGST: totalSGST.toFixed(2),
      totalIGST: totalIGST.toFixed(2),
      totalValue: totalValue.toFixed(2),
    });
  };

  if (data) getDetails();
}, [data, spares]);

    return (
        <table className="w-full border border-gray-400 text-xs text-center">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-400 w-min ">S. No.</th>
                    <th className="border border-gray-400 ">Desc. of Goods</th>
                    <th className="border border-gray-400 ">HSN <br/> Code</th>
                    <th className="border border-gray-400 ">Qty</th>
                    <th className="border border-gray-400 ">Rate</th>
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
                        <td className="border border-gray-400 ">{spare.hsn}</td>
                        <td className="border border-gray-400 ">{spare.quantity}</td>
                        <td className="border border-gray-400 ">{spare.rate}</td>
                        <td className="border border-gray-400 ">{spare.taxableValue}</td>
                        <td className="border border-gray-400 ">{spare.gstRate/2}</td>
                        <td className="border border-gray-400 ">{spare.cgst}</td>
                        <td className="border border-gray-400 ">{spare.gstRate/2}</td>
                        <td className="border border-gray-400 ">{spare.sgst}</td>
                        <td className="border border-gray-400 ">{spare.finalTotal}</td>
                    </tr>
                ))}
                {/* Parts Total Row */}
                <tr className="font-semibold bg-gray-50">
                    <td colSpan={3} className="border border-gray-400  text-right pr-1">
                        Parts Total
                    </td>
                    <td className="border border-gray-400 ">{tabelData.totalQantity}</td>
                    <td></td>
                    <td className="border border-gray-400 ">{tabelData.totalTaxableValue}</td>
                    <td colSpan={2} className="border border-gray-400 ">{tabelData.totalCGST}</td>
                    <td colSpan={2} className="border border-gray-400 ">{tabelData.totalSGST}</td>
                    <td className="border border-gray-400 ">{tabelData.totalValue}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default PartsListTable