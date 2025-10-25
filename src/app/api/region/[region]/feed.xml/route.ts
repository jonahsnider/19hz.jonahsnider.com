import { cacheLife } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRouteHandlerSegmentData } from 'next-api-utils';
import { fetchEventListings } from '@/data-fetching/fetcher';
import { exceptionRouteWrapper } from '@/exceptions/exception-route-wrapper';
import { createFeed } from '@/rss/feed-creator';

async function fetchEventsAndCreateRssFeed(region: string): Promise<string> {
	'use cache';
	cacheLife('hours');

	const eventListings = await fetchEventListings(region);

	const rssFeed = createFeed(eventListings, region);
	return rssFeed;
}

export const GET = exceptionRouteWrapper.wrapRoute<string, NextRouteHandlerSegmentData<{ region: string }>>(
	async (_request, segmentData) => {
		const params = await segmentData.params;

		const rssFeed = await fetchEventsAndCreateRssFeed(params.region);

		return new NextResponse(rssFeed, {
			headers: {
				'Content-Type': 'application/rss+xml',
			},
		});
	},
);
