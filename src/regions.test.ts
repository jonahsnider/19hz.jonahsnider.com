import assert from 'node:assert/strict';
import test from 'node:test';
import { load } from 'cheerio';
import { REGIONS } from './regions';

const REGIONS_URL = 'https://19hz.info/';
const REGION_PATH_PATTERN = /^\/eventlisting_([A-Za-z0-9_-]+)\.php$/;

test('includes every region listed by 19hz.info', { timeout: 10_000 }, async () => {
	const response = await fetch(REGIONS_URL, {
		headers: { 'user-agent': '19hz.jonahsnider.com integration test' },
	});
	assert.equal(response.status, 200, `Failed to fetch ${REGIONS_URL}`);

	const $ = load(await response.text());
	const missingRegions = new Set<string>();

	$('a[href]').each((_index, element) => {
		const href = $(element).attr('href');
		const region = href && REGION_PATH_PATTERN.exec(new URL(href, REGIONS_URL).pathname)?.[1];

		if (region && !(region in REGIONS)) {
			missingRegions.add(region);
		}
	});

	assert.deepEqual([...missingRegions].sort(), [], 'Add the missing 19hz.info regions to REGIONS');
});
