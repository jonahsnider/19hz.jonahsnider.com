import type { EventListing } from '@/data-fetching/event-listing';
import fnv1a from '@sindresorhus/fnv1a';
import { format } from 'date-fns';
import { create, fragment } from 'xmlbuilder2';

export function createFeed(eventListings: EventListing[], region: string): string {
	return create({ version: '1.0', encoding: 'utf-8' }).import(createAppRss(eventListings, region)).end();
}

function createAppRss(eventListings: EventListing[], region: string) {
	return fragment()
		.ele('rss')
		.att('version', '2.0')
		.att('xmlns:atom', 'http://www.w3.org/2005/Atom')
		.import(createAppChannel(eventListings, region));
}

function createAppChannel(eventListings: EventListing[], region: string) {
	return fragment()
		.ele('channel')
		.import(createChannelMetadata(region))
		.import(eventListings.reduce((items, eventListing) => items.import(createChannelItem(eventListing)), fragment()));
}

function createChannelMetadata(region: string) {
	const metadataFragment = fragment();

	metadataFragment.ele('title').txt('19hz.info');
	metadataFragment.ele('link').txt('https://19hz.info');
	metadataFragment.ele('description').txt('Electronic music calendars');
	metadataFragment.ele('language').txt('en-us');
	metadataFragment.ele('docs').txt('https://www.rssboard.org/rss-specification');
	metadataFragment.ele('generator').txt('https://19hz.jonahsnider.com');
	metadataFragment.ele('managingEditor').txt('19hzinfo@gmail.com (19hz.info)');
	metadataFragment.ele('webMaster').txt('jonah@jonahsnider.com (Jonah Snider)');
	metadataFragment
		.ele('image')

		.ele('url')
		.txt('https://19hz.info/favicon.png')
		.up()

		.ele('title')
		.txt('19hz.info')
		.up()

		.ele('link')
		.txt('https://19hz.info')
		.up()

		.ele('width')
		.txt('32')
		.up()

		.ele('height')
		.txt('32')
		.up();
	metadataFragment
		.ele('atom:link')
		.att('href', `https://19hz.jonahsnider.com/api/region/${encodeURIComponent(region)}/feed.xml`)
		.att('rel', 'self')
		.att('type', 'application/rss+xml');

	return metadataFragment;
}

function createChannelItem(eventListing: EventListing) {
	const itemFragment = fragment().ele('item');

	itemFragment.ele('title').txt(`${eventListing.title.content} @ ${eventListing.venue}`);

	for (const tag of eventListing.tags) {
		itemFragment.ele('category').txt(tag);
	}

	itemFragment.ele('link').txt(eventListing.title.url);

	const itemFragmentDescription = itemFragment
		.ele('description')
		.txt(`Date/Time: ${eventListing.date.raw}\n`)
		.txt(`Tags: ${eventListing.tags.join(', ')}`);

	if (eventListing.priceAndAge) {
		itemFragmentDescription.txt(`\nPrice | Age: ${eventListing.priceAndAge}`);
	}

	if (eventListing.organizers) {
		itemFragmentDescription.txt(`\nOrganizers: ${eventListing.organizers}`);
	}

	if (eventListing.link) {
		itemFragmentDescription.txt(`\nLinks: ${eventListing.link.label} (${eventListing.link.url})`);
	}

	itemFragment.ele('pubDate').txt(format(eventListing.date.start, 'EEE, dd MMM yyyy HH:mm:ss xxxx'));

	// Use a hash as the GUID
	itemFragment.ele('guid').txt(hashEvent(eventListing));

	return itemFragment;
}

function hashEvent(eventListing: EventListing): string {
	// Event title/venue/link aren't unique, as some events repeat and can have multiple entries
	// Event dates obviously aren't unique, since multiple events can happen on the same day
	// So, we use the full event event title + venue along with the date to create a unique, stable ID for the event

	return (
		fnv1a(
			eventListing.title.content + eventListing.date.raw + eventListing.venue,
			// If this has collisions, we can increase the size of the hash
			{ size: 64 },
		)
			// Use all alphanumeric characters to keep GUIDs short
			.toString(36)
	);
}
