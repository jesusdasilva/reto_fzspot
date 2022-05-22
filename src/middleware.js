import { HTTP_STATUS_CODES } from "./config.js";

// Response Format
export function responseFormat(_, res) {
	const { httpStatus, data = {}, message } = res.locals

	res.status(httpStatus).json({ data, message })
}

// Error Handler
export function errorHandler(err, req, res, next) {	
	console.log(err)
	
	res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
		data: {},
		message: { text: "Algo salió mal!", type: "error" }
	});
}