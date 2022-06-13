import path from "path";

export const config = () => {
  const logFilePath = path.join(__dirname, "programming-task-example-data.log");
  return { logFilePath: logFilePath };
};
