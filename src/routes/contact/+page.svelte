<script>
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import { Mail, MapPin, Users, Newspaper, ArrowRight, Send } from '@lucide/svelte';
	import { bigin, countries, organizationTypes, roles } from '$lib/content/contact.js';
	import { social } from '$lib/content/site.js';
	import { socialIcons } from '$lib/content/socialIcons.js';
	import { href } from '$lib/link.js';

	// The form posts straight to the alliance's Zoho Bigin (contact.js); the browser checks the required
	// fields first. The newsletter field works like the footer's: not connected yet (PROGETTO.md §5).
	let subscribed = $state(false);
</script>

<Seo title="Contact" description="Ask the SDVoE Alliance a question, apply for membership or sign up for news on SDVoE technology." />

<PageHero
	eyebrow="Contact"
	title="Contact us"
	lead="If you’d like to apply for membership in the SDVoE Alliance or ask us a question, fill out the form below and we’ll be in touch as soon as we can."
/>

<section class="container form-section" aria-labelledby="form-title">
	<div class="form-head">
		<h2 id="form-title" class="t-h3">Send us a message</h2>
		<p class="t-sm t-muted">Fields marked <span class="req" aria-hidden="true">*</span><span class="visually-hidden">with an asterisk</span> are required.</p>
	</div>

	<form action={bigin.action} method="POST" enctype="multipart/form-data" accept-charset="UTF-8">
		{#each Object.entries(bigin.hidden) as [name, value]}
			<input type="hidden" {name} {value} />
		{/each}

		<fieldset>
			<legend class="group">About you</legend>
			<div class="fields">
				<label>
					<span class="lbl">First name <span class="req" aria-hidden="true">*</span></span>
					<input class="field" name="First Name" maxlength="40" autocomplete="given-name" required />
				</label>
				<label>
					<span class="lbl">Last name <span class="req" aria-hidden="true">*</span></span>
					<input class="field" name="Last Name" maxlength="80" autocomplete="family-name" required />
				</label>
				<label>
					<span class="lbl">Email <span class="req" aria-hidden="true">*</span></span>
					<input class="field" type="email" name="Email" maxlength="100" autocomplete="email" required />
				</label>
				<label>
					<span class="lbl">Phone</span>
					<input class="field" type="tel" name="Accounts.Phone" maxlength="30" autocomplete="tel" />
				</label>
				<label>
					<span class="lbl">Country <span class="req" aria-hidden="true">*</span></span>
					<select class="field" name="CONTACTCF11" required>
						<option value="" disabled selected>Select a country</option>
						{#each countries as c}<option>{c}</option>{/each}
					</select>
				</label>
				<label>
					<span class="lbl">Your role</span>
					<select class="field" name="Accounts.ACCOUNTCF3">
						<option value="-None-" selected>Select one</option>
						{#each roles as r}<option>{r}</option>{/each}
					</select>
				</label>
			</div>
		</fieldset>

		<fieldset>
			<legend class="group">Your organization</legend>
			<div class="fields">
				<label>
					<span class="lbl">Company name <span class="req" aria-hidden="true">*</span></span>
					<input class="field" name="Accounts.Account Name" maxlength="200" autocomplete="organization" required />
				</label>
				<label>
					<span class="lbl">Job title</span>
					<input class="field" name="Title" maxlength="100" autocomplete="organization-title" />
				</label>
				<label class="wide">
					<span class="lbl">Type of organization <span class="req" aria-hidden="true">*</span></span>
					<select class="field" name="Accounts.ACCOUNTCF2" required>
						<option value="" disabled selected>Select one</option>
						{#each organizationTypes as o}<option>{o}</option>{/each}
					</select>
				</label>
			</div>
		</fieldset>

		<fieldset>
			<legend class="group">How can we help?</legend>
			<label>
				<span class="lbl">Message <span class="req" aria-hidden="true">*</span></span>
				<textarea class="field" name="CONTACTCF10" maxlength="2000" rows="6" required></textarea>
			</label>
		</fieldset>

		<label class="consent">
			<input type="checkbox" name="privacyTool" required />
			<span>
				I agree to allow the SDVoE Alliance to store and process this data and to send me newsletters. I understand that I can
				unsubscribe at any time. <span class="req" aria-hidden="true">*</span>
				Read our <a href={href('/privacy-policy/')}>privacy policy</a>.
			</span>
		</label>

		<button class="btn btn-primary submit" type="submit"><Send size={16} strokeWidth={2} aria-hidden="true" />Send message</button>
	</form>
</section>

<section class="ways" aria-labelledby="ways-title">
	<div class="container">
		<h2 id="ways-title" class="t-h3 ways-title">Other ways to reach us</h2>
		<ul role="list" class="grid-ways">
			<li class="way">
				<span class="w-icon" aria-hidden="true"><Mail size={22} strokeWidth={1.5} /></span>
				<h3 class="t-title">Email</h3>
				<p class="t-sm t-muted">For questions about the alliance, the technology or this site.</p>
				<a class="w-link" href="mailto:info@sdvoe.org">info@sdvoe.org</a>
			</li>
			<li class="way">
				<span class="w-icon" aria-hidden="true"><MapPin size={22} strokeWidth={1.5} /></span>
				<h3 class="t-title">Mail</h3>
				<address class="t-sm t-muted">
					SDVoE Alliance<br />
					102-2344 boul Alfred Nobel<br />
					St Laurent, QC H4S 0A4<br />
					Canada
				</address>
			</li>
			<li class="way">
				<span class="w-icon" aria-hidden="true"><Users size={22} strokeWidth={1.5} /></span>
				<h3 class="t-title">Membership</h3>
				<p class="t-sm t-muted">Thinking of joining? See what members get and how to apply.</p>
				<a class="w-link" href={href('/alliance/#join')}>Join the alliance <ArrowRight size={14} strokeWidth={2} aria-hidden="true" /></a>
			</li>
			<li class="way">
				<span class="w-icon" aria-hidden="true"><Newspaper size={22} strokeWidth={1.5} /></span>
				<h3 class="t-title">Stay connected</h3>
				<p class="t-sm t-muted">Alliance news, trade show demos and new courses. A few emails a year.</p>
				{#if subscribed}
					<p class="t-sm" role="status">Thanks — you're on the list.</p>
				{:else}
					<form class="news" onsubmit={(e) => { e.preventDefault(); subscribed = true; }}>
						<label class="visually-hidden" for="ct-email">Work email</label>
						<input id="ct-email" type="email" required placeholder="Work email" autocomplete="email" />
						<button type="submit" aria-label="Subscribe">
							<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
						</button>
					</form>
				{/if}
				<ul role="list" class="social">
					{#each social as s}
						<li>
							<a href={s.href} target="_blank" rel="noopener" aria-label={`SDVoE Alliance on ${s.label}`} title={s.label}>
								{#if socialIcons[s.label]}
									<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d={socialIcons[s.label]} fill="currentColor" /></svg>
								{:else}{s.label}{/if}
							</a>
						</li>
					{/each}
				</ul>
			</li>
		</ul>
	</div>
</section>

<style>
	/* ── the form: one centred column, DJI-style plain fields ── */
	.form-section {
		width: min(100% - 2 * var(--gutter), 760px);
		padding-bottom: var(--s-section);
	}
	/* section titles in Deep Blue, like the t-h2 ones elsewhere */
	.form-head h2,
	.ways-title {
		color: var(--sdvoe-deep-blue);
	}
	.form-head {
		display: grid;
		gap: 6px;
		margin-bottom: var(--s-xl);
	}
	form:not(.news) {
		display: grid;
		gap: var(--s-xxl);
	}
	fieldset {
		display: grid;
		gap: var(--s-md);
		margin: 0;
		padding: 0;
		border: 0;
		min-width: 0;
	}
	.group {
		width: 100%;
		padding-bottom: var(--s-xs);
		margin-bottom: var(--s-md);
		border-bottom: 1px solid var(--divider);
		color: var(--sdvoe-deep-blue);
		font-size: var(--fs-subhead);
		font-weight: var(--w-bold);
	}
	.fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--s-lg) var(--s-md);
	}
	.wide {
		grid-column: 1 / -1;
	}
	label {
		display: grid;
		gap: 6px;
		min-width: 0;
	}
	.lbl {
		color: var(--ink);
		font-size: var(--fs-ui);
		font-weight: var(--w-medium);
	}
	.req {
		color: var(--primary);
	}
	/* 48 px fields with an edge dark enough to see (3:1 on white); Deep Blue ring on focus */
	.field {
		width: 100%;
		min-height: 48px;
		padding: 12px 14px;
		border: 1px solid #8c9094;
		border-radius: var(--r-xs);
		background: #fff;
		color: var(--ink);
		font: inherit;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}
	.field:hover {
		border-color: var(--ink-secondary);
	}
	.field:focus {
		outline: none;
		border-color: var(--primary);
		box-shadow: 0 0 0 3px var(--primary-tint);
	}
	select.field {
		appearance: none;
		padding-right: 40px;
		background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23262626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
	}
	textarea.field {
		min-height: 160px;
		resize: vertical;
	}
	.consent {
		grid-template-columns: auto 1fr;
		align-items: start;
		gap: var(--s-sm);
		color: var(--ink-secondary);
		font-size: var(--fs-ui);
		line-height: 1.5;
	}
	.consent input {
		width: 18px;
		height: 18px;
		margin-top: 1px;
		accent-color: var(--primary);
	}
	.consent a {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.submit {
		justify-self: start;
		min-height: 48px;
		padding-inline: 28px;
	}

	/* ── other ways to reach us: four cards on a grey band ── */
	.ways {
		padding-block: var(--s-section);
		background: var(--fog);
	}
	.ways-title {
		margin-bottom: var(--s-xl);
		text-align: center;
	}
	.grid-ways {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--s-md);
		margin: 0;
	}
	.way {
		display: flex;
		flex-direction: column;
		gap: var(--s-xs);
		padding: var(--s-xl);
		background: var(--canvas);
	}
	.w-icon {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		margin-bottom: var(--s-xs);
		border-radius: var(--r-sm);
		background: var(--primary-tint);
		color: var(--primary);
	}
	address {
		font-style: normal;
	}
	.w-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-top: auto;
		padding-top: var(--s-xs);
		color: var(--primary);
		font-size: var(--fs-ui);
		font-weight: var(--w-medium);
	}
	.w-link:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	/* newsletter field and socials: the footer's, in light colours */
	.news {
		display: flex;
		margin-top: var(--s-xs);
	}
	.news input {
		flex: 1;
		min-width: 0;
		height: 40px;
		padding: 4px 12px;
		border: 1px solid #8c9094;
		border-right: 0;
		border-radius: var(--r-xs) 0 0 var(--r-xs);
		background: #fff;
		color: var(--ink);
		font: inherit;
		font-size: var(--fs-ui);
	}
	.news input:focus {
		outline: none;
		border-color: var(--primary);
	}
	.news button {
		display: grid;
		place-items: center;
		width: 44px;
		height: 40px;
		border: 0;
		border-radius: 0 var(--r-xs) var(--r-xs) 0;
		background: var(--primary);
		color: #fff;
		cursor: pointer;
	}
	.news button:hover {
		background: var(--primary-hover);
	}
	.social {
		display: flex;
		justify-content: flex-end;
		gap: var(--s-xxs);
		/* the 40 px hit areas end 10 px after the icons: line them up with the field's right edge */
		margin: var(--s-xs) -10px 0 0;
	}
	.social a {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		color: var(--primary);
		transition: color 0.15s ease;
	}
	.social a:hover {
		color: var(--primary-hover);
	}

	@media (max-width: 1024px) {
		.grid-ways {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 560px) {
		.fields,
		.grid-ways {
			grid-template-columns: minmax(0, 1fr);
		}
		.submit {
			justify-self: stretch;
		}
	}
</style>
