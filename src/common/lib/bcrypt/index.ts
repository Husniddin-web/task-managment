const saltOrRounds = 10;
import * as bcrypt from "bcrypt";

export async function hashed(data: string): Promise<string> {
	return await bcrypt.hash(data, saltOrRounds);
}
export async function compare(data: string, hashedData: string): Promise<boolean> {
	return await bcrypt.compare(data, hashedData);
}
