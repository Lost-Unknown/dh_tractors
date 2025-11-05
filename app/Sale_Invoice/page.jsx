"use client"
import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import InvoiceHeader from '@/Components/InvoiceHeader';
import TractorTable from '@/Components/TractorTable';
import { useSearchParams } from 'next/navigation'
import { useReactToPrint } from "react-to-print";
import { numberToWords } from "amount-to-words";
// http://localhost:3000/Service_Invoice/Invoice?id=68d3bd6772176e65ca24024b

const Sale_Invoice = () => {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const id = useSearchParams().get("id");
    const [post, setPost] = useState({
        bname: '',
        fname:'',
        model: '',
        chassis: '',
        engine: '',
        mobile: 0,
        address:'',
        invoice: '',
        saleamount:0,
        GST:'',
        bighsn:true,
        loanprovider:'',
        date: new Date(),
        actualdate: '',
    });


    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch(`/api/details/${id}`)
            const data = await response.json();

            const newdate = new Date(data.saledate)

            //Setting actual date for invoice
            var mm = newdate.getMonth() + 1;
            var dd = newdate.getDate();
            data.actualdate = [(dd > 9 ? '' : '0') + dd,
            (mm > 9 ? '' : '0') + mm,
            newdate.getFullYear()
            ].join('-');

            setPost(data)
        }
        if (id) getDetails()
    }, [id])

    return (
        <div className='flex flex-col items-end' >
            <button className='bg-blue-500 px-4 w-20 py-2 hover:bg-blue-700 text-white rounded-lg mr-6' onClick={reactToPrintFn}>Print</button>
            <div ref={contentRef} className='flex flex-col w-full px-8'>
                <InvoiceHeader />
                {/*Service Details */}
                <div className='w-full flex flex-col items-center'>
                    <h1 className='font-extrabold underline'>Tax Invoice</h1>
                    <div className='w-full flex'>
                        <div className='flex flex-col w-7/12'>
                            <div className='flex text-sm w-full'>
                                <h1 className='w-5/12 font-bold'>Customer Name</h1>
                                <h1 className='w-7/12'>: {post.bname}</h1>
                            </div>
                            <div className='flex text-sm w-full'>
                                <h1 className='w-5/12 font-bold'>Son/Wife/Daughter of</h1>
                                <h1 className='w-7/12'>: {post.fname}</h1>
                            </div>
                            <div className='flex text-sm w-full'>
                                <h1 className='w-5/12 font-bold'>Mobile No.</h1>
                                <h1 className='w-7/12'>: {post.mobile}</h1>
                            </div>
                            <div className='flex text-sm w-full'>
                                <h1 className='w-5/12 font-bold'>Address</h1>
                                <p className='w-7/12 h-auto'>: {post.address}</p>
                            </div>
                            <div className='flex text-sm w-full'>
                                <h1 className='w-5/12 font-bold'>Cust. GSTIN</h1>
                                <h1 className='w-7/12'>: {post.GST}</h1>
                            </div>
                        </div>
                        <div className='flex flex-col w-5/12'>
                            <div className='flex text-sm w-full'>
                                <h1 className='w-5/12 font-bold'>Invoice No.</h1>
                                <h1 className='w-7/12'>: {post.invoice}</h1>
                            </div>
                            <div className='flex text-sm w-full'>
                                <h1 className='w-5/12 font-bold'>Invoice Date</h1>
                                <h1 className='w-7/12'>: {post.actualdate}</h1>
                            </div>
                            <div className='flex text-sm w-full'>
                                <h1 className='w-5/12 font-bold'>Branch Location</h1>
                                <h1 className='w-7/12'>: Jharoda Kalan</h1>
                            </div>
                            <div className='flex text-sm w-full'>
                                <h1 className='w-5/12 font-bold'>Hypothecation</h1>
                                <h1 className='w-7/12'>: {post.loanprovider}</h1>
                            </div>
                        </div>
                    </div>
                    <hr className='my-2 w-full' />
                </div>

                {/* Tractor Details */}
                <div className='w-full flex flex-col items-start'>
                    <h1 className='font-bold py-2'>Tractor Details</h1>
                    <div className="w-full">
                        <TractorTable data={post} />
                    </div>
                </div>

                <hr className='my-4' />

                {/* Grant Total */}
                <div className='flex w-full'>
                    <div className='flex w-1/2 border-r-1'>
                        <h1 className=' font-bold underline'>Terms and Conditions</h1>
                    </div>
                    <div className='flex w-1/2 pl-2 flex-col'>
                        <div className='flex w-full'>
                            <div className='flex flex-col w-1/2 justify-end'>
                                <h2 className=' text-xs font-bold underline'>Net Bill Amount</h2>
                            </div>
                            <div className='flex flex-col w-1/2'>
                                <div className='w-full flex justify-between'>
                                    <h2 className=' text-xs font-bold'>Description</h2>
                                    <h2 className=' text-xs font-bold'>Total</h2>
                                </div>
                                <div className='w-full flex justify-between'>
                                    <h2 className=' text-xs font-bold'>Tractor Details</h2>
                                    <h2 className=' text-xs font-bold'>{post.saleamount}</h2>
                                </div>
                                <div className='w-full flex justify-end border-t-2 border-b-2'>
                                    <h2 className=' text-xs font-bold'>{post.saleamount}</h2>
                                </div>
                            </div>
                        </div>
                        <h1 className='text-sm'>In Words:&#40;{numberToWords(post.saleamount)} Rupees Only&#41;</h1>
                    </div>
                </div>
                <hr className='my-4' />
                <h1>Amount of Tax subject to Reverse Charges</h1>
                <div className='flex justify-between'>
                    <h1>Customer Signatory</h1>
                    <h1>For DH Tractors</h1>
                </div>
                <div className=' mt-16 flex justify-end'>
                    <h1>Authorised Signatory</h1>
                </div>
                {/* Final Footer */}

            </div>
        </div>
    )
}

export default Sale_Invoice