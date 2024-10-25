/**
 * Thu: Oct 24 (8pm)
 * Fri: Jan 10, 2025 (8pm)
 * Sat: Oct 26 (9:30pm)
 */
const SINGLE_DAY_START_TIME_REGEX =
	/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun): (?<date>(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}(?:, \d{4})?) \((?<startTime>\d{1,2}(?::\d{2})?[ap]m)\)$/i; /**
 * Thu: Oct 24 (8pm-12am)
 * Fri: Jan 17, 2025 (9pm-1am)
 * Fri: Oct 25 (4:30pm-9:30pm)
 */
const SINGLE_DAY_START_END_TIME_REGEX =
	/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun): (?<date>(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}(?:, \d{4})?) \((?<startTime>\d{1,2}(?::\d{2})?[ap]m)-(?<endTime>\d{1,2}(?::\d{2})?[ap]m)\)$/i;
/** Fri: Oct 25-Sun: Oct 27 (Fri: 6pm-Sun: 1am) */
const MULTI_DAY_START_END_TIME_REGEX =
	/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun): (?<startDate>(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}(?:, \d{4})?)-(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun): (?<endDate>(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2}(?:, \d{4})?) \((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun): (?<startTime>\d{1,2}(?::\d{2})?[ap]m)-(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun): (?<endTime>\d{1,2}(?::\d{2})?[ap]m)\)$/i;

export function identifyDateFormat(dateString: string): string | undefined {
	const singleDayMatched = SINGLE_DAY_START_TIME_REGEX.exec(dateString);

	if (singleDayMatched) {
		if (!singleDayMatched.groups) {
			throw new TypeError(`No named capturing groups were extracted from single day date string: ${dateString}`);
		}

		return `${singleDayMatched.groups.date} ${singleDayMatched.groups.startTime}`;
	}

	const singleDayEndTimeMatched = SINGLE_DAY_START_END_TIME_REGEX.exec(dateString);

	if (singleDayEndTimeMatched) {
		if (!singleDayEndTimeMatched.groups) {
			throw new TypeError(
				`No named capturing groups were extracted from single day end time date string: ${dateString}`,
			);
		}

		return `${singleDayEndTimeMatched.groups.date} ${singleDayEndTimeMatched.groups.startTime} - ${singleDayEndTimeMatched.groups.endTime}`;
	}

	const multiDayMatched = MULTI_DAY_START_END_TIME_REGEX.exec(dateString);

	if (multiDayMatched) {
		if (!multiDayMatched.groups) {
			throw new TypeError(`No named capturing groups were extracted from multi day date string: ${dateString}`);
		}

		return `${multiDayMatched.groups.startDate} ${multiDayMatched.groups.startTime} - ${multiDayMatched.groups.endDate} ${multiDayMatched.groups.endTime}`;
	}

	return undefined;
}
