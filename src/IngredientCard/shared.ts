export const checkBounds = ({
  current,
  max = Infinity,
  min = 0,
}: {
  current: number;
  max?: number;
  min?: number;
}) => {
  const isLowerBound = current <= min;
  const isUpperBound = current >= max;

  return [isLowerBound, isUpperBound];
};
