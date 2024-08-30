import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs/plugin/utc";

dayjs.extend(dayjsPluginUTC);

export const shortenAddress = (address: string, length = 4) => {
  const text = address.toString();
  
  if (text.length < 9) {
    return text;
  }
  return `${text.substring(0, length)}...${text.substring(text.length - length)}`;
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

export const toHours = (milliseconds: number, decimals = 0) => {
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

export const toNormalizePercent = (num: number, decimals = 2) => {
  const percentage = (num - 1) * 100;
  
  return percentage.toPrecision(decimals) + "%";
};

export const isInChallengePeriod = (challengeperiod: any) => {
  return challengeperiod.status === "testing";
};
