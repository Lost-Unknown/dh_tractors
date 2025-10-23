"use client"
import React, { useRef } from 'react'
import { useState, useEffect } from 'react';
import InvoiceHeader from '@/Components/InvoiceHeader';
import PartsListTable from '@/Components/PartsListTable';
import JobsListTable from '@/Components/JobsListTable';
import { useSearchParams } from 'next/navigation'
import { useReactToPrint } from "react-to-print";
import { numberToWords } from "amount-to-words";
// http://localhost:3000/Service_Invoice/Invoice?id=68d3bd6772176e65ca24024b

const Service_Invoice = () => {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const invoiceid = useSearchParams().get("id");
    const [post, setPost] = useState({
        ownername: '',
        invoice: '',
        model: '',
        chassis: '',
        engine: '',
        mobile: 0,
        date: new Date(),
        hours: 0,
        spares: [],
        jobs: [],
        actualinvoice: '',
        actualdate: '',
        parttaxable:0,
        parttax:0,
        labourtaxable:0,
        labourtax:0,
        grandtotal:0
    });

    const [spareData, setSpareData] = useState({
        name: '',
        hsn: '',
        gst: '',
    });

    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch(`/api/service_invoice/${invoiceid}`)
            const data = await response.json();

            var templabourtaxable =0 
            var templabourtax =0;
            var tempparttaxable = 0
            var tempparttax = 0
            var partslist = '';

            //Getting Parts Details
            data.spares.forEach(element => {
                partslist = partslist + element.code + '_';
                const quantity = Number(element.quantity) || 0;
                const final = Number(element.final) || 0;
                const rate = (final / (118)) * 100;
                const currenttaxableValue = rate * quantity;
                tempparttaxable = Number(tempparttaxable) + Number(currenttaxableValue.toFixed(2));
                const gstAmt = (currenttaxableValue * 18) / 100
                tempparttax = Number(tempparttax) + Number(gstAmt.toFixed(2));
            });
            const sub = partslist.substring(0, partslist.length - 1);
            
            //Setting Labout Details
            data.jobs.forEach(element => {
                const final = Number(element.cost) || 0;
                const currenttaxableValue = (final / (118)) * 100;
                const gstAmt = (currenttaxableValue * 18) / 100
                templabourtaxable = Number(templabourtaxable) + Number(currenttaxableValue.toFixed(2));
                templabourtax = Number(templabourtax) + Number(gstAmt.toFixed(2));
            });

            //Setting Other Neccessary Details
            const response2 = await fetch(`/api/spare/${sub}`);
            if (response2.ok) {
                const sparedata = await response2.json();
                const cleanedSpares = (sparedata || []).map(spare => ({
                    name: spare.name,
                    hsn: spare.hsn,
                    gst: spare.gst
                }));
                setSpareData(cleanedSpares);
            }
            data.parttaxable = tempparttaxable;
            data.parttax = tempparttax;
            data.labourtaxable = templabourtaxable;
            data.labourtax = templabourtax;
            data.grandtotal = tempparttaxable +tempparttax +templabourtaxable +templabourtax;
            
            const newdate = new Date(data.date)

            //Setting actual date for invoice
            var mm = newdate.getMonth() + 1;
            var dd = newdate.getDate();
            data.actualdate = [(dd > 9 ? '' : '0') + dd,
            (mm > 9 ? '' : '0') + mm,
            newdate.getFullYear()
            ].join('-');

            //Setting Actual Invoice Number 
            data.actualinvoice =  ['JHS',
            newdate.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (data.invoice > 9 ? '' : '0') + data.invoice,
            ].join('');
            setPost(data)

        }
        if (invoiceid) getDetails()
    }, [invoiceid])

    return (
        <div className='flex flex-col items-end' >
            <button className='bg-blue-500 px-4 w-20 py-2 hover:bg-blue-700 text-white rounded-lg mr-6' onClick={reactToPrintFn}>Print</button>
            <div ref={contentRef} className='flex flex-col w-full px-8'>
                <InvoiceHeader />

                {/*Service Details */}
                <div className='w-full flex flex-col items-center'>
                    <h1 className='font-extrabold underline'>Tax Invoice</h1>
                    <div className='w-full flex'>
                        <div className='flex flex-col w-full'>
                            <div className='flex w-full'>
                                <h1 className='w-1/3 font-bold'>Cust. Name</h1>
                                <h1 className='w-2/3'>: {post.ownername}</h1>
                            </div>
                            <div className='flex w-full'>
                                <h1 className='w-1/3 font-bold'>Mobile No.</h1>
                                <h1 className='w-2/3'>: {post.mobile}</h1>
                            </div>
                            <div className='flex w-full'>
                                <h1 className='w-1/3 font-bold'>Chassis No.</h1>
                                <h1 className='w-2/3'>: {post.chassis}</h1>
                            </div>
                            <div className='flex w-full'>
                                <h1 className='w-1/3 font-bold'>Engine No.</h1>
                                <h1 className='w-2/3'>: {post.engine}</h1>
                            </div>
                        </div>
                        <div className='flex flex-col w-full'>
                            <div className='flex w-full'>
                                <h1 className='w-1/3 font-bold'>Invoice No.</h1>
                                <h1 className='w-2/3'>: {post.actualinvoice}</h1>
                            </div>
                            <div className='flex w-full'>
                                <h1 className='w-1/3 font-bold'>Invoice Date</h1>
                                <h1 className='w-2/3'>: {post.actualdate}</h1>
                            </div>
                            <div className='flex w-full'>
                                <h1 className='w-1/3 font-bold'>Model</h1>
                                <h1 className='w-2/3'>: {post.model}</h1>
                            </div>
                            <div className='flex w-full'>
                                <h1 className='w-1/3 font-bold'>Mtr. Reading</h1>
                                <h1 className='w-2/3'>: {post.hours}</h1>
                            </div>
                        </div>
                    </div>
                    <hr className='my-2 w-full' />
                </div>

                {/* SparePart and Labour Details */}
                <div className='w-full flex flex-col items-start'>
                    <h1 className='font-bold py-2'>Part Details</h1>
                    <div className="w-full">

                        {/* parts list */}
                        <PartsListTable data={post.spares} spares={spareData} />
                    </div>
                    <h1 className='font-bold py-2'>Labour Details</h1>
                    <div className="w-full">

                        {/* Jobs List */}
                        <JobsListTable data={post.jobs} />
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
                            <div className='flex flex-col w-1/2 justify-between'>
                                <h2 className=' text-xs font-bold underline'>Sub Total Amount</h2>
                                <h2 className=' text-xs font-bold underline'>Grand Total</h2>
                            </div>
                            <div className='flex flex-col w-1/2'>
                                <div className='w-full flex justify-between'>
                                    <h2 className=' text-xs font-bold'>Description</h2>
                                    <h2 className=' text-xs font-bold'>Total</h2>
                                </div>
                                <div className='w-full flex justify-between'>
                                    <h2 className=' text-xs font-bold'>Part Taxable Amt</h2>
                                    <h2 className=' text-xs font-bold'>{post.parttaxable}</h2>
                                </div>
                                <div className='w-full flex justify-between'>
                                    <h2 className=' text-xs font-bold'>Part 18.00% GST</h2>
                                    <h2 className=' text-xs font-bold'>{post.parttax}</h2>
                                </div>
                                <div className='w-full flex justify-between'>
                                    <h2 className=' text-xs font-bold'>Labour Taxbale Amt</h2>
                                    <h2 className=' text-xs font-bold'>{post.labourtaxable}</h2>
                                </div>
                                <div className='w-full flex justify-between'>
                                    <h2 className=' text-xs font-bold'>Labour 18.00% GST</h2>
                                    <h2 className=' text-xs font-bold'>{post.labourtax}</h2>
                                </div>
                                <div className='w-full flex justify-end border-t-2 border-b-2'>
                                    <h2 className=' text-xs font-bold'>{post.grandtotal}</h2>
                                </div>
                            </div>
                        </div>
                        <h1 className='text-sm'>In Words:&#40;{numberToWords(post.grandtotal)} Rupees Only&#41;</h1>
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

export default Service_Invoice