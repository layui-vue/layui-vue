type TimeSelectDateTime = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
};

const fromTime = (time: Date, mixin?: TimeSelectDateTime) => {
  return {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    day: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
    ...mixin,
  };
};

const toTime = (time: TimeSelectDateTime) =>
  new Date(
    `${time.year ?? 1970}-${time.month ?? 1}-${time.day ?? 1} ${
      time.hour ?? 0
    }:${time.minute ?? 0}:${time.second ?? 0}`
  );

const timeInterval = function* (time: Date, interval: number) {
  while (true) {
    yield time;
    time = new Date(time.getTime() + interval);
  }
};

const calcInterval = (time: Date, endTime: Date, interval: number) => {
  const diff = endTime.getTime() - time.getTime();
  return Math.floor(diff / interval / 1000);
};

export { fromTime, toTime, timeInterval, calcInterval, TimeSelectDateTime };
