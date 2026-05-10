export interface Project {
  slug: string
  title: string
  client: string
  description: string
  role: string
  tech: string[]
  url?: string
  image?: string
  featured: boolean
  year: number
}

export const projects: Project[] = [
  {
    slug: 'university-of-worcester',
    title: 'University of Worcester',
    client: 'University of Worcester',
    description:
      'Rebuilt the university\'s public-facing website on Contensis CMS with a focus on accessibility and student recruitment conversion. Delivered a component library used across 300+ pages with full WCAG 2.2 AA compliance.',
    role: 'Lead Frontend Developer',
    tech: ['React', 'TypeScript', 'Contensis', 'Styled Components', 'WCAG 2.2'],
    url: 'https://www.worcester.ac.uk',
    featured: true,
    year: 2025,
  },
  {
    slug: 'bcp-council',
    title: 'BCP Council',
    client: 'Bournemouth, Christchurch and Poole Council',
    description:
      'Complete site redesign for one of the UK\'s largest unitary authorities, built to the GOV.UK Design System and fully integrated with Contensis CMS. Delivered accessible, standards-compliant public services for hundreds of thousands of residents, with a strong focus on WCAG 2.2 AA compliance throughout.',
    role: 'Lead Frontend Developer',
    tech: ['React', 'TypeScript', 'Contensis', 'GOV.UK Design System', 'WCAG 2.2', 'REST APIs'],
    url: 'https://www.bcpcouncil.gov.uk',
    featured: true,
    year: 2023,
  },
  {
    slug: 'st-marys-university',
    title: "St Mary's University",
    client: "St Mary's University, Twickenham",
    description:
      "Redeveloped the university's digital presence on Contensis CMS, delivering a modern, accessible website focused on prospective student recruitment. Implemented a reusable component library and ensured WCAG 2.2 AA compliance throughout.",
    role: 'Senior Frontend Developer',
    tech: ['React', 'TypeScript', 'Contensis', 'CSS Modules', 'WCAG 2.2'],
    url: 'https://www.stmarys.ac.uk',
    featured: true,
    year: 2024,
  },
  {
    slug: 'university-of-sunderland',
    title: 'University of Sunderland',
    client: 'University of Sunderland',
    description:
      'End-to-end redevelopment of the university website. Led component architecture decisions, established frontend coding standards, and collaborated closely with the design team to deliver a high-performance, accessible experience. Also responsible for third-party integrations and data imports — including CSV pipelines and content migration tooling to manage and transform large datasets into the CMS.',
    role: 'Senior Frontend Developer',
    tech: ['React', 'TypeScript', 'Contensis', 'Styled Components', 'Node.js', 'CSV Imports', 'Data Migration'],
    url: 'https://www.sunderland.ac.uk',
    featured: true,
    year: 2025,
  },
  {
    slug: 'erbium-records',
    title: 'Erbium Records',
    client: 'Erbium Records',
    description:
      'Built the website for an independent music label, delivering a clean and visually distinctive digital presence. Integrated Contentful CMS to allow the client to manage releases, artists, and editorial content without developer involvement.',
    role: 'Frontend Developer',
    tech: ['React', 'TypeScript', 'CSS Modules', 'Contentful CMS'],
    url: 'https://erbium.vercel.app',
    featured: true,
    year: 2023,
  },
  {
    slug: 'zengenti-contensis',
    title: 'Contensis CMS Platform',
    client: 'Zengenti',
    description:
      'Ongoing work helping clients get the most out of Contensis CMS — modelling content structures, mapping data through the management and delivery APIs, and wiring everything through to React frontends. Bridges the gap between CMS configuration and what the app actually needs to render.',
    role: 'Frontend Developer',
    tech: ['Contensis', 'React', 'TypeScript', 'Management API', 'Delivery API', 'REST APIs'],
    url: 'https://www.contensis.com',
    featured: false,
    year: 2025,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
