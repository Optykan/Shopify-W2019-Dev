const Model = require('./../models/Model');

let statuses = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	NOT_FOUND: 404,
	CONFLICT: 409,
	SERVER_ERROR: 500
};

class ResponseWrapper{
	constructor(res, data, message, status){
		if(data instanceof Error){
			message = data.message;
			if(data instanceof TypeError){
				status = statuses.BAD_REQUEST;
			} else {
				status = data.status || statuses.SERVER_ERROR;
			}
			data = JSON.stringify(data)
		}
		this.res = res;
		this.data = data || { empty: true };
		this.message = message || "No message";
		this.status = status || statuses.OK;
	}

	static get STATUS () {
		return statuses;
	}

	makeResponseObject(){
		return {
			message: this.message,
			status: this.status,
			data: this.data,
			ok: 200 <= this.status && this.status < 400
		}
	}

	send(){
		if(this.status === statuses.CREATED && this.data.id){
			// RFC7231-compliant
			this.res.set('Location', this.data.id)
		}
		this.res.status(this.status);
		this.res.json(this.makeResponseObject())
	}
}

module.exports = ResponseWrapper;