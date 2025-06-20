
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface StatisticsData {
  count: number;
  avgVelocity: number;
  maxVelocity: number;
  minDistance: number;
  avgDistance: number;
}

interface StatisticsCardsProps {
  statistics: StatisticsData | null;
}

export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ statistics }) => {
  if (!statistics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Total Objects</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{statistics.count}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Avg Velocity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{Math.round(statistics.avgVelocity).toLocaleString()}</p>
          <p className="text-sm text-gray-500">km/h</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Max Velocity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{Math.round(statistics.maxVelocity).toLocaleString()}</p>
          <p className="text-sm text-gray-500">km/h</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Min Distance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{Math.round(statistics.minDistance).toLocaleString()}</p>
          <p className="text-sm text-gray-500">km</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Avg Distance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{Math.round(statistics.avgDistance).toLocaleString()}</p>
          <p className="text-sm text-gray-500">km</p>
        </CardContent>
      </Card>
    </div>
  );
};
