import { NextFunction, Response, Request } from "express";

export class ApiError extends Error {
	statusCode: number;
	message: string;
	constructor(message: any, statusCode: number) {
		super();
		this.statusCode = statusCode;
		this.message = message;
	}
}

export const handleError = (
	err: ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { statusCode, message } = err;
	res.status(statusCode).json({
		status: "error",
		message,
	});
};
