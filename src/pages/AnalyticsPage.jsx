import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/outline/esm/PhotoIcon';
import axios from 'axios';
import Analytics from '../components/Analytics';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({
    summary: {
      totalImages: 0,
      totalOriginalSize: 0,
      totalCompressedSize: 0,
      averageCompressionRatio: 0,
      totalSizeSaved: 0,
    },
    dailyStats: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analytics');
      setAnalytics(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Compression Analytics
          </h1>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PhotoIcon className="h-5 w-5 mr-2" />
            Images
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Analytics analytics={analytics} />
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage; 