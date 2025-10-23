"use client"
import React, { useState } from 'react';

const Add_Spares = () => {

  // Initialize form state with empty values
  const [formData, setFormData] = useState({
    spares :[{ code: '', hsn: '', name: '', price: 0, gst: 0 }]
});

  // Handle Spares array updates
  const handleSpareChange = (index, field, value) => {
    const updatedSpares = [...formData.spares];
    switch(field){
      case "code" : updatedSpares[index].code = value; break;
      case "hsn" :updatedSpares[index].hsn = value; break;
      case "name" :updatedSpares[index].name = value;break;
      case "price":updatedSpares[index].price = Number(value); break;
      case "gst":updatedSpares[index].gst = Number(value);break;
    }
    setFormData({ ...formData, spares: updatedSpares });
  };

  // Add new Spare amount entry
  const addSpares = () => {
    setFormData({
      ...formData,
      spares: [...formData.spares, { code: '', hsn: '', name: '', price: 0, gst: 0 }]
    });
    console.log(formData.spares)
  };

  // Handle Removing Spare entry
  const removeSpare = (index) => {
    const updatedSpares = [...formData.spares];
    updatedSpares.splice(index, 1);
    setFormData({ ...formData, spares: updatedSpares });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your API endpoint
      const response = await fetch('/api/spare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.spares),
      });
      if (response.ok) {
        //if saved successfully
        alert('Spare data saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to save spare data'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while saving the data. Please try again.');
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Spares</h1>
      <form onSubmit={handleSubmit}>
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
                <div className="flex flex-col w-1/6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    HSN
                  </label>
                  <input
                    type="text"
                    value={spare.hsn}
                    onChange={(e) => handleSpareChange(index, 'hsn', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col w-2/6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={spare.name}
                    onChange={(e) => handleSpareChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col w-1/6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <input
                    type="text"
                    value={spare.price}
                    onChange={(e) => handleSpareChange(index, 'price', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex flex-col w-1/6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST
                  </label>
                  <input
                    type="text"
                    value={spare.gst}
                    onChange={(e) => handleSpareChange(index, 'gst', e.target.value)}
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
            </div>
          </div>


          <hr className='my-2' />

          <div className='flex justify-end'>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900"
            >
              Add Spares
            </button>
          </div>
      </form>
    </div>
  )
}

export default Add_Spares