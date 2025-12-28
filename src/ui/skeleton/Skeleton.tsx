import type {
  SkeletonTextProps,
  SkeletonCircleProps,
  SkeletonRectangleProps,
} from './Skeleton.types';
import styles from './Skeleton.module.css';

const formatDimension = (value: string | number): string => {
  return typeof value === 'number' ? `${value}px` : value;
};

export function SkeletonText({
  width = '100%',
  height = 16,
  animate = true,
  className,
  style,
  ...rest
}: SkeletonTextProps) {
  const classNames = [
    styles.skeleton,
    styles.text,
    animate && styles.animate,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{
        width: formatDimension(width),
        height: formatDimension(height),
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    />
  );
}

SkeletonText.displayName = 'SkeletonText';

export function SkeletonCircle({
  size = 40,
  animate = true,
  className,
  style,
  ...rest
}: SkeletonCircleProps) {
  const classNames = [
    styles.skeleton,
    styles.circle,
    animate && styles.animate,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    />
  );
}

SkeletonCircle.displayName = 'SkeletonCircle';

export function SkeletonRectangle({
  width = '100%',
  height = 200,
  borderRadius = 4,
  animate = true,
  className,
  style,
  ...rest
}: SkeletonRectangleProps) {
  const classNames = [
    styles.skeleton,
    styles.rectangle,
    animate && styles.animate,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={{
        width: formatDimension(width),
        height: formatDimension(height),
        borderRadius,
        ...style,
      }}
      aria-hidden="true"
      {...rest}
    />
  );
}

SkeletonRectangle.displayName = 'SkeletonRectangle';