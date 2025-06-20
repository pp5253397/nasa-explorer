
import React from 'react';
import { SpaceVisualization } from '../components/SpaceVisualization';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpaceExplorer = () => {
  return (
    <div className="w-full h-screen bg-black relative">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-10">
        <Link to="/">
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <SpaceVisualization />
    </div>
  );
};

export default SpaceExplorer;
