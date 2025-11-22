"use client";
import React, { useState, useEffect } from "react";
const TractorForm = () => {
  // Initialize form state with empty values
  const [formData, setFormData] = useState({
    bname: "",
    fname: "",
    model: "",
    chassis: "",
    engine: "",
    mobile: 0,
    address: "",
    docs: "",
    GSTIN: "",
    invoice: 0,
    saledate: new Date(),
    isIGST: false,
    GST_Rate: 5,
    bighsn: true,
    saleamount: 0,
    quotemount: 0,
    cashamount: [{ amount: 0, receivedate: new Date() }],
    onlineamount: [{ amount: 0, transid: "", receivedate: new Date() }],
    chequeamount: [{ amount: 0, chequeid: "", receivedate: new Date() }],
    loanamount: 0,
    loantranid: "",
    loanprovider: "",
    oldtractorname: "",
    oldtractorsaleamount: 0,
    oldtractorpurchaseamount: 0,
    oldSaleMediator: "",
    regno: "",
    insureno: "",
    regamount: 0,
    insureamount: 0,
  });

  const [lastData, setLastData] = useState({
    lastInvoice: 0,
    lastSaleDate: "",
  });

  // Form validation state
  const [errors, setErrors] = useState({});

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // Handle number input changes
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === "" ? null : Number(value) });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // Handle boolean input changes
  const handleBooleanChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  // Handle cash amount array updates
  const handleCashAmountChange = (index, field, value) => {
    const updatedCashAmounts = [...formData.cashamount];
    if (field === "amount") {
      updatedCashAmounts[index].amount = Number(value);
    } else if (field === "receivedate") {
      updatedCashAmounts[index].receivedate = new Date(value);
    }
    setFormData({ ...formData, cashamount: updatedCashAmounts });
  };

  // Add new cash amount entry
  const addCashAmount = () => {
    setFormData({
      ...formData,
      cashamount: [
        ...formData.cashamount,
        { amount: 0, receivedate: new Date() },
      ],
    });
  };

  // Remove cash amount entry
  const removeCashAmount = (index) => {
    const updatedCashAmounts = [...formData.cashamount];
    updatedCashAmounts.splice(index, 1);
    setFormData({ ...formData, cashamount: updatedCashAmounts });
  };

  // Handle online amount array updates
  const handleOnlineAmountChange = (index, field, value) => {
    const updatedOnlineAmounts = [...formData.onlineamount];
    if (field === "amount") {
      updatedOnlineAmounts[index].amount = Number(value);
    } else if (field === "transid") {
      updatedOnlineAmounts[index].transid = value;
    } else if (field === "receivedate") {
      updatedOnlineAmounts[index].receivedate = new Date(value);
    }
    setFormData({ ...formData, onlineamount: updatedOnlineAmounts });
  };

  // Add new online amount entry
  const addOnlineAmount = () => {
    setFormData({
      ...formData,
      onlineamount: [
        ...formData.onlineamount,
        { amount: 0, transid: "", receivedate: new Date() },
      ],
    });
  };

  // Remove online amount entry
  const removeOnlineAmount = (index) => {
    const updatedOnlineAmounts = [...formData.onlineamount];
    updatedOnlineAmounts.splice(index, 1);
    setFormData({ ...formData, onlineamount: updatedOnlineAmounts });
  };

  // Handle cheque amount array updates
  const handleChequeAmountChange = (index, field, value) => {
    const updatedChequeAmounts = [...formData.chequeamount];
    if (field === "amount") {
      updatedChequeAmounts[index].amount = Number(value);
    } else if (field === "chequeid") {
      updatedChequeAmounts[index].chequeid = value;
    } else if (field === "receivedate") {
      updatedChequeAmounts[index].receivedate = new Date(value);
    }
    setFormData({ ...formData, chequeamount: updatedChequeAmounts });
  };

  // Add new cheque amount entry
  const addChequeAmount = () => {
    setFormData({
      ...formData,
      chequeamount: [
        ...formData.chequeamount,
        { amount: 0, chequeid: "", receivedate: new Date() },
      ],
    });
  };

  // Remove cheque amount entry
  const removeChequeAmount = (index) => {
    const updatedChequeAmounts = [...formData.chequeamount];
    updatedChequeAmounts.splice(index, 1);
    setFormData({ ...formData, chequeamount: updatedChequeAmounts });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Required string fields
    if (!formData.bname) newErrors.bname = "Buyer name is required";
    if (!formData.fname) newErrors.fname = "Father's name is required";
    if (!formData.model) newErrors.model = "Model is required";
    if (!formData.chassis) newErrors.chassis = "Chassis number is required";
    if (!formData.engine) newErrors.engine = "Engine number is required";
    if (!formData.address) newErrors.address = "Address is required";

    // Required number fields
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.saleamount) newErrors.saleamount = "Sale amount is required";

    // Validate mobile number format
    if (
      formData.mobile &&
      (String(formData.mobile).length < 10 ||
        String(formData.mobile).length > 12)
    ) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
    try {
      // Replace with your API endpoint
      const response = await fetch("/api/tractors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData));

      if (response.ok) {
        alert("Tractor data saved successfully!"); // Redirect to tractors list page
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to save tractor data"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the data. Please try again.");
    }
  };

  // Format date for input field
  const formatDateForInput = (date) => {
    return date instanceof Date
      ? date.toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];
  };

  useEffect(() => {
    const getLastRecord = async () => {
      const response = await fetch(`/api/details`);
      if (response.ok) {
        const data = await response.json();
        setLastData({
          lastSaleDate: new Date(data.saledate).toLocaleDateString(),
          lastInvoice: data.invoice || 0,
        });
      }
    };
    getLastRecord();
  }, []);
  useEffect(() => {
    setFormData({ ...formData, invoice: lastData.lastInvoice + 1 });
  }, [lastData]);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">New Tractor Entry</h1>
      <p className=" mb-6">
        Last Invoice Date : {lastData.lastSaleDate},Last Invoic No. :
        {lastData.lastInvoice}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-3">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Buyer Name*
                </label>
                <input
                  type="text"
                  name="bname"
                  value={formData.bname}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.bname ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.bname && (
                  <p className="text-red-500 text-xs mt-1">{errors.bname}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Father's Name*
                </label>
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.fname ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fname && (
                  <p className="text-red-500 text-xs mt-1">{errors.fname}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model*
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.model ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.model && (
                  <p className="text-red-500 text-xs mt-1">{errors.model}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chassis Number*
                </label>
                <input
                  type="text"
                  name="chassis"
                  value={formData.chassis}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.chassis ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.chassis && (
                  <p className="text-red-500 text-xs mt-1">{errors.chassis}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Engine Number*
                </label>
                <input
                  type="text"
                  name="engine"
                  value={formData.engine}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.engine ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.engine && (
                  <p className="text-red-500 text-xs mt-1">{errors.engine}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number*
                </label>
                <input
                  type="number"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleNumberChange}
                  className={`w-full px-3 py-2 border rounded-md ${errors.mobile ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GSTIN
                </label>
                <input
                  type="text"
                  name="GSTIN"
                  value={formData.GSTIN.GSTIN}
                  onChange={handleInputChange}
                  className={
                    "w-full px-3 py-2 border rounded-md border-gray-300"
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Rate
                </label>
                <input
                  type="number"
                  name="GST_Rate"
                  value={formData.GST_Rate || ""}
                  onChange={handleNumberChange}
                  className={`w-full px-3 py-2 border rounded-md border-gray-300`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="saledate"
                  value={formData.saledate}
                  onChange={handleInputChange}
                  className={
                    "w-full px-3 py-2 border rounded-md border-gray-300"
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice No.
                </label>
                <input
                  type="number"
                  name="invoice"
                  value={formData.invoice || ""}
                  onChange={handleNumberChange}
                  className={`w-full px-3 py-2 border rounded-md border-gray-300`}
                />
              </div>
              <div className="flex">
                <label className="text-sm flex grow font-medium  text-gray-700 mb-1">
                  Big HSN
                </label>
                <input
                  type="checkbox"
                  name="bighsn"
                  checked={formData.bighsn}
                  onChange={handleBooleanChange}
                  className={`px-3 py-2 border rounded-md `}
                />
              </div>
              <div className="flex">
                <label className="text-sm flex grow font-medium text-gray-700 mb-1">
                  Is IGST
                </label>
                <input
                  type="checkbox"
                  name="isIGST"
                  checked={formData.isIGST}
                  onChange={handleBooleanChange}
                  className={`px-3 py-2 border rounded-md `}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Docs*
              </label>
              <input
                name="docs"
                value={formData.docs}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.docs ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.docs && (
                <p className="text-red-500 text-xs mt-1">{errors.docs}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address*
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md ${errors.address ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Sale Information */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-3">Sale Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sale Amount*
              </label>
              <input
                type="number"
                name="saleamount"
                value={formData.saleamount || ""}
                onChange={handleNumberChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.saleamount ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.saleamount && (
                <p className="text-red-500 text-xs mt-1">{errors.saleamount}</p>
              )}
            </div>
          </div>

          {/* Quote Information */}
          <div className="col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quote Amount*
              </label>
              <input
                type="number"
                name="quoteamount"
                value={formData.quotemount || ""}
                onChange={handleNumberChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.quotemount ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.quotemount && (
                <p className="text-red-500 text-xs mt-1">{errors.quotemount}</p>
              )}
            </div>
          </div>

          {/* Cash Amounts */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-3">Cash Payments</h2>
            {formData.cashamount.map((cash, index) => (
              <div key={`cash-${index}`} className="flex items-end gap-4 mb-4">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={cash.amount || ""}
                    onChange={(e) =>
                      handleCashAmountChange(index, "amount", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Receive Date
                  </label>
                  <input
                    type="date"
                    value={formatDateForInput(cash.receivedate)}
                    onChange={(e) =>
                      handleCashAmountChange(
                        index,
                        "receivedate",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeCashAmount(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCashAmount}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Cash Payment
            </button>
          </div>

          {/* Online Amounts */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-3">Online Payments</h2>
            {formData.onlineamount.map((online, index) => (
              <div
                key={`online-${index}`}
                className="grid grid-cols-3 gap-4 mb-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={online.amount || ""}
                    onChange={(e) =>
                      handleOnlineAmountChange(index, "amount", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={online.transid}
                    onChange={(e) =>
                      handleOnlineAmountChange(index, "transid", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Receive Date
                    </label>
                    <input
                      type="date"
                      value={formatDateForInput(online.receivedate)}
                      onChange={(e) =>
                        handleOnlineAmountChange(
                          index,
                          "receivedate",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeOnlineAmount(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addOnlineAmount}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Online Payment
            </button>
          </div>

          {/* Cheque Amounts */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-3">Cheque Payments</h2>
            {formData.chequeamount.map((cheque, index) => (
              <div
                key={`cheque-${index}`}
                className="grid grid-cols-3 gap-4 mb-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={cheque.amount || ""}
                    onChange={(e) =>
                      handleChequeAmountChange(index, "amount", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cheque ID
                  </label>
                  <input
                    type="text"
                    value={cheque.chequeid}
                    onChange={(e) =>
                      handleChequeAmountChange(
                        index,
                        "chequeid",
                        e.target.value,
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Receive Date
                    </label>
                    <input
                      type="date"
                      value={formatDateForInput(cheque.receivedate)}
                      onChange={(e) =>
                        handleChequeAmountChange(
                          index,
                          "receivedate",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeChequeAmount(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addChequeAmount}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Cheque Payment
            </button>
          </div>

          {/* Loan Information */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-3">Loan Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount
                </label>
                <input
                  type="number"
                  name="loanamount"
                  value={formData.loanamount || ""}
                  onChange={handleNumberChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Transaction ID
                </label>
                <input
                  type="text"
                  name="loantranid"
                  value={formData.loantranid}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Provider
                </label>
                <input
                  type="text"
                  name="loanprovider"
                  value={formData.loanprovider}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Old Tractor Information */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-3">
              Old Tractor Exchange Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Old Tractor Name
                </label>
                <input
                  type="text"
                  name="oldtractorname"
                  value={formData.oldtractorname}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Old Tractor Purchase Amount
                </label>
                <input
                  type="number"
                  name="oldtractorpurchaseamount"
                  value={formData.oldtractorpurchaseamount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Old Tractor Sale Amount
                </label>
                <input
                  type="number"
                  name="oldtractorsaleamount"
                  value={formData.oldtractorsaleamount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Old Sale Mediator
                </label>
                <input
                  type="text"
                  name="oldSaleMediator"
                  value={formData.oldSaleMediator}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Registration and Insurance */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-3">
              Registration and Insurance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="regno"
                  value={formData.regno}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance Number
                </label>
                <input
                  type="text"
                  name="insureno"
                  value={formData.insureno}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registration Amount
                </label>
                <input
                  type="number"
                  name="regamount"
                  value={formData.regamount || ""}
                  onChange={handleNumberChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Insurance Amount
                </label>
                <input
                  type="number"
                  name="insureamount"
                  value={formData.insureamount || ""}
                  onChange={handleNumberChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Save Tractor
          </button>
        </div>
      </form>
    </div>
  );
};

export default TractorForm;
