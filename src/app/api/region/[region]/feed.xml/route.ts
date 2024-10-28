import { EVENT_LISTING_CACHE_TTL, fetchEventListings } from '@/data-fetching/fetcher';
import { exceptionRouteWrapper } from '@/exceptions/exception-route-wrapper';
import { createFeed } from '@/rss/feed-creator';
import type { NextRouteHandlerSegmentData } from 'next-api-utils';
import { NextResponse } from 'next/server';

export const revalidate = EVENT_LISTING_CACHE_TTL.to('s');

export const GET = exceptionRouteWrapper.wrapRoute<string, NextRouteHandlerSegmentData<{ region: string }>>(
	async (request, segmentData) => {
		const params = await segmentData.params;

		const eventListings = await fetchEventListings(params.region);

		const rssFeed = createFeed(eventListings, params.region);

		return new NextResponse(rssFeed, {
			headers: {
				'Content-Type': 'application/rss+xml',
			},
		});
	},
);
