import { HTTP_STATUS_CODES } from "./config.js";

// RESPONSE FORMAT
export function responseFormat(_, res) {
	const { httpStatus, data = {}, message } = res.locals

	res.status(httpStatus).json({ data, message })
}

// ERROR HANDLER
export function errorHandler(err, req, res, next) {	
	console.log(err)
	
	res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
		data: {},
		message: { text: "Algo salió mal!", type: "error" }
	});
}