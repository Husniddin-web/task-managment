import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import * as winston from "winston";
import "winston-daily-rotate-file";

const isProduction = process.env.NODE_ENV === "production";
// const isProduction = true;

const commonFormats = [
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  // winston.format.splat(),
];

const developmentTransports = [
  new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
      ...commonFormats,
      nestWinstonModuleUtilities.format.nestLike("Dermation shop", {
        colors: true,
      })
    ),
  }),
];

const productionTransports = [
  new winston.transports.Console({
    level: "info",
    format: winston.format.combine(...commonFormats, winston.format.json()),
  }),

  new winston.transports.DailyRotateFile({
    level: "info", // 'info' va undan yuqori darajadagi loglar
    filename: "logs/application-%DATE%.log", // Fayl nomi shabloni
    datePattern: "YYYY-MM-DD", // Har kuni yangi fayl ochiladi
    zippedArchive: true, // Eski log fayllarini arxivlash (zip qilish)
    maxSize: "20m", // Har bir faylning maksimal hajmi (20 MB)
    maxFiles: "14d", // 14 kunlik loglarni saqlash, eskilarini o'chirish
    format: winston.format.combine(...commonFormats, winston.format.json()),
  }),
  new winston.transports.File({
    level: "error",
    filename: "logs/error.log",
    format: winston.format.combine(...commonFormats, winston.format.json()),
  }),
];

export const winstonConfig = {
  transports: isProduction ? productionTransports : developmentTransports,

  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
  exitOnError: false,
};
