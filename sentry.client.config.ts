import * as Sentry from '@sentry/astro';

Sentry.init({
	dsn: 'https://3012dedaea635c4a605d872b8e64d23f@o141130.ingest.us.sentry.io/4508165730729984',
	enableLogs: true,
	integrations: [Sentry.replayIntegration()],
	replaysOnErrorSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	sendDefaultPii: true,
	tracesSampleRate: 1,
});
