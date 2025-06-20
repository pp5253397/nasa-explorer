
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import type { NEOData } from '../../types/space';

interface DataTableProps {
  data: NEOData[];
  showRawData: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ data, showRawData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Near-Earth Objects Data ({data.length} objects)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Velocity (km/h)</TableHead>
                <TableHead>Distance (km)</TableHead>
                <TableHead>Close Approach Date</TableHead>
                {showRawData && <TableHead>Raw ID</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((neo) => (
                <TableRow key={neo.id}>
                  <TableCell className="font-medium">{neo.name}</TableCell>
                  <TableCell>{Math.round(neo.velocity).toLocaleString()}</TableCell>
                  <TableCell>{Math.round(neo.distance).toLocaleString()}</TableCell>
                  <TableCell>{new Date(neo.closeApproachDate).toLocaleDateString()}</TableCell>
                  {showRawData && <TableCell className="font-mono text-xs">{neo.id}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
