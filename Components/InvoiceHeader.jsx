"use client";
import React from "react";

const InvoiceHeader = () => {
  return (
    <div className="w-full">
      <div className="w-full flex relative">
        <img
          className=" absolute mt-4"
          src="/SwarajLogo.png"
          width={160}
          height={40}
          alt="Logo"
        />
        <div className=" w-full mt-6 flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl">DH TRACTORS</h1>
          <h1>
            (Authorised Dealer for Swaraj Tractor Sales, Service and Spares)
          </h1>
        </div>
      </div>
      <div className="w-full flex justify-between items-end">
        <h2 className="font-bold text-sm">GSTIN - 07IFFPS4147A1ZG</h2>
        <div className="flex flex-col justify-end items-end">
          <h2 className=" text-xs">BABA HARIDASS GEETANJALI ENCLAVE,</h2>
          <h2 className=" text-xs">JHARODA KALAN - 110072</h2>
          <h2 className=" text-xs">Mobile No.- 9310548217</h2>
        </div>
      </div>
      <hr className="my-2" />
    </div>
  );
};

export default InvoiceHeader;
