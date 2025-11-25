"use client";
import { React, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { numberToWords } from "amount-to-words";
import { useRef } from "react";
import InvoiceHeader from "@/Components/InvoiceHeader";
import TractorTable from "@/Components/TractorTable";
import Link from "next/link";

const BuyerDetails = () => {
  const searchParams = useSearchParams();
  const contentRef = useRef(null);
  const contentRefQuote = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef: contentRef });
  const reactToPrintFnQuote = useReactToPrint({ contentRef: contentRefQuote });
  const detailid = searchParams.get("id");
  const [post, setPost] = useState({
    bname: "",
    fname: "",
    saledate: "",
    mobile: "",
    address: "",
    docs: "",
    model: "",
    chassis: "",
    engine: "",
    GSTIN: "",
    isImplement: "",
    saleamount: "",
    cashamount: [],
    chequeamount: [],
    onlineamount: [],
    loanamount: "",
    loantranid: "",
    loanprovider: "",
    pendingamount: "",
    oldtractorname: "",
    oldtractorsaleamount: "",
    oldtractorpurchaseamount: "",
    oldSaleMediator: "",
    regno: "",
    insureno: "",
    regamount: "",
    insureamount: "",
  });

  const isNonZero = (value) => {
    if (value === null || value === undefined) return false;

    const num = parseFloat(value);
    return !isNaN(num) && num >= 1;
  };

  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(`/api/details/${detailid}`);
      const data = await response.json();

      let totalReceivedAmount = 0;
      data.cashamount.forEach((element) => {
        totalReceivedAmount += element.amount;
      });
      data.chequeamount.forEach((element) => {
        totalReceivedAmount += element.amount;
      });
      data.onlineamount.forEach((element) => {
        totalReceivedAmount += element.amount;
      });
      if (data.quoteamount == undefined) data.quoteamount = 0;
      if (data.oldtractorpurchaseamount != undefined)
        totalReceivedAmount += data.oldtractorpurchaseamount;
      totalReceivedAmount += data.loanamount;
      data.pendingamount = data.saleamount - totalReceivedAmount;
      console.log(data.isImplement);
      setPost(data);
    };

    if (detailid) getDetails();
  }, [detailid]);
  return (
    <div className="bg-white gap-1 flex w-full h-full p-4 flex-col">
      <div className="flex justify-end gap-2">
        <Link
          className="text-white hover:bg-blue-800 bg-blue-600 px-4 py-1 rounded"
          href={`${post.docs}`}
        >
          Documents
        </Link>
        <Link
          className="text-white hover:bg-blue-800 bg-blue-600 px-4 py-1 rounded"
          href={`/BuyerDetails/Edit?id=${detailid}`}
        >
          Edit
        </Link>
      </div>
      <h1 className="text-white p-2 w-full bg-gray-900 font-bold text-2xl">
        Buyer Details
      </h1>
      <div className=" flex w-full">
        <p className="text-gray-900 w-1/2">
          <b>Name : </b>
          {post.bname}
        </p>
        <p className="text-gray-900 w-1/2">
          <b>Father's Name : </b>
          {post.fname}
        </p>
      </div>
      <p className="text-gray-900">
        <b>Address : </b>
        {post.address}
      </p>
      <p className="text-gray-900">
        <b>Date : </b>
        {new Date(post.saledate).toLocaleDateString()}
      </p>
      <div className=" flex w-full">
        <p className="text-gray-900 w-1/2">
          <b>Mobile No. : </b>
          {post.mobile}
        </p>
        <p className="text-gray-900 w-1/2">
          <b>Model No. : </b>
          {post.model}
        </p>
      </div>
      <div className=" flex w-full">
        <p className="text-gray-900 w-1/2">
          <b>Chassis No. : </b>
          {post.chassis}
        </p>
        <p className="text-gray-900 w-1/2">
          <b>Engine No. : </b>
          {post.engine}
        </p>
      </div>
      <p className="text-gray-900">
        <b>GSTIN : </b>
        {post.GSTIN}
      </p>
      <h1 className="text-white p-2 w-full bg-gray-900 mt-2 font-bold text-2xl">
        Payment Details
      </h1>
      <p className="text-gray-900">
        <b>Sale Amount : </b>Rs {post.saleamount}
      </p>
      {post.cashamount.length > 0 &&
        post.cashamount[0].amount !== 0 &&
        post.cashamount.map((cash, index) => (
          <div className="flex w-full" key={index}>
            <p className="text-gray-900 w-2/3">
              <b>Cash Amount Received : </b>Rs {cash.amount}
            </p>
            <p className="text-gray-900 w-1/3">
              <b>Receiving Date : </b>
              {new Date(cash.receivedate).toLocaleDateString()}
            </p>
          </div>
        ))}
      {post.chequeamount.length > 0 &&
        post.chequeamount[0].amount !== 0 &&
        post.chequeamount.map((cheque, index) => (
          <div className="flex w-full" key={index}>
            <p className="text-gray-900 w-1/3">
              <b>Cheque Amount Received : </b>Rs {cheque.amount}
            </p>
            <p className="text-gray-900 w-1/3">
              <b>Cheque No. : </b>
              {cheque.chequeid}
            </p>
            <p className="text-gray-900 w-1/3">
              <b>Receiving Date : </b>
              {new Date(cheque.receivedate).toLocaleDateString()}
            </p>
          </div>
        ))}
      {post.onlineamount.length > 0 &&
        post.onlineamount[0].amount !== 0 &&
        post.onlineamount.map((online, index) => (
          <div className="flex w-full" key={index}>
            <p className="text-gray-900 w-1/3">
              <b>Online Amount Received : </b>Rs {online.amount}
            </p>
            <p className="text-gray-900 w-1/3">
              <b>Transaction ID : </b>
              {online.transid}
            </p>
            <p className="text-gray-900 w-1/3">
              <b>Receiving Date : </b>
              {new Date(online.receivedate).toLocaleDateString()}
            </p>
          </div>
        ))}
      {isNonZero(post.loanamount) && (
        <>
          <div className="flex w-full">
            <p className="text-gray-900 w-1/3">
              <b>Loan Amount : </b>Rs {post.loanamount}
            </p>
            <p className="text-gray-900 w-1/3">
              <b>Transaction ID : </b>
              {post.loantranid}
            </p>
          </div>
          <p className="text-gray-900">
            <b>Loan Provider : </b>
            {post.loanprovider}
          </p>
        </>
      )}
      <p className="text-gray-900">
        <b>Pending Amount : </b>Rs {post.pendingamount}
      </p>
      {isNonZero(post.oldtractorsaleamount) && (
        <>
          <h1 className="text-white p-2 w-full bg-gray-900 mt-2 font-bold text-2xl">
            Old Tractors Details
          </h1>
          <p className="text-gray-900">
            <b>Old Tractor : </b>
            {post.oldtractorname}
          </p>
          <p className="text-gray-900">
            <b>Old Tractor Sale Amount : </b>Rs {post.oldtractorsaleamount}
          </p>
          <p className="text-gray-900">
            <b>Old Tractor Purchase Amount : </b>Rs{" "}
            {post.oldtractorpurchaseamount}
          </p>
          <p className="text-gray-900">
            <b>Sale Mediator : </b>
            {post.oldSaleMediator}
          </p>
        </>
      )}
      <h1 className="text-white p-2 w-full bg-gray-900 mt-2 font-bold text-2xl">
        RC and Insurance
      </h1>
      <div className=" flex w-full">
        <p className="text-gray-900 w-1/2">
          <b>Registration No. : </b>
          {post.regno}
        </p>
        <p className="text-gray-900 w-1/2">
          <b>Insurance No. : </b>
          {post.insureno}
        </p>
      </div>
      <div className=" flex w-full">
        <p className="text-gray-900 w-1/2">
          <b>RC Amount : </b>Rs {post.regamount}
        </p>
        <p className="text-gray-900 w-1/2">
          <b>Insurance Amount : </b>Rs {post.insureamount}
        </p>
      </div>
      <div className=" flex w-full mt-4">
        {!isNonZero(post.pendingamount) && (
          <>
            <h1 className="bg-green-300 text-white w-full p-2 text-center text-3xl">
              Finalized
            </h1>
          </>
        )}
        {isNonZero(post.pendingamount) && (
          <>
            <h1 className="bg-red-400 text-white w-full p-2 text-center text-3xl">
              Pending
            </h1>
          </>
        )}
      </div>
      <div className="flex flex-col items-end">
        <button
          className="bg-blue-500 px-4 w-20 py-2 hover:bg-blue-700 text-white rounded-lg mr-6"
          onClick={reactToPrintFn}
        >
          Print
        </button>
        <div ref={contentRef} className="flex flex-col w-full px-8">
          <InvoiceHeader />
          {/*Service Details */}
          <div className="w-full flex flex-col items-center">
            <h1 className="font-extrabold underline">Tax Invoice</h1>
            <div className="w-full flex">
              <div className="flex flex-col w-7/12">
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Customer Name</h1>
                  <h1 className="w-7/12">: {post.bname}</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Son/Wife/Daughter of</h1>
                  <h1 className="w-7/12">: {post.fname}</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Mobile No.</h1>
                  <h1 className="w-7/12">: {post.mobile}</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Address</h1>
                  <p className="w-7/12 h-auto">: {post.address}</p>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Cust. GSTIN</h1>
                  <h1 className="w-7/12">: {post.GSTIN}</h1>
                </div>
              </div>
              <div className="flex flex-col w-5/12">
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Invoice No.</h1>
                  <h1 className="w-7/12">: {post.invoice}</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Invoice Date</h1>
                  <h1 className="w-7/12">
                    : {new Date(post.saledate).toLocaleDateString()}
                  </h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Branch Location</h1>
                  <h1 className="w-7/12">: Jharoda Kalan</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Hypothecation</h1>
                  <h1 className="w-7/12">: {post.loanprovider}</h1>
                </div>
              </div>
            </div>
            <hr className="my-2 w-full" />
          </div>

          {/* Tractor Details */}
          <div className="w-full flex flex-col items-start">
            <h1 className="font-bold py-2">Tractor Details</h1>
            <div className="w-full">
              <TractorTable data={post} isQuote={false} />
            </div>
          </div>

          <hr className="my-4" />

          {/* Grant Total */}
          <div className="flex w-full">
            <div className="flex w-1/2 border-r-1">
              <h1 className=" font-bold underline">Terms and Conditions</h1>
            </div>
            <div className="flex w-1/2 pl-2 flex-col">
              <div className="flex w-full">
                <div className="flex flex-col w-1/2 justify-end">
                  <h2 className=" text-xs font-bold underline">
                    Net Bill Amount
                  </h2>
                </div>
                <div className="flex flex-col w-1/2">
                  <div className="w-full flex justify-between">
                    <h2 className=" text-xs font-bold">Description</h2>
                    <h2 className=" text-xs font-bold">Total</h2>
                  </div>
                  <div className="w-full flex justify-between">
                    <h2 className=" text-xs font-bold">Tractor Details</h2>
                    <h2 className=" text-xs font-bold">{post.saleamount}</h2>
                  </div>
                  <div className="w-full flex justify-end border-t-2 border-b-2">
                    <h2 className=" text-xs font-bold">{post.saleamount}</h2>
                  </div>
                </div>
              </div>
              <h1 className="text-sm">
                In Words:&#40;{numberToWords(post.saleamount)} Rupees Only&#41;
              </h1>
            </div>
          </div>
          <hr className="my-4" />
          <h1>Amount of Tax subject to Reverse Charges</h1>
          <div className="flex justify-between">
            <h1>Customer Signatory</h1>
            <h1>For DH Tractors</h1>
          </div>
          <div className=" mt-16 flex justify-end">
            <h1>Authorised Signatory</h1>
          </div>
          {/* Final Footer */}
        </div>
      </div>

      <hr className="border " />

      {/* Quote Invoice*/}
      <div className="flex flex-col items-end">
        <button
          className="bg-blue-500 px-4 w-20 py-2 hover:bg-blue-700 text-white rounded-lg mr-6"
          onClick={reactToPrintFnQuote}
        >
          Print
        </button>
        <div
          ref={contentRefQuote}
          className="flex quoteinvoice flex-col w-full px-8"
        >
          <InvoiceHeader />
          {/*Service Details */}
          <div className="w-full flex flex-col items-center">
            <h1 className="font-extrabold underline">Tax Invoice</h1>
            <div className="w-full flex">
              <div className="flex flex-col w-7/12">
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Customer Name</h1>
                  <h1 className="w-7/12">: {post.bname}</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Son/Wife/Daughter of</h1>
                  <h1 className="w-7/12">: {post.fname}</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Mobile No.</h1>
                  <h1 className="w-7/12">: {post.mobile}</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Address</h1>
                  <p className="w-7/12 h-auto">: {post.address}</p>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Cust. GSTIN</h1>
                  <h1 className="w-7/12">: {post.GSTIN}</h1>
                </div>
              </div>
              <div className="flex flex-col w-5/12">
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Invoice No.</h1>
                  <h1 className="w-7/12">: {post.invoice}</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Invoice Date</h1>
                  <h1 className="w-7/12">
                    : {new Date(post.saledate).toLocaleDateString()}
                  </h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Branch Location</h1>
                  <h1 className="w-7/12">: Jharoda Kalan</h1>
                </div>
                <div className="flex text-sm w-full">
                  <h1 className="w-5/12 font-bold">Hypothecation</h1>
                  <h1 className="w-7/12">: {post.loanprovider}</h1>
                </div>
              </div>
            </div>
            <hr className="my-2 w-full" />
          </div>

          {/* Tractor Details */}
          <div className="w-full flex flex-col items-start">
            <h1 className="font-bold py-2">Tractor Details</h1>
            <div className="w-full">
              <TractorTable data={post} isQuote={true} />
            </div>
          </div>

          <hr className="my-4" />

          {/* Grant Total */}
          <div className="flex w-full">
            <div className="flex w-1/2 border-r-1">
              <h1 className=" font-bold underline">Terms and Conditions</h1>
            </div>
            <div className="flex w-1/2 pl-2 flex-col">
              <div className="flex w-full">
                <div className="flex flex-col w-1/2 justify-end">
                  <h2 className=" text-xs font-bold underline">
                    Net Bill Amount
                  </h2>
                </div>
                <div className="flex flex-col w-1/2">
                  <div className="w-full flex justify-between">
                    <h2 className=" text-xs font-bold">Description</h2>
                    <h2 className=" text-xs font-bold">Total</h2>
                  </div>
                  <div className="w-full flex justify-between">
                    <h2 className=" text-xs font-bold">Tractor Details</h2>
                    <h2 className=" text-xs font-bold">{post.quoteamount}</h2>
                  </div>
                  <div className="w-full flex justify-end border-t-2 border-b-2">
                    <h2 className=" text-xs font-bold">{post.quoteamount}</h2>
                  </div>
                </div>
              </div>
              <h1 className="text-sm">
                In Words:&#40;{numberToWords(post.quoteamount)} Rupees Only&#41;
              </h1>
            </div>
          </div>
          <hr className="my-4" />
          <h1>Amount of Tax subject to Reverse Charges</h1>
          <div className="flex justify-between">
            <h1>Customer Signatory</h1>
            <h1>For DH Tractors</h1>
          </div>
          <div className=" mt-16 flex justify-end">
            <h1>Authorised Signatory</h1>
          </div>
          {/* Final Footer */}
        </div>
      </div>
    </div>
  );
};

export default BuyerDetails;
