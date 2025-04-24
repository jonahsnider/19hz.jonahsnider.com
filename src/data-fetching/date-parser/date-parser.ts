import { captureException } from '@sentry/nextjs';
import { parse } from 'chrono-node';
import { identifyDateFormat } from './heuristic';
import { getTimezoneForRegion } from './timezone';

export function parseEventDate(
	rawDate: string,
	region: string,
	now?: Date,
):
	| undefined
	| {
			raw: string;
			start: Date;
			end: Date | undefined;
	  } {
	const identified = identifyDateFormat(rawDate);

	if (!identified) {
		captureException(new RangeError(`Unable to normalize event date: ${rawDate}`));
		return undefined;
	}

	// Replace characters that confuse chrono and add timezone base on what region the event is in
	const normalized = `${identified} ${getTimezoneForRegion(region)}`;

	const [parsed] = parse(normalized, now);

	if (!parsed) {
		captureException(new RangeError(`Unable to parse event date after normalize: ${rawDate}`));
		return undefined;
	}

	return {
		raw: rawDate,
		start: parsed.start.date(),
		end: parsed.end?.date(),
	};
}
