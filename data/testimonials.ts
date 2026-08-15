export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  relationship?: string;
  logo?: string;
  href?: string;
  verified?: boolean;
  note?: string;
};

/**
 * Add only endorsements the person has approved for public use.
 * Until then, the section renders an honest references-available state.
 *
 * Example shape:
 * {
 *   id: 'person-company',
 *   quote: 'Exact approved quote.',
 *   name: 'Full Name',
 *   role: 'Founder',
 *   company: 'Company',
 *   relationship: 'Worked together on product and GTM',
 *   logo: '/logos/company.jpg',
 * }
 */
export const testimonials: Testimonial[] = [];

export const visibleTestimonials = testimonials.filter(
  (testimonial) => testimonial.verified !== false
);
