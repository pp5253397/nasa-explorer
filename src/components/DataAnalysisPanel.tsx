
import React, { useState, useMemo } from 'react';
import { useSpaceData } from '../hooks/useSpaceData';
import { Button } from './ui/button';
import { BarChart3, X } from 'lucide-react';
import { toast } from 'sonner';
import { StatisticsCards } from './data-analysis/StatisticsCards';
import { DataFilters } from './data-analysis/DataFilters';
import { DataTable } from './data-analysis/DataTable';
import { RawDataDisplay } from './data-analysis/RawDataDisplay';

interface DataAnalysisPanelProps {
  onClose: () => void;
}

export const DataAnalysisPanel: React.FC<DataAnalysisPanelProps> = ({ onClose }) => {
  const { neoData, apodData, loading } = useSpaceData();
  const [sortBy, setSortBy] = useState<'name' | 'velocity' | 'distance' | 'date'>('distance');
  const [filterBy, setFilterBy] = useState<'all' | 'fast' | 'close' | 'recent'>('all');
  const [showRawData, setShowRawData] = useState(false);

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...neoData];

    // Apply filters
    switch (filterBy) {
      case 'fast':
        filtered = filtered.filter(neo => neo.velocity > 30000);
        break;
      case 'close':
        filtered = filtered.filter(neo => neo.distance < 500000);
        break;
      case 'recent':
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(neo => new Date(neo.closeApproachDate) >= weekAgo);
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'velocity':
          return b.velocity - a.velocity;
        case 'distance':
          return a.distance - b.distance;
        case 'date':
          return new Date(a.closeApproachDate).getTime() - new Date(b.closeApproachDate).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [neoData, sortBy, filterBy]);

  const statistics = useMemo(() => {
    if (filteredAndSortedData.length === 0) return null;

    const velocities = filteredAndSortedData.map(neo => neo.velocity);
    const distances = filteredAndSortedData.map(neo => neo.distance);

    return {
      count: filteredAndSortedData.length,
      avgVelocity: velocities.reduce((a, b) => a + b, 0) / velocities.length,
      maxVelocity: Math.max(...velocities),
      minDistance: Math.min(...distances),
      avgDistance: distances.reduce((a, b) => a + b, 0) / distances.length,
    };
  }, [filteredAndSortedData]);

  const exportData = () => {
    const csvContent = [
      'Name,Velocity (km/h),Distance (km),Close Approach Date',
      ...filteredAndSortedData.map(neo => 
        `"${neo.name}",${neo.velocity},${neo.distance},${neo.closeApproachDate}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asteroid_data.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Data exported successfully!');
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg">
          <p>Loading data analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Space Data Analysis
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <DataFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            showRawData={showRawData}
            setShowRawData={setShowRawData}
            onExport={exportData}
          />

          <StatisticsCards statistics={statistics} />
          
          <DataTable data={filteredAndSortedData} showRawData={showRawData} />

          {showRawData && (
            <RawDataDisplay neoData={filteredAndSortedData} apodData={apodData} />
          )}
        </div>
      </div>
    </div>
  );
};
