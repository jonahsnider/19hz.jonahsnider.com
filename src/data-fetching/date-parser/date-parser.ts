import { captureException } from '@sentry/nextjs';
import { parse } from 'chrono-node';
import { identifyDateFormat } from './heuristic';
import { getTimezoneForRegion } from './timezone';

export function parseEventDate(
	eventDate: string,
	region: string,
):
	| undefined
	| {
			raw: string;
			start: Date;
			end: Date | undefined;
	  } {
	const identified = identifyDateFormat(eventDate);

	if (!identified) {
		captureException(new RangeError(`Unable to normalize event date: ${eventDate}`));
		return undefined;
	}

	// Replace characters that confuse chrono and add timezone base on what region the event is in
	const normalized = `${identified} ${getTimezoneForRegion(region)}`;

	const [parsed] = parse(normalized);

	if (!parsed) {
		captureException(new RangeError(`Unable to parse event date after normalize: ${eventDate}`));
		return undefined;
	}

	return {
		raw: eventDate,
		start: parsed.start.date(),
		end: parsed.end?.date(),
	};
}
