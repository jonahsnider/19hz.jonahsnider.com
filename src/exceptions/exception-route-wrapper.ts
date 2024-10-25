import { ExceptionWrapper } from 'next-api-utils';
import { AppException } from './app-exception';

function isException(maybeException: unknown): maybeException is AppException {
	return maybeException instanceof AppException;
}

export const exceptionRouteWrapper = new ExceptionWrapper(isException);
