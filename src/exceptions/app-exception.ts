import { type BaseException, TO_RESPONSE } from 'next-api-utils';
import { NextResponse } from 'next/server';

export class AppException extends Error implements BaseException {
	[TO_RESPONSE](): NextResponse {
		return NextResponse.json({
			message: this.message,
		});
	}
}
