"use client"
import Link from 'next/link';
import { GlobalConfig } from '../app.config';
import React, { useState } from 'react';
const TractorForm = () => {


  // Initialize form state with empty values
  const [formData, setFormData] = useState({
    ownername: '',
    model: '',
    chassis: '',
    engine: '',
    mobile: 0,
    hours: 0,
    spares: [{ Code: '', hsn: '', name: '', MRP: 0, Final: 0 }],
    jobs: [{ type: '', cost: '' }]
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
    setFormData({ ...formData, [name]: value === '' ? null : Number(value) });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // Handle Spares array updates
  const handleSpareChange = (index, field, value) => {
    const updatedSpares = [...formData.spares];
    if (field === 'Code') {
      updatedSpares[index].Code = value;
    } else if (field === 'Final') {
      updatedSpares[index].Final = Number(value);
    }
    setFormData({ ...formData, spares: updatedSpares });
  };

  // Add new cash amount entry
  const addSpares = () => {
    setFormData({
      ...formData,
      spares: [...formData.spares, { Code: '', hsn: '', name: '', MRP: 0, Final: 0 }]
    });
    console.log(formData)
  };

  const removeSpare = (index) => {
    const updatedSpares = [...formData.spares];
    updatedSpares.splice(index, 1);
    setFormData({ ...formData, spares: updatedSpares });
  };

  // Handle Jobs array updates
  const handleJobsChange = (index, field, value) => {
    const updatedJobs = [...formData.jobs];
    if (field === 'type') {
      updatedJobs[index].type = value;
    } else if (field === 'cost') {
      updatedJobs[index].cost = Number(value);
    }
    setFormData({ ...formData, jobs: updatedJobs });
  };

  // Add new cash amount entry
  const addJobs = () => {
    setFormData({
      ...formData,
      jobs: [...formData.jobs, { type: '', cost: 0 }]
    });
  };

  const removeJobs = (index) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs.splice(index, 1);
    setFormData({ ...formData, jobs: updatedJobs });
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Required string fields
    if (!formData.bname) newErrors.bname = 'Buyer name is required';
    if (!formData.fname) newErrors.fname = "Father's name is required";
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.chassis) newErrors.chassis = 'Chassis number is required';
    if (!formData.engine) newErrors.engine = 'Engine number is required';
    if (!formData.address) newErrors.address = 'Address is required';

    // Required number fields
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    if (!formData.saleamount) newErrors.saleamount = 'Sale amount is required';

    // Validate mobile number format
    if (formData.mobile && (String(formData.mobile).length < 10 || String(formData.mobile).length > 12)) {
      newErrors.mobile = 'Please enter a valid mobile number';
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
      const response = await fetch('/api/tractors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(JSON.stringify(formData))

      if (response.ok) {
        alert('Tractor data saved successfully!'); // Redirect to tractors list page
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to save tractor data'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while saving the data. Please try again.');
    }
  };


  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <div className='flex w-full justify-end'>
        <Link className='bg-blue-500 px-4 py-2 hover:bg-blue-700 text-white rounded-lg m-1' href={"/Service_Invoice/Add_Spares"}>Add Spare</Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Generate Service Invoice</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex gap-3'>
          <div className='w-1/2'>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Name
            </label>
            <input
              type="text"
              name="ownername"
              value={formData.ownername}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.ownername ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.bname && <p className="text-red-500 text-xs mt-1">{errors.ownername}</p>}
          </div>
          <div className='w-1/2'>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile No.
            </label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.bname && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>
        </div>
        <div className='flex gap-3'>
          <div className='w-1/2'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chassis No.
          </label>
          <input
            type="text"
            name="chasssis"
            value={formData.chassis}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.chassis ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bname && <p className="text-red-500 text-xs mt-1">{errors.chassis}</p>}
        </div>
        <div className='w-1/2'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Engine No.
          </label>
          <input
            type="text"
            name="engine"
            value={formData.engine}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.engine ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bname && <p className="text-red-500 text-xs mt-1">{errors.engine}</p>}
        </div>
        </div>
        <div className='flex gap-3'>
        <div className='w-1/2'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Hours
          </label>
          <input
            type="number"
            name="hours"
            value={formData.hours}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.hours ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bname && <p className="text-red-500 text-xs mt-1">{errors.hours}</p>}
        </div>
        <div className='w-1/2'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Model
          </label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bname && <p className="text-red-500 text-xs mt-1">{errors.hours}</p>}
        </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="invoice_date"
            value={'2025-09-10'}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.invoice_date ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.bname && <p className="text-red-500 text-xs mt-1">{errors.invoice_date}</p>}
        </div>

        <hr className='my-2' />

        {/* Spares */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-3">Spares</h2>
          {formData.spares.map((spare, index) => (
            <div key={`spare-${index}`} className="flex items-end gap-4 mb-4">
              <div className="flex flex-col w-1/6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code
                </label>
                <input
                  type="text"
                  value={spare.Code}
                  onChange={(e) => handleSpareChange(index, 'Code', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HSN
                </label>
                <input
                  type="text"
                  value={spare.hsn}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-2/6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={spare.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  MRP
                </label>
                <input
                  type="text"
                  readOnly
                  value={spare.MRP}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Final
                </label>
                <input
                  type="text"
                  value={spare.Final}
                  onChange={(e) => handleSpareChange(index, 'Final', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => { removeSpare(index) }}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <div className='flex gap-2'>
            <button
              type="button"
              onClick={addSpares}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Spares
            </button>
            <button
              type="button"
              onClick={() => { }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900"
            >
              Validate Spares
            </button>
          </div>
        </div>
        <hr className='my-2' />
        {/* Jobs */}
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-3">Jobs</h2>
          {formData.jobs.map((job, index) => (
            <div key={`job-${index}`} className="flex items-end gap-4 mb-4">
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  value={job.type}
                  onChange={(e) => handleJobsChange(index, 'type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost
                </label>
                <input
                  type="cost"
                  value={job.cost}
                  onChange={(e) => handleJobsChange(index, 'cost', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => { removeJobs(index) }}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addJobs}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Jobs
          </button>
        </div>

        <hr className='my-2' />

        <div className='flex justify-end'>
          <button
            type="button"
            onClick={() => { }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900"
          >
            Generate Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default TractorForm;