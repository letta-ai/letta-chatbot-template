import * as React from 'react';

interface SkeletonLoadBlockProps {
  className?: string;
  accent?: number;
}

export const SkeletonLoadBlock: React.FC<SkeletonLoadBlockProps> = ({
  className,
  accent = 200,
}) => {
  return <div className={`bg-gray-${accent} rounded animate-pulse ${className}`}></div>;
};
