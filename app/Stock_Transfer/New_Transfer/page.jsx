"use client";
import React, { useState, useEffect } from "react";
const TransferForm = () => {
  // Initialize form state with empty values
  const [formData, setFormData] = useState({
    bname: "",
    model: "",
    chassis: "",
    engine: "",
    mobile: 0,
    address: "",
    GSTIN: "",
    invoice: 0,
    saledate: new Date(),
    isIGST: false,
    GST_Rate: 5,
    bighsn: true,
    saleamount: 0,
  });

  const Dealers = [
    {
      bname: "M/s Anshika Enterprises",
      address: "Gwalison Road, Near CSD Canteen, Jhajjar, Haryana",
      mobile: 9992015581,
      GSTIN: "06BFWPP7235J2ZO",
      location: "Jhajjar",
    },
    {
      bname: "M/s Shri Shyam Tractors",
      address: "Near Anaj Mandi, Beri, Haryana 124201",
      mobile: 9671717140,
      GSTIN: "06AEDFS6356N1ZH",
      location: "Beri",
    },
    {
      bname: "M/s BBD Enterprises",
      address:
        "Near Vita Plant, Nangli ParsapurR oad, Bawal, Distt. Rewari, Haryana 123501",
      mobile: 9700097625,
      GSTIN: "06EQQPS3913C1ZO",
      location: "Bawal",
    },
    {
      bname: "M/s M.R. Automobiles",
      address:
        "Near Swastik Hospital, Jhajjar Road, Bahadurgarh, Haryana 124507",
      mobile: 9812313212,
      GSTIN: "06AAZFM7566N1Z3",
      location: "Bahadurgarh",
    },
    {
      bname: "M/S Bala Ji Tractors",
      address: "Gurugram Road, Dadri Toe Jhaija, Haryana, 124103",
      mobile: 8527085007,
      GSTIN: "06ABAFB0229R1ZF",
      location: "Badli",
    },
  ];

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

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Required string fields
    if (!formData.bname) newErrors.bname = "Buyer name is required";
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
      const response = await fetch("/api/stocktransfer", {
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

  const HandleDropDownChange = (event) => {
    setFormData({
      ...formData,
      bname: Dealers[event.target.value].bname,
      mobile: Dealers[event.target.value].mobile,
      address: Dealers[event.target.value].address,
      GSTIN: Dealers[event.target.value].GSTIN,
    });
  };

  useEffect(() => {
    const getLastRecord = async () => {
      const response = await fetch(`/api/stocktransfer`);
      if (response.ok) {
        const data = await response.json();
        setLastData({
          ...lastData,
          lastInvoice: data.invoice,
          lastSaleDate: new Date(data.saledate).toLocaleDateString(),
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
            <label className="text-2xl">Dealer : </label>
            <select
              className="text-2xl border rounded border-gray-300 px-3 py-1 mb-1"
              id="Dealers"
              name="Dealers"
              onChange={(event) => HandleDropDownChange(event)}
            >
              {Dealers.map((item, index) => (
                <option key={index} value={index}>
                  {item.bname + ", " + item.location}
                </option>
              ))}
            </select>
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
                  value={formData.GSTIN}
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

export default TransferForm;
