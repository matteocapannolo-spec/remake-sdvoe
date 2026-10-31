<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { href } from '$lib/link.js';

	// Text from sdvoe.org/privacypolicy/ (effective March 1, 2019), unchanged apart from the layout.
	const sections = [
		{ id: 'collection', label: 'Collection of personal information' },
		{ id: 'use', label: 'Use of information' },
		{ id: 'sharing', label: 'Sharing, transfer and disclosure' },
		{ id: 'rights', label: 'What rights do I have?' },
		{ id: 'cookies', label: 'Use of cookies' },
		{ id: 'third-party', label: 'Third-party sites' },
		{ id: 'security', label: 'Security of your data' },
		{ id: 'children', label: 'Protecting children' },
		{ id: 'cross-border', label: 'Cross-border transfer' },
		{ id: 'changes', label: 'Changes to this policy' },
		{ id: 'contact', label: 'How to contact us' }
	];
</script>

<Seo title="Privacy policy" description="How the SDVoE Alliance handles the personal information it obtains through its websites, and your data protection rights." />

<PageHero eyebrow="Legal" title="Website privacy policy" lead="Effective March 1, 2019." />

<div class="container section legal">
	<nav class="toc" aria-label="On this page">
		<p class="t-caption">On this page</p>
		<ol role="list">
			{#each sections as s}
				<li><a href={`#${s.id}`}>{s.label}</a></li>
			{/each}
		</ol>
	</nav>

	<article class="prose">
		<p>
			Your right to privacy is important to SDVoE Alliance (also referred to as “<strong>us</strong>” or “<strong>we</strong>”).
			This policy explains how we intend to handle any personal or other information we obtain from you through this or any
			other website we operate, including the SDVoE Alliance website and the SDVoE Academy website (the “<strong>Websites</strong>”).
			This information consists of (1) information or a combination of information that enables us to identify you, including
			your name, address, telephone numbers and email address, and (2) other information you provide such as your customer,
			subcontractor, project or program, design freeze date, or resume data (collectively, “<strong>Information</strong>”).
		</p>
		<p>
			It also describes your data protection rights, including a right to object to some of the processing that we carry out.
			More information about your rights, and how to exercise them, is set out in the
			<a href="#rights">“What rights do I have?”</a> section below.
		</p>

		<h2 id="collection">Collection of personal information</h2>
		<p>
			When you visit our Websites and request information, sharing your Information is strictly voluntary. However, in order to
			access certain features of our Websites, request information or complete transactions, you may be prompted for Information.
		</p>
		<p>Types of information that we may collect include:</p>
		<ul>
			<li>
				Information that you provide, which may include: name, email address, contact details at the time of user registration
				on our Websites, and email communications if you request receipt of certain notifications and updates and/or if you
				contact us directly, and any other personal information disclosed when using our Websites and services.
			</li>
			<li>
				Automatically collected information: When you visit our Websites, enabling cookies on your browser allows us to collect
				information about you. This and other technical information collected is used to identify your browser to create a more
				personalized online experience. Cookies may be enabled to activate some of the features and functionality of the Websites.
			</li>
		</ul>
		<p>
			If you choose not to provide Information when requested, you will not be able to obtain the particular services,
			information or benefits that require such disclosure.
		</p>
		<p>
			When you visit our Websites, we may also collect certain electronic information that cannot be associated with you
			personally, such as the domains from which you came immediately prior to visiting our Websites, the number of visitors to
			our Websites, browsing patterns and areas of interest on our Websites. We may collect this data in order to help us improve
			our Websites, products and better serve our customers, job applicants, and others who visit the Websites. Because such
			information may not be used to identify you, it is not subject to the remaining provisions of this policy.
		</p>
		<p>
			SDVoE Alliance is the sole custodian of all Information provided to us, subject to the limitations set forth in this
			policy. In the event SDVoE Alliance is acquired by, merged into or otherwise succeeded by another company, SDVoE Alliance
			reserves the right to transfer the Information to such other company. In the event of such a transfer and where permitted
			by law, we will require the new company or organization that holds your Information to be continue to be bound by this
			privacy policy; otherwise, we will require that company or organization to ask for your authorization and consent.
		</p>

		<h2 id="use">Use of information</h2>
		<p>We process the personal information you have provided:</p>
		<ul>
			<li>to make it easier for us to fulfil a contract, or take steps linked to a contract: this is relevant where you apply for a job;</li>
			<li>
				to conduct our business and pursue our legitimate interests, in particular:
				<ul>
					<li>we will use your information to provide products and services you have requested, and respond to any comments or complaints you may send us;</li>
					<li>we monitor use of our websites and online services, and use your information to help us monitor, improve and protect our products, content, services and websites, both online and offline;</li>
					<li>we use information you provide to personalize our website, products or services to make them more relevant to you;</li>
					<li>we monitor customer accounts to prevent, investigate and/or report fraud, terrorism, misrepresentation, security incidents or crime, in accordance with applicable law;</li>
					<li>we use information you provide to investigate any complaints received from you or from others, about our website or our products or services;</li>
				</ul>
			</li>
			<li>
				where you give us consent:
				<ul>
					<li>we will send you direct marketing in relation to our relevant products and services, or other products and services provided by us, our affiliates and carefully selected partners;</li>
					<li>we place cookies and use similar technologies in accordance with our cookies policy and the information provided to you when those technologies are used. More information about how we use cookies is contained in the <a href="#cookies">“Use of cookies”</a> section below;</li>
					<li>on other occasions where we ask you for consent, we will use the data for the purpose which we explain at that time.</li>
				</ul>
			</li>
			<li>For purposes which are required by law, including in response to requests by government or law enforcement authorities conducting an investigation.</li>
		</ul>

		<h2 id="sharing">How we share, transfer and disclose your information</h2>
		<p>
			Under certain circumstances, we may provide your Information to third parties for the purpose of delivering our goods or
			services to you and for other purposes related to your use of our products or your interest in securing employment with
			SDVoE Alliance. For example, we may provide such information to our designated customer support providers, authorized sales
			representatives, authorized distributors, shipping companies, or recruiters. We will only provide those third parties the
			information they need to perform the contemplated service.
		</p>
		<p>
			Aside from the foregoing, we will not provide any of your Information to other companies or individuals without your
			consent, unless required by law or for the other legal purposes described below.
		</p>
		<p>
			We may disclose your Information to local and foreign public or governmental authorities to comply with legal, regulatory
			or administrative reporting requirements, or to an investigative body in the case of a breach of an agreement or
			contravention of law, or as otherwise required by other law.
		</p>
		<p>
			We may also disclose your Information where necessary for the establishment, exercise or defense of legal claims, to
			investigate or prevent actual or suspected loss or harm to persons or property, to allow us to pursue available remedies or
			limit the damages that we may sustain, or as otherwise permitted by law.
		</p>
		<p>
			The Information you provide us may be stored and processed in Canada, the United States, the United Kingdom or any other
			country in which we or any affiliates conduct operations. We will share your Information within the SDVoE Alliance group of
			companies and with the SDVoE Alliance’s members in order to allow you to access certain features of our Websites,
			communicate with you, assist you in making a purchase of our products or in the job application process.
		</p>
		<p>
			Where Information is transferred outside the European Economic Area, and where this is to a stakeholder or vendor in a
			country that is not subject to an adequacy decision by the European Commission, safeguards such as standard contractual
			clauses, Privacy Shield certification or a vendor’s Processor Binding Corporate Rules will be used.
		</p>

		<h2 id="rights">What rights do I have?</h2>
		<p>
			Where permitted by law, you have the right to ask us for a copy of your Information; to access, update, correct, delete or
			restrict (stop any active) processing of your Information; and to obtain the Information you provide to us for a contract or
			with your consent in a structured, machine readable format, and to ask us to share (port) this data to another controller.
		</p>
		<p>
			In addition, you can object to the processing of your Information in some circumstances (in particular, where we don’t
			have to process the data to meet a contractual or other legal requirement, or where we are using the data for direct
			marketing).
		</p>
		<p>
			Where we have collected and process your Information with your consent, you may withdraw consent at any time. If you ask to
			withdraw your consent to SDVoE Alliance processing your data, this will not affect any processing which has already taken
			place at that time.
		</p>
		<p>
			These rights may be limited, for example if fulfilling your request would reveal Information about another person, or if
			you ask us to delete Information which we are required by law to keep or have compelling legitimate interests in keeping.
		</p>
		<p>
			To exercise any of these rights, you can get in touch with us using the details set out <a href="#contact">below</a>. Where
			relevant, if you have unresolved concerns, you have the right to complain to a data protection authority in the legal
			jurisdiction where you live, work or where you believe a breach may have occurred.
		</p>

		<h2 id="cookies">Use of cookies or similar technology</h2>
		<p>
			A cookie is a text file that a website transfers to your device’s hard drive for record-keeping purposes and to enhance the
			quality of your visit to the website.
		</p>
		<p>Our Websites use the following types of cookies:</p>
		<ul>
			<li><strong>Strictly necessary cookies:</strong> these cookies are essential in order to enable you to move around our Websites and use its features, such as accessing secure areas. Without these cookies, services like enabling appropriate content based on your type of device cannot be provided.</li>
			<li><strong>Performance cookies:</strong> these cookies collect information about how visitors use our Websites, so that we can analyze traffic and understand how our visitors interact with our Websites.</li>
			<li><strong>Functionality cookies:</strong> these cookies allow our Websites to remember choices you make (such as your user name, or the region you are in) and provide enhanced, more personal features. These cookies can also be used to remember changes you have made to text size, fonts and other parts of web pages that you can customize.</li>
			<li><strong>Social media cookies:</strong> these cookies are used when you share information using a social media sharing button or “like” button on our Websites or you link your account or engage with our content on or through a social media site such as Facebook, Twitter, LinkedIn or Google+. This information may be linked to targeting/advertising activities.</li>
			<li><strong>Advertising cookies:</strong> our Websites use third party advertising networks to deliver targeted advertising. They may also have the capability to track your browsing across different sites and apps.</li>
		</ul>
		<p>
			Where required, we will ask for your consent before we collect cookies from you. Most web browsers automatically accept
			cookies, but if you prefer, you can edit your browser options to block them in the future. The Help portion of the toolbar
			on most browsers will tell you how to prevent your computer from accepting new cookies, how to have the browser notify you
			when you receive a new cookie, or how to disable cookies altogether. Visitors to our Websites who disable cookies will be
			able to browse certain areas of the Websites, but some features may not function.
		</p>
		<p>
			Currently, our systems do not recognize browser “do-not-track” requests. You may, however, disable certain tracking as
			discussed above (e.g., by disabling cookies).
		</p>

		<h2 id="third-party">Third-party sites</h2>
		<p>
			Our Websites may contain links to other websites operated by third-party companies. We do not share your Information with
			those websites (unless we have asked for your consent) and are not responsible for their privacy practices.
		</p>
		<p>
			We do not control or are not responsible for the privacy and security practices of any third-party companies. We encourage
			you to check the applicable privacy policy of the third-party website to determine how they will handle any information
			they collect from you.
		</p>

		<h2 id="security">How we ensure the security of your data</h2>
		<p>
			When you submit Information via the Websites, your Information is protected both online and offline. We have implemented
			technical, physical and administrative measures, as well as policies and procedures designed to safeguard your privacy from
			unauthorized access, use, disclosure, modification or destruction and will continue to update these measures as new
			technology becomes available. Although we take efforts to protect your Information, we cannot guarantee the security of
			your Information transmitted over the internet or any wireless network. Please also understand that there are no such
			“perfect security measures” for the internet. We will rely on currently available technologies and take appropriate
			security measures to protect your Information. We will offer reasonable security guarantees and will do our best to keep
			your Information from being leaked, damaged or lost. If we learn of a security systems breach, then we may attempt to
			notify you electronically so that you can take appropriate protective steps. We may also post a notice through the
			Websites and report to regulatory authorities as required by applicable law. If you have reason to believe that your
			interaction with us is no longer secure (for example, if you feel that the security of your account has been compromised),
			please immediately notify us in accordance with the <a href="#contact">“How to contact us”</a> section below.
		</p>

		<h2 id="children">Protecting children</h2>
		<p>
			SDVoE Alliance takes special care to protect the safety and privacy of children. For that reason, we never collect or
			maintain information at our Websites from those we actually know are under 14. If you believe we have collected information
			about a child under the age of 14, please contact us so that we may take appropriate steps to delete such information. If
			you are a child, you may only use our Websites and services with the permission of your parent or guardian.
		</p>

		<h2 id="cross-border">Consent to cross-border transfer of data, including information</h2>
		<p>
			As a global organization, data we collect, including Information, may be transferred internationally throughout SDVoE
			Alliance’s worldwide organization, including to SDVoE Alliance’s headquarters in Canada. Some of these foreign
			jurisdictions may not provide the same level of privacy protection as your local jurisdiction. In addition, as described in
			the <a href="#sharing">“How we share, transfer and disclose your information”</a> section above, we may disclose your
			Information to third-party service providers or public or governmental authorities in the U.S. or other jurisdictions. We
			will take proper measures to protect your Information at adequate or comparable levels of protection as your local
			jurisdiction. By using and submitting Information through our Websites, you consent to such transfers or disclosures of
			your Information.
		</p>

		<h2 id="changes">Changes to this privacy policy</h2>
		<p>
			The effective date of this policy is March 1, 2019. We reserve the right to change or update this privacy policy at any
			time. If we make any changes to this privacy policy, we will post the updated policy, provided on an updated homepage link,
			and may post other places we deem appropriate. Users who have authorized e-mail communication will be notified via e-mail
			of any material changes to the privacy policy. We will only use Information in accordance with the privacy policy under
			which it was collected. Without your express consent, we will not reduce your rights entitled to under this privacy policy.
		</p>

		<h2 id="contact">How to contact us</h2>
		<p>
			We hope that we can satisfy queries you may have about the way we process your Information. If you have any concerns about
			how we process your data, the security of your data or would like to opt out of direct marketing or complain, you can get
			in touch at <a href="mailto:info@sdvoe.org">info@sdvoe.org</a>, through the <a href={href('/contact/')}>contact form</a>,
			or by writing to:
		</p>
		<address>
			SDVoE Alliance<br />
			102-2344 boul Alfred Nobel<br />
			St Laurent, QC H4S 0A4<br />
			Canada
		</address>
	</article>
</div>

<style>
	.legal {
		display: grid;
		grid-template-columns: 240px minmax(0, 720px);
		gap: var(--s-xxl);
		justify-content: center;
		align-items: start;
		padding-top: 0;
	}
	/* sticky table of contents beside the text on wide screens */
	.toc {
		position: sticky;
		top: calc(var(--nav-h) + var(--s-lg));
	}
	.toc ol {
		display: grid;
		gap: 2px;
		margin: var(--s-sm) 0 0;
		border-left: 1px solid var(--divider);
	}
	.toc a {
		display: block;
		padding: 6px 0 6px var(--s-md);
		color: var(--ink-secondary);
		font-size: var(--fs-ui);
		line-height: 1.35;
	}
	.toc a:hover {
		color: var(--primary);
	}
	.prose {
		color: var(--ink);
		font-size: var(--fs-body);
		line-height: 1.7;
	}
	.prose > * + * {
		margin-top: var(--s-md);
	}
	.prose h2 {
		margin-top: var(--s-xxl);
		color: var(--sdvoe-deep-blue);
		font-size: var(--fs-subhead);
		font-weight: var(--w-bold);
		line-height: 1.3;
		scroll-margin-top: calc(var(--nav-h) + var(--s-lg));
	}
	.prose ul {
		display: grid;
		gap: var(--s-sm);
		padding-left: 1.25em;
		list-style: disc;
	}
	.prose ul ul {
		margin-top: var(--s-sm);
		list-style: circle;
	}
	.prose a {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.prose strong {
		font-weight: var(--w-bold);
	}
	address {
		font-style: normal;
	}
	@media (max-width: 900px) {
		.legal {
			grid-template-columns: minmax(0, 1fr);
		}
		.toc {
			position: static;
		}
	}
</style>
