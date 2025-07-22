import * as dotenv from "dotenv";

import { Logger } from "@nestjs/common";

dotenv.config();

export type ConfigType = {
	PORT: number;
	DB_URL: string;
	ACCESS_TOKEN_LIFE_TIME: string;
	REFRESH_TOKEN_LIFE_TIME: string;
	REFRESH_TOKEN_SECRET_KEY: string;
	ACCESS_TOKEN_SECRET_KEY: string;
};

const requiredVariables = [
	"PORT",
	"DB_URL",
	"ACCESS_TOKEN_LIFE_TIME",
	"REFRESH_TOKEN_LIFE_TIME",
	"ACCESS_TOKEN_SECRET_KEY",
	"REFRESH_TOKEN_SECRET_KEY",
];

const missingVariables = requiredVariables.filter((variable) => {
	const value = process.env[variable];
	return !value || value.trim() === "";
});

if (missingVariables.length > 0) {
	Logger.error(`Missing or empty required environment variables: ${missingVariables.join(", ")}`);
	process.exit(1);
}

export const config: ConfigType = {
	PORT: parseInt(process.env.PORT as string, 10),
	DB_URL: process.env.DB_URL as string,
	ACCESS_TOKEN_LIFE_TIME: process.env.ACCESS_TOKEN_LIFE_TIME as string,
	REFRESH_TOKEN_LIFE_TIME: process.env.REFRESH_TOKEN_LIFE_TIME as string,
	ACCESS_TOKEN_SECRET_KEY: process.env.ACCESS_TOKEN_SECRET_KEY as string,
	REFRESH_TOKEN_SECRET_KEY: process.env.REFRESH_TOKEN_SECRET_KEY as string,
};
