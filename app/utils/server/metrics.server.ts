type Timings = {
  [key: string]: { name: string; type: string; time: number }[];
};

const time = async <ReturnType>({
  name,
  type,
  fn,
  timings,
}: {
  name: string;
  type: string;
  fn: () => ReturnType | Promise<ReturnType>;
  timings?: Timings;
}): Promise<ReturnType> => {
  if (!timings) {
    return fn();
  }

  const start = performance.now();
  const result = await fn();

  // eslint-disable-next-line no-param-reassign
  type = type.replace(/ /g, "_");

  let timingType = timings[type];

  if (!timingType) {
    // eslint-disable-next-line no-multi-assign, no-param-reassign
    timingType = timings[type] = [];
  }

  timingType.push({ name, type, time: performance.now() - start });

  return result;
};

function getServerTimeHeader(timings: Timings) {
  return Object.entries(timings)
    .map(([key, timingInfos]) => {
      const dur = timingInfos
        .reduce((acc, timingInfo) => acc + timingInfo.time, 0)
        .toFixed(1);
      const desc = timingInfos.map((timing) => timing.name).join(" & ");
      return `${key};dur=${dur};desc="${desc}"`;
    })
    .join(",");
}

export { getServerTimeHeader, time };
export type { Timings };
