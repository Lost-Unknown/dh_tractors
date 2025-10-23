"use client"
import Link from 'next/link';
import React, { useState } from 'react';
const ServiceForm = () => {

  const[totalData,setTotalData] = useState({
    SpareTotal: 0,
    JobsTotal: 0
  })
  // Initialize form state with empty values
  const [formData, setFormData] = useState({
    ownername: '',
    model: '',
    chassis: '',
    engine: '',
    mobile: 0,
    hours: 0,
    date:new Date(),
    spares: [{ code: '', name: '',quantity:1, MRP: 0, final: 0 }],
    jobs: [{ type: '', cost: 0 }]
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate Spare Parts
  const validateParts = async(e) =>{
    var partslist = '';
    formData.spares.forEach(element => {
      partslist = partslist + element.code+ '_';
      });
      const sub = partslist.substring(0,partslist.length -1);
      try {
      // Replace with your API endpoint
      const response = await fetch(`/api/spare/${sub}`);
      if(response.ok)
      {
        const sparedata = await response.json();
        const updatedSpares = [...formData.spares]
        let priceTotal  = 0;
        for(let i = 0; i<updatedSpares.length;i++){
          updatedSpares[i].name = sparedata[i].name;
          updatedSpares[i].MRP = sparedata[i].price;
          updatedSpares[i].final = sparedata[i].price;
          priceTotal += sparedata[i].price;
        }
        setFormData({ ...formData, spares: updatedSpares });
        setTotalData({...totalData,SpareTotal:priceTotal})
      }
    }
    catch(e){
      console.log("Something Went Wrong" + e);  
    }
  }

  // Handle Spares array updates
  const handleSpareChange = (index, field, value) => {
    const updatedSpares = [...formData.spares];
    if (field === 'code') {
      updatedSpares[index].code = value;
    } else if (field === 'final') {
      updatedSpares[index].final = Number(value);
      let spareTotal = 0;
      updatedSpares.forEach(element => {
        spareTotal += element.final*element.quantity;
      });
      setTotalData({...totalData,SpareTotal:spareTotal})
    }
    else if (field === 'quantity') {
      updatedSpares[index].quantity = Number(value);
      let spareTotal = 0;
      updatedSpares.forEach(element => {
        spareTotal += element.final*element.quantity;
      });
      setTotalData({...totalData,SpareTotal:spareTotal})
    }
    setFormData({ ...formData, spares: updatedSpares });

    console.log(formData.spares)
  };

  // Add new Spare entry
  const addSpares = () => {
    setFormData({
      ...formData,
      spares: [...formData.spares, { code: '', name: '',quantity:1, MRP: 0, final: 0 }]
    });
  };

  // Handle Spare remove entry
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
      let jobstotal = 0;
      updatedJobs.forEach(element => {
        jobstotal += element.cost;
      });
      setTotalData({...totalData,JobsTotal:jobstotal});
    }
    setFormData({ ...formData, jobs: updatedJobs });
  };

  // Add new jobs amount entry
  const addJobs = () => {
    setFormData({
      ...formData,
      jobs: [...formData.jobs, { type: '', cost: 0 }]
    });
  };

  // Handle Jobs remove entry
  const removeJobs = (index) => {
    const updatedJobs = [...formData.jobs];
    updatedJobs.splice(index, 1);
    setFormData({ ...formData, jobs: updatedJobs });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      const response = await fetch('/api/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // if saved Successfully
        alert('Service data saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to save Service data'}`);
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
        <Link className='bg-blue-500 px-4 py-2 hover:bg-blue-700 text-white rounded-lg m-1' href={"/Service_Invoice/Invoice"}>Invoice</Link>
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
              className={'w-full px-3 py-2 border rounded-md border-gray-300'}
            />
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
              className={'w-full px-3 py-2 border rounded-md border-gray-300'}
            />
          </div>
        </div>
        <div className='flex gap-3'>
          <div className='w-1/2'>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chassis No.
          </label>
          <input
            type="text"
            name="chassis"
            value={formData.chassis}
            onChange={handleInputChange}
            className={'w-full px-3 py-2 border rounded-md border-gray-300'}
          />
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
            className={'w-full px-3 py-2 border rounded-md border-gray-300'}
          />
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
            className={'w-full px-3 py-2 border rounded-md border-gray-300'}
          />
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
            className={'w-full px-3 py-2 border rounded-md border-gray-300'}
          />
        </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={'w-full px-3 py-2 border rounded-md border-gray-300'}
          />
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
                  value={spare.code}
                  onChange={(e) => handleSpareChange(index, 'code', e.target.value)}
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
                  Quantity
                </label>
                <input
                  type="text"
                  value={spare.quantity}
                  onChange={(e) => handleSpareChange(index, 'quantity', e.target.value)}
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
                  final
                </label>
                <input
                  type="text"
                  value={spare.final}
                  onChange={(e) => handleSpareChange(index, 'final', e.target.value)}
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
          <div className='flex justify-between'>
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
              onClick={validateParts}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900"
            >
              Validate Spares
            </button>
            </div>
            {<h1 className='text-2xl'>Total : Rs {totalData.SpareTotal}</h1>}
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
          <div className='flex justify-between'>
          <button
            type="button"
            onClick={addJobs}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Jobs
          </button>
          <h1 className='text-2xl'>Total : Rs {totalData.JobsTotal}</h1>
          </div>
        </div>

        <hr className='my-2' />

        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Grand Total : Rs {totalData.SpareTotal + totalData.JobsTotal}</h1>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900"
          >
            Generate Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;