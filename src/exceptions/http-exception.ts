import { AppException } from './app-exception';

export class HTTPError extends AppException {
	public response: Response;
	public request: Request;

	constructor(response: Response, request: Request) {
		const code = response.status || response.status === 0 ? response.status : '';
		const title = response.statusText || '';
		const status = `${code} ${title}`.trim();
		const reason = status ? `status code ${status}` : 'an unknown error';

		super(`Request failed with ${reason}: ${request.method} ${request.url}`);

		this.name = 'HTTPError';
		this.response = response;
		this.request = request;
	}
}
