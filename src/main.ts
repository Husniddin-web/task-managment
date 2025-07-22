import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/lib/filter/all.exception.filter";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "./config";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const httpAdapterHost = app.get(HttpAdapterHost);

	const logger = app.get(WINSTON_MODULE_PROVIDER);

	app.useLogger(logger);
	app.use(cookieParser());

	app.setGlobalPrefix("api");

	// global execption filter

	app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

	// enable cors domain kerakli domain qoshiladi

	app.enableCors("*");

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true, // DTO ichida ko‘rsatilmagan fieldlarni avtomatik olib tashlaydi
			forbidNonWhitelisted: true, // Agar DTO da yo‘q bo‘lsa, xato beradi
			transform: true, // Payload'ni DTO ga avtomatik transform qiladi
		}),
	);

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Task Management Student vs Courses")
		.setDescription("API documentation")
		.setVersion("1.0")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup("api/docs", app, document);

	await app.listen(config.PORT, () => {
		logger.info(`Server running on  ${config.PORT} port`);
	});
}

void bootstrap();
