export class AppException extends Error {
	readonly status: number;

	constructor(message: string, status = 500, options?: ErrorOptions) {
		super(message, options);
		this.name = 'AppException';
		this.status = status;
	}
}
