import type { APIRoute } from 'astro';
import { fetchEventListings } from '@/data-fetching/fetcher';
import { AppException } from '@/exceptions/app-exception';
import { createFeed } from '@/rss/feed-creator';

export const prerender = false;

const CACHE_NAME = 'rss-feeds';

export const GET: APIRoute = async ({ params, request }) => {
	const cache = await caches.open(CACHE_NAME);
	const cachedResponse = await cache.match(request);

	if (cachedResponse) {
		return cachedResponse;
	}

	try {
		const region = params.region;

		if (!region) {
			throw new AppException('Region is required', 400);
		}

		const eventListings = await fetchEventListings(region);
		const response = new Response(createFeed(eventListings, region), {
			headers: {
				'Cache-Control': 'public, max-age=3600',
				'Content-Type': 'application/rss+xml; charset=utf-8',
			},
		});

		await cache.put(request, response.clone());

		return response;
	} catch (error) {
		console.error(error);

		if (error instanceof AppException) {
			return Response.json({ message: error.message }, { status: error.status });
		}

		throw error;
	}
};
