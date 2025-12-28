import type { HTMLAttributes } from 'react';

export interface SkeletonBaseProps extends HTMLAttributes<HTMLDivElement> {
  animate?: boolean;
}

export interface SkeletonTextProps extends SkeletonBaseProps {
  width?: string | number;
  height?: number;
}

export interface SkeletonCircleProps extends SkeletonBaseProps {
  size?: number;
}

export interface SkeletonRectangleProps extends SkeletonBaseProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
}