// src/data/products.ts
//
// Single source of truth for the Salish Sea Creatives template catalog.
// This data drives the buy buttons on the audience pages and (next) the
// individual template pages.
//
// STRIPE CHECKOUT — how to wire it up:
//   1. In the Stripe dashboard, create a Payment Link for each product.
//      Stripe handles VAT, licensing, and digital delivery natively:
//      https://dashboard.stripe.com/payment-links
//   2. Paste each link's URL into the `checkoutUrl` field below.
//   3. Rebuild. Each button switches from "Inquire" (mailto fallback) to
//      "Buy" (opens the Payment Link). Until a `checkoutUrl` is set, the
//      button falls back to a mailto so the live site never exposes a
//      dead link.

export type Audience = 'developers' | 'authors' | 'creatives'

export interface Product {
  slug: string
  audience: Audience
  name: string
  price: string
  description: string
  chips: string[]
  checkoutUrl: string
}

export const products: Product[] = [
  // ----- Developers · Astro + CMS -----
  {
    slug: 'astro-pages-cms',
    audience: 'developers',
    name: 'Astro + Pages CMS',
    price: '$79',
    description: 'Zero-cost CMS for local service businesses. Client edits via email invite — no GitHub account needed.',
    chips: ['Astro 6', 'Zero CMS cost', 'First-mover'],
    checkoutUrl: '',
  },
  {
    slug: 'astro-payload',
    audience: 'developers',
    name: 'Astro + Payload',
    price: '$99–149',
    description: 'Premium admin UI, TypeScript-first. Self-hosted on a $5/mo VPS. Zero cloud CMS cost.',
    chips: ['Astro 6', 'TypeScript', 'Self-hosted'],
    checkoutUrl: '',
  },
  {
    slug: 'astro-directus',
    audience: 'developers',
    name: 'Astro + Directus',
    price: '$99',
    description: 'Database-first CMS for agencies. REST + GraphQL APIs, self-hosted, zero cloud cost.',
    chips: ['Astro 6', 'TypeScript', 'Agency-tier'],
    checkoutUrl: '',
  },
  {
    slug: 'astro-storyblok',
    audience: 'developers',
    name: 'Astro + Storyblok',
    price: '$99–149',
    description: 'Visual editing for agencies with real budgets. Includes Portage migration path.',
    chips: ['Astro 6', 'Visual Editor', 'Agency-tier'],
    checkoutUrl: '',
  },
  {
    slug: 'astro-decap',
    audience: 'developers',
    name: 'Astro + Decap',
    price: '$79',
    description: 'Capture the existing Decap installed base. Blog or portfolio — keep it simple.',
    chips: ['Astro 6', 'Git-based', 'Entry-level'],
    checkoutUrl: '',
  },

  // ----- Authors · Ghost + Framer -----
  {
    slug: 'editorial-ghost',
    audience: 'authors',
    name: 'Editorial — Ghost',
    price: '$149',
    description: 'A reading-first theme for long-form essays and blogs. Generous type, a distraction-free layout, and your words front and center.',
    chips: ['Ghost', 'No code', 'Setup included'],
    checkoutUrl: '',
  },
  {
    slug: 'newsletter-ghost',
    audience: 'authors',
    name: 'Newsletter — Ghost',
    price: '$149',
    description: 'Substack-style publishing without the platform tax. Built-in memberships, a signup flow, and an issue archive — all yours.',
    chips: ['Ghost', 'Memberships', 'Setup included'],
    checkoutUrl: '',
  },
  {
    slug: 'book-author-framer',
    audience: 'authors',
    name: 'Book author — Framer',
    price: '$149',
    description: 'A polished one-page home for you and your book. Press links, purchase links, and a newsletter hook — no code required.',
    chips: ['Framer', 'No code', 'Setup included'],
    checkoutUrl: '',
  },

  // ----- Creatives · Framer + Astro -----
  {
    slug: 'portfolio-framer',
    audience: 'creatives',
    name: 'Portfolio — Framer',
    price: '$149',
    description: 'A minimal, image-led portfolio for designers and illustrators. No code, instant polish.',
    chips: ['Framer', 'No code', 'Setup included'],
    checkoutUrl: '',
  },
  {
    slug: 'studio-framer',
    audience: 'creatives',
    name: 'Studio — Framer',
    price: '$249',
    description: 'A full agency site: case studies, services, and a contact pipeline built in.',
    chips: ['Framer', 'No code', 'Setup included'],
    checkoutUrl: '',
  },
  {
    slug: 'case-studies-astro',
    audience: 'creatives',
    name: 'Case studies — Astro',
    price: '$149',
    description: 'A content-first showcase for teams who write about their work. Headless, fast, yours.',
    chips: ['Astro', 'Headless', 'Setup included'],
    checkoutUrl: '',
  },
]

// All-access pass (developers page) — its Stripe Payment Link URL goes here too.
export const allAccess = {
  name: 'Every template, one price.',
  price: '$149',
  perks: ['Every template, today and future', 'Lifetime updates', 'One-time payment'],
  checkoutUrl: '',
}
