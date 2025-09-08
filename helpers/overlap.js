export function overlaps(aStart, aEnd, bStart, bEnd) {
  const startA = new Date(aStart).getTime();
  const endA = aEnd ? new Date(aEnd).getTime() : Infinity;
  const startB = new Date(bStart).getTime();
  const endB = bEnd ? new Date(bEnd).getTime() : Infinity;

  return startA < endB && startB < endA;
}

export function endWithDesired(startAt, endAt, desiredMs) {
  return (
    endAt || new Date(new Date(startAt).getTime() + desiredMs).toISOString()
  );
}
