import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { hashed } from "../../common/lib/bcrypt";
import { Role } from "../../common/enums";

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(createUserDto: CreateUserDto) {
		return this.userModel.create(createUserDto);
	}

	async onApplicationBootstrap() {
		const usersToSeed = [
			{
				name: "adminjon",
				email: "admin@gmail.com",
				password: "admin_mock",
				role: Role.ADMIN,
			},
			{
				name: "Regular User",
				email: "user@gmail.com",
				password: "user123",
				role: Role.USER,
			},
			{
				name: "Student User",
				email: "student@gmail.com",
				password: "student123",
				role: Role.STUDENT,
			},
		];

		for (const user of usersToSeed) {
			const existing = await this.userModel.findOne({ email: user.email });
			if (!existing) {
				await this.userModel.create({
					name: user.name,
					email: user.email,
					password: await hashed(user.password),
					role: user.role,
				});
				console.log(`✅ Created ${user.role} - ${user.email}`);
			} else {
				console.log(`ℹ️ ${user.email} already exists, skipping...`);
			}
		}
	}

	findByEmail(email: string) {
		return this.userModel.findOne({ email }).select("+password");
	}

	findOne(id: number) {
		return this.userModel.findById(id);
	}
}
