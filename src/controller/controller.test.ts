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

      // console.log(result);
      expect(fileReaderUtilsSpyObject.readFile).toBeCalled();
      expect(logfileUtilsFileSpyObject.uniqueIpAddresses).toBeCalled();
      expect(logfileUtilsFileSpyObject.threeMostVisitedUrls).toBeCalled();
      expect(logfileUtilsFileSpyObject.threeMostActiveIpAddresses).toBeCalled();
      expect(logfileUtilsFileSpyObject.formatLogFileRawData).toBeCalled();

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

    // test('should 200 with username from session if session data is set', async () => {
    //   const req = mockRequest({ username: 'hugo' });
    //   const res = mockResponse();
    //   await checkAuth(req, res);
    //   expect(res.status).toHaveBeenCalledWith(200);
    //   expect(res.json).toHaveBeenCalledWith({ username: 'hugo' });
    // });

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

// describe('logInfo controller', () => {
//     const format = '"177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7""'

//     it('Log file should not be empty', async () => {
//         // arrange
//         // act
//         // assert
//         // expect(body).toContain('customer should not be empty');
//     });

//     it(`Log file should be in the correct format ${format}`, async () => {
//     });

//     it('getUniqueIpAddress should give uniqueIpAddresses', async () => {
//     });

//     it('getThreeMostVisitedIpAddress should give three most visited Ip Addresses', async () => {
//     });

//     it('getThreeMostActiveIpAddresses should give three most active Ip Addresses', async () => {
//     });

//     it('getUniqueIpAddress should return a promise', async () => {
//     });

//     it('getThreeMostVisitedIpAddress should return a promise', async () => {
//     });

//     it('getThreeMostActiveIpAddresses should return a promise', async () => {
//     });

// });
