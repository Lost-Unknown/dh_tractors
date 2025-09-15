"use client"
import React, { useState } from 'react'
import Link from 'next/link';

const Report = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rows, setRows] = useState([]);

  const getreport = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      const Range = `${startDate}=${endDate}`;
      const response = await fetch(`/api/tractors/${Range}`);
      if (response.ok) {
        const tractors = await response.json()
        console.log("Success")
        setRows(tractors); // Assuming response is like { success: true, data: [...] }
      } else {
        alert("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error fetching report.");
    }
  };

  return (
    <div className='flex flex-col h-dvh'>
      <div className='h-12 content-center flex w-full gap-3 px-3 py-2 bg-white'>
        <label className='my-auto text-gray-900'>From</label>
        <input
          className='border-gray-900 text-gray-900 border-2 rounded-md px-1 py-1'
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label className='my-auto text-gray-900'>-</label>
        <label className='my-auto text-gray-900'>To</label>
        <input
          className='border-gray-900 text-gray-900 border-2 rounded-md px-1 py-1'
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded transition duration-150 ease-in-out"
          onClick={getreport}
        >
          Search
        </button>
      </div>

      <div className='bg-blue-50 h-full'>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Father's Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile No.
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sale Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rows.map((row) => (
                <tr key={row._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.bname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {row.fname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {row.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {row.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {new Date(row.saledate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {row.docs ?<>
                    <Link className="text-blue-600 hover:text-blue-900 mx-2" href={`https://${row.docs}`}>
                      Documents
                    </Link>
                    </>:<></>}
                    <Link className="text-blue-600 hover:text-blue-900 mx-2" href={`/BuyerDetails/Edit?id=${row._id}`}>
                      Edit
                    </Link>
                    <Link className="text-blue-600 hover:text-blue-900" href={`/BuyerDetails/?id=${row._id}`}>
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;