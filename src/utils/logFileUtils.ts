import config from "../config";
import _ from "lodash";
import moment from "moment";

export interface formatLogFileModel {
  ip: string;
  dateTimeStamp: number;
  url: string;
}

const getLogFilePath = () => {
  const pathString = config().logFilePath;
  return pathString;
};

const getNumberOfUniqueIpAddress = (
  fileData: formatLogFileModel[]
): Promise<number> => {
  const allIpAddresses: string[] = [];

  fileData.forEach((fd) => {
    allIpAddresses.push(fd.ip);
  });

  const ipAddressSet = new Set(allIpAddresses);

  const uniqueIpAddresses = [...ipAddressSet];

  return new Promise((resolve, reject) => {
    if (uniqueIpAddresses.length > 0) {
      resolve(uniqueIpAddresses.length);
    } else {
      reject(["Error getting unique Ip addresses"]);
    }
  });
};

const getThreeMostVisitedUrls = (
  fileData: formatLogFileModel[]
): Promise<string[]> => {
  const allUrls: string[] = [];
  const topThreeMostVisitedUrls: string[] = [];

  fileData.forEach((fd) => {
    allUrls.push(fd.url);
  });

  const urlsByCount = _.countBy(allUrls);

  const invertedUrlsByCount = _.invertBy(urlsByCount);

  const keyArrayInDescendingOrder = _.reverse(Object.keys(invertedUrlsByCount));

  switch (true) {
    case keyArrayInDescendingOrder.length >= 3:
      {
        keyArrayInDescendingOrder.forEach((key) => {
          topThreeMostVisitedUrls.push(invertedUrlsByCount[key][0]);
        });
      }
      break;

    case keyArrayInDescendingOrder.length === 2:
      {
        if (invertedUrlsByCount[2].length >= 2) {
          topThreeMostVisitedUrls.push(
            invertedUrlsByCount[2][0],
            invertedUrlsByCount[2][1],
            invertedUrlsByCount[2][2]
          );
        } else if (
          invertedUrlsByCount[2].length === 1 &&
          invertedUrlsByCount[1].length >= 2
        ) {
          topThreeMostVisitedUrls.push(
            invertedUrlsByCount[2][0],
            invertedUrlsByCount[1][0],
            invertedUrlsByCount[1][1]
          );
        } else {
          topThreeMostVisitedUrls.push(
            invertedUrlsByCount[2][0],
            invertedUrlsByCount[1][0],
            ""
          );
        }
      }
      break;

    case keyArrayInDescendingOrder.length === 1:
      {
        if (invertedUrlsByCount[1].length >= 3) {
          topThreeMostVisitedUrls.push(
            invertedUrlsByCount[1][0],
            invertedUrlsByCount[1][1],
            invertedUrlsByCount[1][2]
          );
        } else if (invertedUrlsByCount[1].length >= 2) {
          topThreeMostVisitedUrls.push(
            invertedUrlsByCount[1][0],
            invertedUrlsByCount[1][1],
            ""
          );
        } else {
          topThreeMostVisitedUrls.push(invertedUrlsByCount[1][0], "", "");
        }
      }
      break;
  }

  return new Promise((resolve, reject) => {
    if (topThreeMostVisitedUrls.length > 0) {
      resolve(topThreeMostVisitedUrls);
    } else {
      reject(["Error getting most visited Ip addresses"]);
    }
  });
};

const getThreeMostActiveIpAddresses = (
  fileData: formatLogFileModel[]
): Promise<string[]> => {
  const sortedFileDataByTimeStamp = _.orderBy(
    fileData,
    ["dateTimeStamp"],
    ["desc"]
  );

  const uniqueIpAddresses = [
    ...new Set(sortedFileDataByTimeStamp.map((item) => `${item.ip}`)),
  ];

  const topThreeActiveIpAddresses: string[] = uniqueIpAddresses.slice(0, 3);

  return new Promise((resolve, reject) => {
    if (topThreeActiveIpAddresses.length > 0) {
      resolve(topThreeActiveIpAddresses);
    } else {
      reject(["Error getting most active Ip addresses"]);
    }
  });
};

const formatDateString = (date: string) => {
  const splitDate = date.split(":");
  const formattedDateSting = `${splitDate[0]} ${splitDate[1]}:${splitDate[2]}:${splitDate[3]}`;
  return moment(new Date(formattedDateSting)).utc().valueOf() ?? Date.now();
};

const formatLogFileRawData = (fileStringData: string): formatLogFileModel[] => {
  const regExIpAddressMatcher: RegExp =
    /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3} -/gm;

  const getURLRegEx: RegExp = /(GET|PUT|POST|DELETE) (.*) (HTTP\/1.1)/gm;

  const getDateRegex: RegExp =
    /\b\d{2}\/[a-zA-Z]{3}\/\d{4}:\d{2}:\d{2}:\d{2} \+\d{4}\b/gm;

  const allIpAddressMatchesInLogFile: RegExpMatchArray | null =
    fileStringData.match(regExIpAddressMatcher);

  const allDateMatchesInLogFile: RegExpMatchArray | null =
    fileStringData.match(getDateRegex);

  const allURLMatchesInLogFile: RegExpMatchArray | null =
    fileStringData.match(getURLRegEx);

  const processedLogData: formatLogFileModel[] = [];

  if (
    allIpAddressMatchesInLogFile &&
    allDateMatchesInLogFile &&
    allURLMatchesInLogFile
  ) {
    for (let i = 0; i < allIpAddressMatchesInLogFile.length; i++) {
      const formattedIpAddress = allIpAddressMatchesInLogFile[i].split(" ");
      processedLogData.push({
        ip: formattedIpAddress[0] ?? "",
        dateTimeStamp: formatDateString(allDateMatchesInLogFile[i]),
        url: allURLMatchesInLogFile[i] ?? "",
      });
    }
  }
  return processedLogData;
};

const logFileUtils = {
  getNumberOfUniqueIpAddress,
  getThreeMostVisitedUrls,
  getThreeMostActiveIpAddresses,
  getLogFilePath,
  formatLogFileRawData,
};
export { logFileUtils };
