import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ValidateObjectIdPipe } from "../../common/pipes/validate-object-id.pipe";
import { GetCurrentUser } from "../../common/decorators/get-current-user.decorator";
import { Auth } from "../auth/decorators/auth.decorator";
import { JwtPayload } from "../auth/interface";
import { QueryTaskDto } from "./dto/queryTask.dto";

@ApiTags("Task")
@Auth()
@Controller("task")
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@Post()
	@ApiOperation({ summary: "Create a new task" })
	@ApiResponse({ status: 201, description: "Task successfully created" })
	@ApiResponse({ status: 400, description: "Validation failed" })
	create(@Body() createTaskDto: CreateTaskDto, @GetCurrentUser("id") id: string) {
		return this.taskService.create(createTaskDto, id);
	}

	@Get()
	@ApiOperation({ summary: "Get all tasks with optional filters" })
	@ApiResponse({ status: 200, description: "List of tasks returned" })
	findAll(@GetCurrentUser("id") id: string, @Query() queryTaskDto: QueryTaskDto) {
		return this.taskService.findAll(id, queryTaskDto);
	}
	@Get(":id")
	@ApiOperation({ summary: "Get a task by ID" })
	@ApiParam({ name: "id", type: String, description: "Task ID" })
	@ApiResponse({ status: 200, description: "Task found" })
	@ApiResponse({ status: 404, description: "Task not found" })
	findOne(@Param("id", ValidateObjectIdPipe) id: string, @GetCurrentUser("id") userId: string) {
		return this.taskService.findOne(id, userId);
	}

	@Patch(":id")
	@ApiOperation({ summary: "Update a task by ID" })
	@ApiParam({ name: "id", type: String, description: "Task ID" })
	@ApiResponse({ status: 200, description: "Task successfully updated" })
	@ApiResponse({ status: 404, description: "Task not found" })
	update(
		@Param("id", ValidateObjectIdPipe) id: string,
		@Body() updateTaskDto: UpdateTaskDto,
		@GetCurrentUser("id") userId: string,
	) {
		return this.taskService.update(id, updateTaskDto, userId);
	}

	@Delete(":id")
	@ApiOperation({ summary: "Delete a task by ID" })
	@ApiParam({ name: "id", type: String, description: "Task ID" })
	@ApiResponse({ status: 200, description: "Task successfully deleted" })
	@ApiResponse({ status: 404, description: "Task not found" })
	remove(@Param("id", ValidateObjectIdPipe) id: string, @GetCurrentUser("id") userId: string) {
		return this.taskService.remove(id, userId);
	}
}
