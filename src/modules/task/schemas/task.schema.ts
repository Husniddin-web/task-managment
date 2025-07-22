import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { TaskStatus } from "../../../common/enums/taskStatus.enum";

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
	@Prop({ required: true, trim: true })
	title: string;

	@Prop({ required: true })
	description: string;

	@Prop({
		required: true,
		enum: TaskStatus,
		default: TaskStatus.PENDING,
	})
	status: TaskStatus;

	@Prop({ required: true })
	dueDate: Date;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: "User", required: true })
	createdBy: MongooseSchema.Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
