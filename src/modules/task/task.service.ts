import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskDocument } from "./schemas/task.schema";
import { FilterQuery, Model } from "mongoose";
import { IResponse } from "../../common/types";
import { JwtPayload } from "../auth/interface";
import { QueryTaskDto } from "./dto/queryTask.dto";

@Injectable()
export class TaskService {
	constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

	async create(createTaskDto: CreateTaskDto, createdBy: string): Promise<IResponse<Task>> {
		const newTask = await this.taskModel.create({ ...createTaskDto, createdBy });
		return {
			message: "Successfully created!",
			statusCode: 201,
			data: newTask,
		};
	}

	async findAll(userId: string, queryDto: QueryTaskDto) {
		const query: FilterQuery<TaskDocument> = {};

		if (queryDto.title) {
			query.title = { $regex: queryDto.title, $options: "i" };
		}

		if (queryDto.status) {
			query.status = queryDto.status;
		}

		if (queryDto.dueDate) {
			const startOfDay = new Date(queryDto.dueDate);
			startOfDay.setUTCHours(0, 0, 0, 0);

			const endOfDay = new Date(queryDto.dueDate);
			endOfDay.setUTCHours(23, 59, 59, 999);

			query.dueDate = {
				$gte: startOfDay,
				$lte: endOfDay,
			};
		}

		const data = await this.taskModel.find(query).exec();

		return {
			data,
			message: "List of all tasks",
			statusCode: 200,
		};
	}

	async findOne(id: string, userId: string) {
		const task = await this.taskModel.findById(id).where("createdBy").equals(userId);
		return {
			message: "get one task!",
			statusCode: 200,
			data: task,
		};
	}

	async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
		const updatedTask = await this.taskModel
			.findOneAndUpdate({ _id: id, createdBy: userId }, updateTaskDto, { new: true })
			.exec();

		if (!updatedTask) {
			throw new NotFoundException(`Task with ID "${id}" not found.`);
		}

		return {
			message: "Updated successfully",
			statusCode: 200,
			data: updateTaskDto,
		};
	}

	async remove(id: string, userId: string): Promise<Task> {
		const deletedTask = await this.taskModel
			.findOneAndDelete({
				_id: id,
				createdBy: userId,
			})
			.exec();

		if (!deletedTask) {
			throw new NotFoundException(`Task with ID "${id}" not found.`);
		}

		return deletedTask;
	}
}
