import { config } from "../config/config";

const regExIpAddressMatcher = "/\bd{1,3}.d{1,3}.d{1,3}.d{1,3}\b/gm";

const getDateRegex = "/\bd{2}/[a-zA-Z]{3}/d{4}:d{2}:d{2}:d{2} +d{4}\b/gm";

const getURLRegEx = '("GET|PUT|POST|DELETE) (.*) (HTTP/1.1")';

export interface formatLogFileModel {
  ip: string;
  date: string;
  url: string;
}

const getLogFilePath = () => {
  const pathString = config().logFilePath;
  return pathString;
};

const getUniqueIpAddress = async (
  fileData: formatLogFileModel[]
): Promise<string[]> => {
  console.log("fileData", fileData);

  const result: string[] = [];

  return new Promise((resolve, reject) => {
    if (result.length > 0) {
      resolve(result);
    } else {
      reject(["Error getting unique Ip addresses"]);
    }
  });
};

const getThreeMostVisitedIpAddress = (
  fileData: formatLogFileModel[]
): Promise<string[]> => {
  const result: string[] = [];
  return new Promise((resolve, reject) => {
    if (result.length > 0) {
      resolve(result);
    } else {
      reject(["Error getting most visited Ip addresses"]);
    }
  });
};

const getThreeMostActiveIpAddresses = (
  fileData: formatLogFileModel[]
): Promise<string[]> => {
  const result: string[] = [];

  return new Promise((resolve, reject) => {
    if (result.length > 0) {
      resolve(result);
    } else {
      reject(["Error getting most active Ip addresses"]);
    }
  });
};

const formatLogFileRawData = (fileStringData: string): formatLogFileModel[] => {
  return [];
};

const logFileUtils = {
  getUniqueIpAddress,
  getThreeMostVisitedIpAddress,
  getThreeMostActiveIpAddresses,
  getLogFilePath,
  formatLogFileRawData,
};
export default logFileUtils;
