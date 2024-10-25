/** @internal */
declare global {
	namespace JSX {
		interface IntrinsicElements {
			/** @see https://www.rssboard.org/rss-specification */
			rss: {
				version: '2.0';
				children: Element;
			};
			/** @see https://www.rssboard.org/rss-specification#requiredChannelElements */
			channel: ClassAttributes<{
				children: [Element, ...Element[]];
			}>;

			/**
			 * The name of the channel. It's how people refer to your service. If you have an HTML website that contains the same information as your RSS file, the title of your channel should be the same as the title of your website.
			 */
			title: ClassAttributes<{
				/**
				 * @example 'GoUpstate.com News Headlines'
				 */
				children: string;
			}>;

			/**
			 * The URL to the HTML website corresponding to the channel.
			 */
			link: ClassAttributes<{
				/**
				 * @example 'http://www.goupstate.com/'
				 */
				children: string;
			}>;

			/**
			 * Phrase or sentence describing the channel.
			 */
			description: ClassAttributes<{
				/**
				 * @example 'The latest news from GoUpstate.com, a Spartanburg Herald-Journal Web site.'
				 */
				children: string;
			}>;

			/**
			 * The language the channel is written in. This allows aggregators to group all Italian language sites, for example, on a single page. A list of allowable values for this element, as provided by Netscape, is here. You may also use values defined by the W3C.
			 */
			language: ClassAttributes<{
				/**
				 * @example 'en-us'
				 */
				children: string;
			}>;

			/**
			 * Copyright notice for content in the channel.
			 */
			copyright: ClassAttributes<{
				/**
				 * @example 'Copyright 2002, Spartanburg Herald-Journal'
				 */
				children: string;
			}>;

			/** Email address for person responsible for editorial content. */
			managingEditor: ClassAttributes<{
				/** @example 'geo@herald.com (George Matesky)' */
				children: string;
			}>;

			/** Email address for person responsible for technical issues relating to channel. */
			webMaster: ClassAttributes<{
				/** @example 'betty@herald.com (Betty Guernsey)' */
				children: string;
			}>;

			/**
			 * The publication date for the content in the channel. For example, the New York Times publishes on a daily basis, the publication date flips once every 24 hours. That's when the pubDate of the channel changes. All date-times in RSS conform to the Date and Time Specification of RFC 822, with the exception that the year may be expressed with two characters or four characters (four preferred).
			 */
			pubDate: ClassAttributes<{
				/**
				 * @example 'Sat, 07 Sep 2002 0:00:01 GMT'
				 */
				children: string;
			}>;

			/**
			 * The last time the content of the channel changed.
			 */
			lastBuildDate: ClassAttributes<{
				/** @example 'Sat, 07 Sep 2002 9:42:31 GMT' */
				children: string;
			}>;

			/**
			 * Specify one or more categories that the channel belongs to. Follows the same rules as the <item>-level category element. More info.
			 */
			category: ClassAttributes<{
				/** @example 'Newspapers' */
				children: string;
				/** @example 'http://www.fool.com/cusips' */
				domain?: string;
			}>;

			/**
			 * A string indicating the program used to generate the channel.
			 */
			generator: ClassAttributes<{
				/**
				 * @example 'MightyInHouse Content System v2.3'
				 */
				children: string;
			}>;

			/**
			 * A URL that points to the documentation for the format used in the RSS file. It's probably a pointer to this page. It's for people who might stumble across an RSS file on a Web server 25 years from now and wonder what it is.
			 */
			docs: ClassAttributes<{
				/**
				 * @example 'https://www.rssboard.org/rss-specification'
				 */
				children: string;
			}>;

			/**
			 * Allows processes to register with a cloud to be notified of updates to the channel, implementing a lightweight publish-subscribe protocol for RSS feeds.
			 */
			cloud: ClassAttributes<{
				/** @example 'rpc.sys.com' */
				domain: string;
				/** @example '80' */
				port: `${bigint}`;
				/** @example '/RPC2' */
				path: string;
				/** @example 'pingMe' */
				registerProcedure: string;
				/** @example 'soap' */
				protocol: 'xml-rpc' | 'soap' | 'http-post';
			}>;

			/**
			 * 	ttl stands for time to live. It's a number of minutes that indicates how long a channel can be cached before refreshing from the source.
			 */
			ttl: ClassAttributes<{
				/** @example '60' */
				children: `${bigint}`;
			}>;

			/** Specifies a GIF, JPEG or PNG image that can be displayed with the channel. */
			image: ClassAttributes<{
				children:
					| [Element, Element, Element]
					| [Element, Element, Element, Element]
					| [Element, Element, Element, Element, Element]
					| [Element, Element, Element, Element, Element, Element];
			}>;

			/** The URL of a GIF, JPEG or PNG image that represents the channel. */
			url: ClassAttributes<{
				children: string;
			}>;

			/** Describes the image, it's used in the ALT attribute of the HTML <img> tag when the channel is rendered in HTML. */
			title: ClassAttributes<{
				children: string;
			}>;

			/** The URL of the site, when the channel is rendered, the image is a link to the site. (Note, in practice the image <title> and <link> should have the same value as the channel's <title> and <link>. */
			link: ClassAttributes<{
				children: string;
			}>;

			width: ClassAttributes<{
				/** Maximum value for width is 144, default value is 88. */
				children: `${bigint}`;
			}>;

			height: ClassAttributes<{
				/** Maximum value for height is 400, default value is 31. */
				children: `${bigint}`;
			}>;

			/** Text that is included in the TITLE attribute of the link formed around the image in the HTML rendering. */
			description: ClassAttributes<{
				children: string;
			}>;

			/** The PICS rating for the channel. */
			rating: ClassAttributes<{
				children: string;
			}>;

			/** Specifies a text input box that can be displayed with the channel */
			textInput: ClassAttributes<{
				children: [Element, Element, Element, Element];
			}>;

			/** The label of the Submit button in the text input area. */
			title: ClassAttributes<{
				children: string;
			}>;

			/** Explains the text input area. */
			description: ClassAttributes<{
				children: string;
			}>;

			/** The name of the text object in the text input area. */
			name: ClassAttributes<{
				children: string;
			}>;

			/** The URL of the CGI script that processes text input requests. */
			link: ClassAttributes<{
				children: string;
			}>;

			/** A hint for aggregators telling them which hours they can skip. */
			skipHours: ClassAttributes<{
				children: `${number}`;
			}>;

			/**	A hint for aggregators telling them which days they can skip. */
			skipDays: ClassAttributes<{
				children:
					| [Element]
					| [Element, Element]
					| [Element, Element, Element]
					| [Element, Element, Element, Element]
					| [Element, Element, Element, Element, Element]
					| [Element, Element, Element, Element, Element, Element]
					| [Element, Element, Element, Element, Element, Element, Element];
			}>;

			day: ClassAttributes<{
				children: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
			}>;

			/** A channel may contain any number of <item>s. An item may represent a "story" -- much like a story in a newspaper or magazine; if so its description is a synopsis of the story, and the link points to the full story. An item may also be complete in itself, if so, the description contains the text (entity-encoded HTML is allowed), and the link and title may be omitted. All elements of an item are optional, however at least one of title or description must be present. */
			item: ClassAttributes<{
				children: [Element, ...Element[]];
			}>;

			/** The title of the item. */
			title: ClassAttributes<{
				/** @example 'Venice Film Festival Tries to Quit Sinking' */
				children: string;
			}>;

			/** The URL of the item. */
			link: ClassAttributes<{
				/** @example 'http://www.nytimes.com/2002/09/07/movies/07FEST.html' */
				children: string;
			}>;

			/** The item synopsis. */
			description: ClassAttributes<{
				/** @example 'Some of the most heated chatter at the Venice Film Festival this week was about the way that the arrival of the stars at the Palazzo del Cinema was being staged.' */
				children: string;
			}>;

			/** Email address of the author of the item. */
			author: ClassAttributes<{
				/** @example 'lawyer@boyer.net (Lawyer Boyer)' */
				children: string;
			}>;

			/** Includes the item in one or more categories. */
			category: ClassAttributes<{
				/** @example 'Simpsons Characters' */
				children: string;
			}>;

			/** URL of a page for comments relating to the item. */
			comments: ClassAttributes<{
				/** @example 'http://ekzemplo.com/entry/4403/comments' */
				children: string;
			}>;

			/** Describes a media object that is attached to the item. */
			enclosure: ClassAttributes<{
				/** @example 'http://www.scripting.com/mp3s/weatherReportSuite.mp3' */
				url: string;
				/** @example '12216320' */
				length: `${bigint}`;
				/** @example 'audio/mpeg' */
				type: string;
			}>;

			/** A string that uniquely identifies the item. */
			guid: ClassAttributes<{
				/** @example 'http://some.server.com/weblogItem3207' */
				children: string;
				/** If the guid element has an attribute named isPermaLink with a value of true, the reader may assume that it is a permalink to the item, that is, a url that can be opened in a Web browser, that points to the full item described by the <item> element. */
				isPermaLink?: 'true' | 'false';
			}>;

			/** Indicates when the item was published. */
			pubDate: ClassAttributes<{
				/** @example 'Sun, 19 May 2002 15:21:36 GMT' */
				children: string;
			}>;

			/** The RSS channel that the item came from. */
			source: ClassAttributes<{
				/** @example 'Quotes of the Day' */
				children: string;
				/** @example 'http://static.userland.com/tomalak/links2.xml' */
				url?: string;
			}>;
		}
	}
}

export {};
