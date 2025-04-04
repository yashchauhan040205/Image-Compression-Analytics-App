import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Analytics = ({ analytics }) => {
  const { summary, dailyStats } = analytics;

  const chartData = {
    labels: dailyStats.map(stat => stat._id),
    datasets: [
      {
        label: 'Images Compressed',
        data: dailyStats.map(stat => stat.count),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Storage Saved (KB)',
        data: dailyStats.map(stat => stat.totalSaved / 1024),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Compression Statistics Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Images"
          value={summary.totalImages}
          description="Images compressed"
        />
        <StatCard
          title="Storage Saved"
          value={formatBytes(summary.totalSizeSaved)}
          description="Total storage saved"
        />
        <StatCard
          title="Average Ratio"
          value={`${summary.averageCompressionRatio.toFixed(1)}%`}
          description="Average compression ratio"
        />
        <StatCard
          title="Total Size"
          value={formatBytes(summary.totalOriginalSize)}
          description="Total original size"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, description }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
    <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
    <dd className="mt-1 text-sm text-gray-500">{description}</dd>
  </div>
);

export default Analytics; 