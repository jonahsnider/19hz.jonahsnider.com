import { fetchEventListings } from '@/data-fetching/fetcher';
import { exceptionRouteWrapper } from '@/exceptions/exception-route-wrapper';
import { createFeed } from '@/rss/feed-creator';
import { NextRouteHandler, type NextRouteHandlerSegmentData } from 'next-api-utils';
import { NextResponse } from 'next/server';

export const GET = exceptionRouteWrapper.wrapRoute<string, NextRouteHandlerSegmentData<{ region: string }>>(
	async (request, segmentData) => {
		const params = await segmentData.params;

		const eventListings = await fetchEventListings(params.region);

		const rssFeed = createFeed(eventListings);

		return new NextResponse(rssFeed, {
			headers: {
				'Content-Type': 'application/rss+xml',
			},
		});
	},
);
