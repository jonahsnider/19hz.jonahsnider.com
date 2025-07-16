import { NextResponse } from 'next/server';
import type { NextRouteHandlerSegmentData } from 'next-api-utils';
import { fetchEventListings } from '@/data-fetching/fetcher';
import { exceptionRouteWrapper } from '@/exceptions/exception-route-wrapper';
import { createFeed } from '@/rss/feed-creator';

// 2 hours in seconds
// This can't be dynamically calculated because Next will either silently ignore it or throw an error on build
// We also can't reference a constant that's exported since that can't be resolved by their very simple bundling tech
export const revalidate = 7200;

export const GET = exceptionRouteWrapper.wrapRoute<string, NextRouteHandlerSegmentData<{ region: string }>>(
	async (_request, segmentData) => {
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
