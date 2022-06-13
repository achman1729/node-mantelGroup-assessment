import { Request, Response } from "express";
import fileReaderUtils from "../utils/fileReaderUtils";
import logFileUtils, { formatLogFileModel } from "../utils/logFileUtils";

const getLogFileInfo = async (_req: Request, res: Response) => {
  try {
    const fileStringData = await fileReaderUtils
      .readFile(logFileUtils.getLogFilePath())
      .then((result) => {
        return result;
      })
      .catch((errorMessage) => {
        throw errorMessage;
      });

    const formattedLogFileData: formatLogFileModel[] =
      logFileUtils.formatLogFileRawData(fileStringData);

    const result: any = await Promise.all([
      logFileUtils.getUniqueIpAddress(formattedLogFileData),
      logFileUtils.getThreeMostVisitedIpAddress(formattedLogFileData),
      logFileUtils.getThreeMostActiveIpAddresses(formattedLogFileData),
    ])
      .then(([threeMostVisited, threeMostActive, uniqueIps]) => {
        return {
          uniqueIpAddresses: uniqueIps,
          mostActiveIpAddresses: threeMostVisited,
          mostVisitedIpAddresses: threeMostActive,
        };
      })
      .catch((errorMessage) => {
        return {
          errorMessage,
        };
      });

    if (result?.errorMessage) {
      throw result.errorMessage;
    }

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(404).send({ errorMessage: { Error: `${error}` } });
  }
};

export default { getLogFileInfo };