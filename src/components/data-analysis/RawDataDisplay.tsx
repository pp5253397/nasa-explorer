
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { NEOData, APODData } from '../../types/space';

interface RawDataDisplayProps {
  neoData: NEOData[];
  apodData: APODData | null;
}

export const RawDataDisplay: React.FC<RawDataDisplayProps> = ({ neoData, apodData }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Raw API Data</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-64">
          {JSON.stringify({ neoData, apodData }, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
};
