/* @jsxImportSource jsx-to-xml */

import type { EventListing } from '@/data-fetching/event-listing';

export function createFeed(eventListings: EventListing[]): string {
	// jsx-to-xml will render this to a string, so this is safe
	const rssString = AppRss({ eventListings }) as unknown as string;

	return `<?xml version="1.0" encoding="utf-8"?>${rssString}`;
}

function AppRss({ eventListings }: { eventListings: EventListing[] }) {
	return (
		<rss version="2.0">
			<AppChannel eventListings={eventListings} />
		</rss>
	);
}

function AppChannel({ eventListings }: { eventListings: EventListing[] }) {
	return (
		<channel>
			<ChannelMetadata />

			{eventListings.map((eventListing) => (
				<ChannelItem key={eventListing.title.content} eventListing={eventListing} />
			))}
		</channel>
	);
}

function ChannelMetadata() {
	return (
		<>
			<title>19hz.info</title>
			{/* biome-ignore lint/correctness/noVoidElementsWithChildren: This isn't the HTML link element */}
			<link>https://19hz.info</link>
			<description>Electronic music calendars</description>
			<language>en-us</language>
			<docs>https://www.rssboard.org/rss-specification</docs>
			<generator>https://19hz.jonahsnider.com</generator>
			<managingEditor>19hzinfo@gmail.com (19hz.info)</managingEditor>
			<webMaster>jonah@jonahsnider.com (Jonah Snider)</webMaster>
			<image>
				<url>https://19hz.info/favicon.png</url>
				<title>19hz.info</title>
				{/* biome-ignore lint/correctness/noVoidElementsWithChildren: This isn't the HTML link element */}
				<link>https://19hz.info</link>
				<width>32</width>
				<height>32</height>
			</image>
		</>
	);
}

function ChannelItem({ eventListing }: { eventListing: EventListing }) {
	return (
		<item>
			<title>
				{eventListing.title.content} @ {eventListing.venue}
			</title>
			{eventListing.tags.map((tag) => (
				<category key={tag}>{tag}</category>
			))}
			{/* biome-ignore lint/correctness/noVoidElementsWithChildren: This isn't the HTML link element */}
			<link>{eventListing.title.url}</link>
			<description>
				Date/Time: {eventListing.date.raw}
				{'\n'}
				Tags: {eventListing.tags.join(', ')}
				{eventListing.priceAndAge && `\nPrice | Age: ${eventListing.priceAndAge}`}
				{eventListing.organizers && `\nOrganizers: ${eventListing.organizers}`}
				{eventListing.link && `\nLinks: ${eventListing.link.label} (${eventListing.link.url})`}
			</description>
			<guid isPermaLink="true">{eventListing.title.url}</guid>
		</item>
	);
}
