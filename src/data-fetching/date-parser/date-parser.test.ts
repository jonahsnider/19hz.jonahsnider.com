import assert from 'node:assert/strict';
import test from 'node:test';
import { parseEventDate } from './date-parser';

const currentYear = new Date().getFullYear();

type TestCase = {
	input: string;
	region: string;

	expected: {
		start?: string;
		end?: string;
		timezone: string;
	};
};

function assertTestCase(testCase: TestCase) {
	const { input: time, region, expected } = testCase;

	const output = parseEventDate(time, region);

	assert.equal(output?.start.toLocaleString(undefined, { timeZone: testCase.expected.timezone }), expected.start);
	assert.equal(output?.end?.toLocaleString(undefined, { timeZone: testCase.expected.timezone }), expected.end);
}

test('parses dates with start and end time', () => {
	assertTestCase({
		input: 'Mon: Oct 21 (7:30pm-8:45pm)',
		region: 'BayArea',
		expected: {
			timezone: 'America/Los_Angeles',
			start: `10/21/${currentYear}, 7:30:00 PM`,
			end: `10/21/${currentYear}, 8:45:00 PM`,
		},
	});
});

test('parses dates without end time', () => {
	assertTestCase({
		input: 'Mon: Oct 21 (8pm)',
		region: 'BayArea',
		expected: {
			timezone: 'America/Los_Angeles',
			start: `10/21/${currentYear}, 8:00:00 PM`,
			end: undefined,
		},
	});
	assertTestCase({
		input: 'Mon: Oct 21 (8:30pm)',
		region: 'BayArea',
		expected: {
			timezone: 'America/Los_Angeles',
			start: `10/21/${currentYear}, 8:30:00 PM`,
			end: undefined,
		},
	});
});

test('parses multiple dates', () => {
	assertTestCase({
		input: 'Fri: Oct 25-Sun: Oct 27 (Fri: 6pm-Sun: 1am)',
		region: 'BayArea',
		expected: {
			timezone: 'America/Los_Angeles',
			start: `10/25/${currentYear}, 6:00:00 PM`,
			end: `10/27/${currentYear}, 1:00:00 AM`,
		},
	});

	assertTestCase({
		input: 'Fri: Nov 29-Sun: Dec 1 (8pm-3:15am)',
		region: 'BayArea',
		expected: {
			timezone: 'America/Los_Angeles',
			start: `11/29/${currentYear}, 8:00:00 PM`,
			end: `12/1/${currentYear}, 3:15:00 AM`,
		},
	});
});

test('parses dates in different timezones', () => {
	assertTestCase({
		input: 'Fri: Oct 25-Sun: Oct 27 (Fri: 6pm-Sun: 1am)',
		region: 'Texas',
		expected: {
			timezone: 'America/Denver',
			start: `10/25/${currentYear}, 6:00:00 PM`,
			end: `10/27/${currentYear}, 1:00:00 AM`,
		},
	});
});
