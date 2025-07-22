import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Role } from "../../../common/enums";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true, trim: true })
	name: string;

	@Prop({ required: true, unique: true, trim: true, lowercase: true })
	email: string;

	@Prop({ required: true, select: false })
	password: string;

	@Prop({ required: true, enum: Role, default: Role.USER })
	role: Role;

	@Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Course" }] })
	registeredCourses: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
