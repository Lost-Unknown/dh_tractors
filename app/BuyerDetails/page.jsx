"use client";
import { React, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BuyerDetails = () => {
  const searchParams = useSearchParams();
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
      if (data.oldtractorpurchaseamount != undefined)
        totalReceivedAmount += data.oldtractorpurchaseamount;
      totalReceivedAmount += data.loanamount;
      data.pendingamount = data.saleamount - totalReceivedAmount;
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
        <Link
          className="text-white hover:bg-blue-800 bg-blue-600 px-4 py-1 rounded "
          href={`/Sale_Invoice/?id=${detailid}`}
        >
          Invoice
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
    </div>
  );
};

export default BuyerDetails;
