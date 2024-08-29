import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs/plugin/utc";

dayjs.extend(dayjsPluginUTC);

import {Elimination, Positions, Order} from "@/types";

export const shortenAddress = (address: string, length = 4) => {
  const text = address.toString();

  if (text.length < 9) {
    return text;
  }
  return `${text.substring(0, length)}...${text.substring(text.length - length)}`;
};

export const fetchChunk = async (url: string) => {
  return fetch(url)
    .then((response) => {
      const reader = response.body?.getReader();

      if (!reader) {
        throw new Error("Response body is null");
      }

      return new ReadableStream({
        start(controller) {
          const push = () => {
            reader?.read().then(({done, value}) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          };

          push();
        },
      });
    })
    .then((stream) => new Response(stream));
};

export const formatDate = (
  value: string | number | Date,
  type = "MM/DD/YYYY HH:mm:ss",
): string => {
  const validDate = Number(value);

  if (validDate === 0) {
    return "N/A";
  }

  return dayjs(validDate).utc().format(type);
};

export const formatCurrency = (tick: number, digits = 5) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(tick);
};

export const filterEliminations = (
  eliminations: Elimination[],
  positions: Positions,
) => {
  const hotkeys = eliminations.map(
    (elimination: Elimination) => elimination.hotkey,
  );

  const filteredPositions = Object.keys(positions)
    .filter((key) => !hotkeys.includes(key))
    .reduce((obj: Positions, key) => {
      obj[key] = positions[key];
      return obj;
    }, {});

  return {positions: filteredPositions};
};

export const within24Hours = (order: Order) => {
  const currentDate = dayjs();
  const twentyFourHoursAgo = currentDate.subtract(24, "hour");

  const targetDate = dayjs(order.processed_ms);

  return (
    targetDate.isBefore(currentDate) && targetDate.isAfter(twentyFourHoursAgo)
  );
};

export const isRecent = (orders: Order[]) => {
  return orders?.some(within24Hours);
};

export const toHours = (milliseconds: number, decimals=0) => {
  const hours = milliseconds / (1000 * 60 * 60);

  return hours.toFixed(decimals);
};

export const toShortFloat = (num: number, decimals = 4) => {
    return num.toFixed(decimals);
};

export const toPercent = (num: number, decimals = 4) => {
  return (num * 100).toFixed(decimals) + "%";
};

export const toRemainingPercent = (num: number, decimals = 4) => {
  return ((1 - num) * 100).toFixed(decimals) + "%";
};

export const toNormalizePercent = (num: number, decimals=2) => {
  const percentage = (num - 1) * 100;

  return percentage.toPrecision(decimals) + "%";
};

export const isInChallengePeriod = (challengeperiod: any) => {
  return challengeperiod.status === 'testing';
}
