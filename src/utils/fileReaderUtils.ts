import * as fs from "node:fs/promises";

interface FileData {
  fileData: string;
  errorMessage?: never;
}
interface fileDataErrorType {
  fileData?: never;
  errorMessage: string;
}

export type FileDataType = FileData | fileDataErrorType;

const readFile = async (path: string): Promise<string> => {
  const data: FileDataType = await fs
    .readFile(path)
    .then((fileData: Buffer) => {
      return { fileData: fileData.toString() };
    })
    .catch(() => {
      return { errorMessage: "could not read the file" };
    });

  return new Promise((resolve, reject) => {
    if (data.fileData) {
      resolve(data.fileData);
    } else {
      reject(data.errorMessage);
    }
  });
};

const fileReaderUtils = {
  readFile,
};
export default fileReaderUtils;
