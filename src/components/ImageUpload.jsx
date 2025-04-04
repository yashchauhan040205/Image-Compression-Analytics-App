import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline/esm/CloudArrowUpIcon';
import axios from 'axios';
import toast from 'react-hot-toast';

const ImageUpload = ({ onUploadSuccess }) => {
  const [quality, setQuality] = useState(80);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('quality', quality);

    try {
      const response = await axios.post('http://localhost:5000/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Image uploaded and compressed successfully!');
      onUploadSuccess(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error uploading image');
    } finally {
      setIsUploading(false);
    }
  }, [quality, onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Compression Quality: {quality}%
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={quality}
          onChange={(e) => setQuality(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}`}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
        {isUploading ? (
          <p className="mt-2 text-sm text-gray-600">Uploading and compressing...</p>
        ) : isDragActive ? (
          <p className="mt-2 text-sm text-gray-600">Drop the image here...</p>
        ) : (
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop an image here, or click to select
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Supports: JPG, PNG, GIF, WebP (up to 5MB)
        </p>
      </div>
    </div>
  );
};

export default ImageUpload; 