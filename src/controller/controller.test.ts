import fileReaderUtils from "../utils/fileReaderUtils";
import logFileUtils from "../utils/logFileUtils";
import controller from "../controller/logInfo";

describe("logInfo controller", () => {
  describe("getLogFileInfo", () => {
    let logfileUtilsFileSpyObject: any;
    let fileReaderUtilsSpyObject: any;

    beforeEach(() => {
      logfileUtilsFileSpyObject = {
        uniqueIpAddresses: jest.spyOn(logFileUtils, "getUniqueIpAddress"),
        threeMostVisitedUrls: jest.spyOn(
          logFileUtils,
          "getThreeMostVisitedUrls"
        ),
        threeMostActiveIpAddresses: jest.spyOn(
          logFileUtils,
          "getThreeMostActiveIpAddresses"
        ),
        formatLogFileRawData: jest.spyOn(logFileUtils, "formatLogFileRawData"),
        logFilePath: jest.spyOn(logFileUtils, "getLogFilePath"),
      };
      fileReaderUtilsSpyObject = {
        readFile: jest.spyOn(fileReaderUtils, "readFile"),
      };
    });

    it("should read log file and return log file info", async () => {
      logfileUtilsFileSpyObject.uniqueIpAddresses.mockImplementation(
        () =>
          new Promise((resolve, _reject) => {
            resolve([]);
          })
      );

      logfileUtilsFileSpyObject.threeMostVisitedIpAddress.mockImplementation(
        () =>
          new Promise((resolve, _reject) => {
            resolve([]);
          })
      );

      logfileUtilsFileSpyObject.threeMostActiveIpAddresses.mockImplementation(
        () =>
          new Promise((resolve, _reject) => {
            resolve([]);
          })
      );
      logfileUtilsFileSpyObject.formatLogFileRawData.mockImplementation(
        () => ""
      );

      fileReaderUtilsSpyObject.readFile.mockImplementation(
        () =>
          new Promise((resolve, _reject) => {
            resolve("");
          })
      );

      const result = await controller.getLogFileInfo({} as any, {} as any);
      console.log(result);
      expect(fileReaderUtilsSpyObject.readFile).toBeCalled();
      expect(result).toBe({
        uniqueIpAddresses: [],
        mostActiveIpAddresses: [],
        mostVisitedIpAddresses: [],
      });
    });

    // it("should calculate uniqueIpAddresses from log file", async () => {});

    // it("should give three most visited Ip Addresses from log file", async () => {});

    // it("should give three most active Ip Addresses from log file", async () => {
    //   //   const somethingSpy = jest.spyOn(
    //   //     logFileUtils,
    //   //     "getThreeMostActiveIpAddresses"
    //   //   );
    //   //   myObj.doSomething();
    //   //   expect(somethingSpy).toBeCalled();
    // });
  });
});
