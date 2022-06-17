import { FormatLogFileModel, logFileUtils } from "./logFileUtils";

const logFileMock: FormatLogFileModel[] = [
  {
    ip: "123.123.123",
    dateTimeStamp: 1655370023419,
    url: "GET /intranet-analytics/ HTTP/1.1",
  },
  {
    ip: "123.123.123",
    dateTimeStamp: 1655370023419,
    url: "GET /intranet-analytics/ HTTP/1.1",
  },
  {
    ip: "0.0.0.0",
    dateTimeStamp: 1655377403006,
    url: "GET /docs/ HTTP/1.1",
  },
  {
    ip: "0.0.0.0",
    dateTimeStamp: 1655377403006,
    url: "GET /docs/ HTTP/1.1",
  },
  {
    ip: "321.321.321",
    dateTimeStamp: 1655384645165,
    url: "GET /temp-redirect HTTP/1.1",
  },
  {
    ip: "234.134.124",
    dateTimeStamp: 1655391875131,
    url: "GET /hosting/ HTTP/1.1",
  },
  {
    ip: "234.134.124",
    dateTimeStamp: 1655391875131,
    url: "GET /hosting/ HTTP/1.1",
  },
];

describe("logFileUtils", () => {
  describe("getNumberOfUniqueIpAddress", () => {
    it("should calculate unique IP Addresses from log file", async () => {
      const uniqueIpAddresses = await logFileUtils
        .getNumberOfUniqueIpAddress(logFileMock)
        .then((result) => {
          return result;
        });
      expect(uniqueIpAddresses).toBe(4);
    });

    it("should return error ", async () => {
      const uniqueIpAddresses = await logFileUtils
        .getNumberOfUniqueIpAddress([])
        .then((result) => {
          return result;
        })
        .catch((error) => {
          return error;
        });

      expect(uniqueIpAddresses).toStrictEqual([
        "Error getting unique Ip addresses",
      ]);
    });
  });

  describe("getThreeMostActiveIpAddresses", () => {
    it("should get three most active IP addresses", async () => {
      const threeMostActiveIpAddresses = await logFileUtils
        .getThreeMostActiveIpAddresses(logFileMock)
        .then((result) => {
          return result;
        });

      expect(threeMostActiveIpAddresses).toStrictEqual([
        "234.134.124",
        "321.321.321",
        "0.0.0.0",
      ]);
    });

    it("should return error for empty array", async () => {
      const threeMostActiveIpAddresses = await logFileUtils
        .getThreeMostActiveIpAddresses([])
        .then((result) => {
          return result;
        })
        .catch((error) => {
          return error;
        });

      expect(threeMostActiveIpAddresses).toStrictEqual([
        "Error getting most active Ip addresses",
      ]);
    });
  });

  describe("getThreeMostVisitedUrls", () => {
    it("should get three most visited URLs", async () => {
      const threeMostVisitedUrls = await logFileUtils
        .getThreeMostVisitedUrls(logFileMock)
        .then((result) => {
          return result;
        });

      expect(threeMostVisitedUrls).toStrictEqual([
        "GET /intranet-analytics/ HTTP/1.1",
        "GET /docs/ HTTP/1.1",
        "GET /hosting/ HTTP/1.1",
      ]);
    });

    it("should return error for empty array", async () => {
      const threeMostVisitedUrls = await logFileUtils
        .getThreeMostVisitedUrls([])
        .then((result) => {
          return result;
        })
        .catch((error) => {
          return error;
        });

      expect(threeMostVisitedUrls).toStrictEqual([
        "Error getting most visited Ip addresses",
      ]);
    });
  });

  describe("formatLogFileRawData", () => {
    it("should take a string and return an array of type {ip, dateTimeStamp, url}", () => {
      const rawLogFileMockData = `
        177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"
        168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
        168.41.191.41 - - [11/Jul/2018:17:41:30 +0200] "GET /this/page/does/not/exist/ HTTP/1.1" 404 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
        `;

      const processedLogData =
        logFileUtils.formatLogFileRawData(rawLogFileMockData);

      expect(processedLogData).toStrictEqual([
        {
          ip: "177.71.128.21",
          dateTimeStamp: 1531254088000,
          url: "GET /intranet-analytics/ HTTP/1.1",
        },
        {
          ip: "168.41.191.40",
          dateTimeStamp: 1531123890000,
          url: "GET http://example.net/faq/ HTTP/1.1",
        },
        {
          ip: "168.41.191.41",
          dateTimeStamp: 1531323690000,
          url: "GET /this/page/does/not/exist/ HTTP/1.1",
        },
      ]);
    });

    it("should return empty array for an empty string", () => {
      const rawLogFileMockData = "";
      const processedLogData =
        logFileUtils.formatLogFileRawData(rawLogFileMockData);
      expect(processedLogData).toStrictEqual([]);
    });
  });
});
