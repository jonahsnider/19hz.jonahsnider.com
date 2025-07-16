import { load } from 'cheerio';
import { parseEventDate } from './date-parser/date-parser';
import type { EventListing } from './event-listing';

const EVENT_TITLE_AND_VENUE_SEPARATOR = ' @ ';

export function parseEventListingHtml(html: string, region: string): EventListing[] {
	const dom = load(html);

	// The first table is non-repeating events
	const eventsTableBody = dom('table>tbody').first();

	return eventsTableBody
		.children('tr')
		.map((_index, row): EventListing | undefined => {
			const [rawDate, rawTitleAndVenue, rawTags, rawPriceAndAge, rawOrganizers, rawLink] = row.children;

			const dateString = dom(rawDate).text();
			const date = parseEventDate(dateString, region);

			if (!date) {
				return undefined;
			}

			const titleAndVenue = dom(rawTitleAndVenue);
			const title = titleAndVenue.children('a');
			const titleUrl = title.attr('href');
			const titleContent = title.text();
			const rawVenue = titleAndVenue.contents().last().text();

			if (!rawVenue.startsWith(EVENT_TITLE_AND_VENUE_SEPARATOR)) {
				throw new TypeError('Event title & venue did not match expected format');
			}

			const venue = rawVenue.slice(EVENT_TITLE_AND_VENUE_SEPARATOR.length);

			if (titleUrl === undefined) {
				throw new TypeError('Event title was missing a URL');
			}

			const tags = dom(rawTags).text();

			const priceAndAge = dom(rawPriceAndAge).text();

			const organizers = dom(rawOrganizers).text();

			const link = dom(rawLink).children('a');
			const linkLabel = link.text();
			const linkUrl = link.attr('href');

			return {
				date,
				link:
					linkLabel !== '' && linkUrl
						? {
								label: linkLabel,
								url: linkUrl,
							}
						: undefined,
				organizers: organizers === '' ? undefined : organizers,
				priceAndAge: priceAndAge === '' ? undefined : priceAndAge,
				tags: tags.split(',').map((tag) => tag.trim()),
				title: {
					content: titleContent,
					url: titleUrl,
				},
				venue,
			};
		})
		.toArray()
		.filter((value) => value !== undefined);
}
