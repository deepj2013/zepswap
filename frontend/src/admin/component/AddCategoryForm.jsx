import React, { useState } from 'react';

const AddCategoryForm = ({handleOpen}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState(0);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'image') {
      setImageFile(files[0]); // Assuming single file upload
    } else if (name === 'price') {
      setPrice(parseFloat(value)); // Convert to number for calculations
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', imageFile); // Assuming backend supports FormData

    // Handle form submission logic here (e.g., send data to backend)
    console.log('Form submitted:', formData);

    // Reset form after submission (optional)
    setName('');
    setDescription('');
    setImageFile(null);
    setPrice(0);
  };

  return (
    <form onSubmit={handleOpen} className="space-y-4  bg-white w-[700px] p-10 rounded-2xl mx-auto">

      <p className='text-3xl'>Add Category </p>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="image" className="text-sm font-medium mb-2">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="price" className="text-sm font-medium mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
          min="0"
          step="0.01" // Optional for decimal prices
        />
      </div>
      <button
      onClick={handleOpen}
        type="button"
        className="w-full rounded-md bg-indigo-600 px-3 py-2 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit Product
      </button>
    </form>
  );
};

export default AddCategoryForm;
