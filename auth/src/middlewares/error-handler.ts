import {NextFunction, Request, Response} from "express";
import {RequestValidationError} from "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof RequestValidationError) {
		return res.status(err.statusCode).send({errors: err.serializeErrors()})
	}

	if (err instanceof DatabaseConnectionError) {
		const formattedError = { errors: [{message: err.serializeErrors()}] }
		return res.status(err.statusCode).send(formattedError)
	}

	return res.status(400).send({errors: [{message: 'Something went wrong!'}]})

}