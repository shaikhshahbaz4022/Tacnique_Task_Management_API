const expresswinston = require("express-winston");
const winston = require("winston");

const loggerMiddleware = expresswinston.logger({
  transports: [
    new winston.transports.File({
      level: "info",
      colorize: true,
      filename: "./Helpers/logsinfo.log",
    }),
  ],
  format: winston.format.prettyPrint(),
  statusLevels: true,
});

module.exports = { loggerMiddleware };
