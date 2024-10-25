/* @jsxImportSource jsx-to-xml */

import type { EventListing } from '@/data-fetching/event-listing';
import { format } from 'date-fns';
import type { PropsWithChildren } from 'react';

export function createFeed(eventListings: EventListing[], region: string): string {
	// jsx-to-xml will render this to a string, so this is safe
	const rssString = AppRss({ eventListings, region }) as unknown as string;

	return `<?xml version="1.0" encoding="utf-8"?>${rssString}`;
}

function AppRss({ eventListings, region }: { eventListings: EventListing[]; region: string }) {
	return (
		// TODO: Need to migrate to xmlbuilder2 :(
		// Can't use a:b syntax bc JSX will throw. Seems like in general this is just too janky of a concept within a Next.js/React app.
		<rss version='2.0' /* xmlns:atom='http://www.w3.org/2005/Atom' */>
			<AppChannel eventListings={eventListings} region={region} />
		</rss>
	);
}

function AppChannel({ eventListings, region }: { eventListings: EventListing[]; region: string }) {
	return (
		<channel>
			<ChannelMetadata region={region} />

			{eventListings.map((eventListing) => (
				<ChannelItem key={eventListing.title.content} eventListing={eventListing} />
			))}
		</channel>
	);
}

function ChannelMetadata({ region }: { region: string }) {
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
			{/* <atom:link
				href={`https://19hz.jonahsnider.com/api/region/${encodeURIComponent(region)}/feed.xml`}
				rel='self'
				type='application/rss+xml'
			/> */}
		</>
	);
}

function CData({ children }: PropsWithChildren) {
	return (
		<>
			{'<![CDATA[ '}
			{children}
			{' ]]>'}
		</>
	);
}

function ChannelItem({ eventListing }: { eventListing: EventListing }) {
	return (
		<item>
			<title>
				<CData>
					{eventListing.title.content} @ {eventListing.venue}
				</CData>
			</title>
			{eventListing.tags.map((tag) => (
				<category key={tag}>
					<CData>{tag}</CData>
				</category>
			))}
			{/* biome-ignore lint/correctness/noVoidElementsWithChildren: This isn't the HTML link element */}
			<link>
				<CData>{eventListing.title.url}</CData>
			</link>
			<description>
				Date/Time: {eventListing.date.raw}
				{'\n'}
				Tags: <CData>{eventListing.tags.join(', ')}</CData>
				{eventListing.priceAndAge && (
					<>
						{'\n'}Price | Age: <CData>{eventListing.priceAndAge}</CData>
					</>
				)}
				{eventListing.organizers && (
					<>
						{'\n'}Organizers: <CData>{eventListing.organizers}</CData>
					</>
				)}
				{eventListing.link && (
					<>
						{'\n'}Links:{' '}
						<CData>
							{eventListing.link.label} ({eventListing.link.url})
						</CData>
					</>
				)}
			</description>
			<pubDate>{format(eventListing.date.start, 'EEE, dd MMM yyyy HH:mm:ss xxxx')}</pubDate>
			<guid>
				<CData>
					{/* TODO: Need to do a legit hash here, having arbitrary characters fails validation */}
					{eventListing.date.raw}
					{eventListing.title.content}
					{eventListing.venue}
				</CData>
			</guid>
		</item>
	);
}
