import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon } from '@heroicons/react/24/outline/esm/ChartBarIcon';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import ImageUpload from '../components/ImageUpload';
import ImageList from '../components/ImageList';

const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/images');
      setImages(response.data.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleUploadSuccess = (newImage) => {
    setImages(prevImages => [newImage, ...prevImages]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Image Compression
          </h1>
          <Link
            to="/analytics"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Analytics
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
          <ImageList images={images} />
        </div>
      </main>
    </div>
  );
};

export default HomePage; 