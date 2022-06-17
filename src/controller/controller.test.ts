import { fileReaderUtils, logFileUtils } from "../utils";
import getLogFileInfo from "../controller";

const mockRequest = (sessionData: any, body: any): any => ({
  session: { data: sessionData },
  body,
});

const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("logInfo controller", () => {
  describe("getLogFileInfo", () => {
    let logfileUtilsFileSpyObject: any;
    let fileReaderUtilsSpyObject: any;

    beforeEach(() => {
      logfileUtilsFileSpyObject = {
        uniqueIpAddresses: jest.spyOn(
          logFileUtils,
          "getNumberOfUniqueIpAddress"
        ),
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
            resolve(11);
          })
      );

      logfileUtilsFileSpyObject.threeMostVisitedUrls.mockImplementation(
        () =>
          new Promise((resolve, _reject) => {
            resolve([
              "GET /docs/manage-websites/ HTTP/1.1",
              "GET /intranet-analytics/ HTTP/1.1",
              "GET http://example.net/faq/ HTTP/1.1",
            ]);
          })
      );

      logfileUtilsFileSpyObject.threeMostActiveIpAddresses.mockImplementation(
        () =>
          new Promise((resolve, _reject) => {
            resolve(["168.41.191.43", "72.44.32.11", "168.41.191.41"]);
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

      const req = mockRequest({} as any, {} as any);
      const res = mockResponse();
      await getLogFileInfo(req, res);

      expect(fileReaderUtilsSpyObject.readFile).toBeCalled();
      expect(logfileUtilsFileSpyObject.formatLogFileRawData).toBeCalled();
      expect(logfileUtilsFileSpyObject.uniqueIpAddresses).toBeCalled();
      expect(logfileUtilsFileSpyObject.threeMostVisitedUrls).toBeCalled();
      expect(logfileUtilsFileSpyObject.threeMostActiveIpAddresses).toBeCalled();

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        numberOfUniqueIpAddresses: 11,
        threeMostActiveIpAddresses: [
          "168.41.191.43",
          "72.44.32.11",
          "168.41.191.41",
        ],
        threeMostVisitedUrls: [
          "GET /docs/manage-websites/ HTTP/1.1",
          "GET /intranet-analytics/ HTTP/1.1",
          "GET http://example.net/faq/ HTTP/1.1",
        ],
      });
    });
  });
});
