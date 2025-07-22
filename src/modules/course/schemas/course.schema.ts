import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
	@Prop({ required: true, unique: true, trim: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	startDate: Date;

	@Prop({ required: true })
	endDate: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
