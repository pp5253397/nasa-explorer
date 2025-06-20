
import React, { memo } from 'react';
import { Skeleton } from './ui/skeleton';

interface LoadingWrapperProps {
  loading: boolean;
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  className?: string;
}

export const LoadingWrapper = memo<LoadingWrapperProps>(({ 
  loading, 
  children, 
  skeleton,
  className = "" 
}) => {
  if (loading) {
    return skeleton || (
      <div className={`space-y-4 ${className}`}>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return <>{children}</>;
});

LoadingWrapper.displayName = 'LoadingWrapper';
