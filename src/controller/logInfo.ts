import { Request, Response } from "express";
import { fileReaderUtils, logFileUtils, formatLogFileModel } from "../utils";

interface ResultData {
  numberOfUniqueIpAddresses: number;
  threeMostVisitedUrls: string[];
  threeMostActiveIpAddresses: string[];
  errorMessage?: never;
}

interface ErrorMessage {
  errorMessage: string;
  numberOfUniqueIpAddresses?: never;
  threeMostVisitedUrls?: never;
  threeMostActiveIpAddresses?: never;
}

type Result = ResultData | ErrorMessage;

const getLogFileInfo = async (_req: Request, res: Response) => {
  try {
    const fileStringData = await fileReaderUtils
      .readFile(logFileUtils.getLogFilePath())
      .then((result) => {
        return result;
      })
      .catch((errorMessage: string) => {
        throw errorMessage;
      });

    const formattedLogFileData: formatLogFileModel[] =
      logFileUtils.formatLogFileRawData(fileStringData);

    const result: Result = await Promise.all([
      logFileUtils.getNumberOfUniqueIpAddress(formattedLogFileData),
      logFileUtils.getThreeMostVisitedUrls(formattedLogFileData),
      logFileUtils.getThreeMostActiveIpAddresses(formattedLogFileData),
    ])
      .then(([uniqueIps, threeMostVisited, threeMostActive]) => {
        return {
          numberOfUniqueIpAddresses: uniqueIps,
          threeMostVisitedUrls: threeMostVisited,
          threeMostActiveIpAddresses: threeMostActive,
        };
      })
      .catch((errorMessage: string) => {
        return {
          errorMessage,
        };
      });

    if (result?.errorMessage) {
      throw result.errorMessage;
    }

    return res.status(200).send(result);
  } catch (error: any) {
    return res.status(404).send({ errorMessage: { Error: error } });
  }
};

export default getLogFileInfo;
