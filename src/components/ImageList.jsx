import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline/esm/ArrowDownTrayIcon';

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ImageList = ({ images }) => {
  const handleDownload = async (id) => {
    window.open(`http://localhost:5000/api/images/${id}/download`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {images.map((image) => (
        <div key={image._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={`http://localhost:5000/${image.compressedPath}`}
            alt={image.originalName}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-medium text-gray-900 truncate" title={image.originalName}>
              {image.originalName}
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-500">
                Original: {formatBytes(image.originalSize)}
              </p>
              <p className="text-sm text-gray-500">
                Compressed: {formatBytes(image.compressedSize)}
              </p>
              <p className="text-sm text-green-600">
                Saved: {image.compressionRatio.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500">
                Dimensions: {image.dimensions.width}x{image.dimensions.height}
              </p>
            </div>
            <button
              onClick={() => handleDownload(image._id)}
              className="mt-4 flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageList; 