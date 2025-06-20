
import React from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Filter, Download } from 'lucide-react';

interface DataFiltersProps {
  sortBy: 'name' | 'velocity' | 'distance' | 'date';
  setSortBy: (value: 'name' | 'velocity' | 'distance' | 'date') => void;
  filterBy: 'all' | 'fast' | 'close' | 'recent';
  setFilterBy: (value: 'all' | 'fast' | 'close' | 'recent') => void;
  showRawData: boolean;
  setShowRawData: (show: boolean) => void;
  onExport: () => void;
}

export const DataFilters: React.FC<DataFiltersProps> = ({
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
  showRawData,
  setShowRawData,
  onExport
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium mb-2">Sort By</label>
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance</SelectItem>
            <SelectItem value="velocity">Velocity</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Filter</label>
        <Select value={filterBy} onValueChange={(value: any) => setFilterBy(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Objects</SelectItem>
            <SelectItem value="fast">Fast (&gt;30k km/h)</SelectItem>
            <SelectItem value="close">Close (&lt;500k km)</SelectItem>
            <SelectItem value="recent">Recent (7 days)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-end">
        <Button 
          onClick={() => setShowRawData(!showRawData)}
          variant={showRawData ? "default" : "outline"}
          className="w-full"
        >
          <Filter className="w-4 h-4 mr-2" />
          Raw Data
        </Button>
      </div>

      <div className="flex items-end">
        <Button onClick={onExport} className="w-full">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </div>
  );
};
