# React Portfolio Design Document

## 1. Goal

Build a React-based personal website that presents Yingrong Chen's background from resume.tex with a modern, maintainable architecture.

Primary goals:

- Represent full resume content in structured, reusable UI components.
- Keep content easy to update through data files instead of hardcoded JSX.
- Preserve existing hobby storytelling page and make it data-driven.
- Support mobile-first responsive layout and GitHub Pages deployment.

## 2. Source of Truth

Resume source:

- resume.tex

Content sections extracted from resume:

- Header and contact
- Education
- Work Experience
- Community and Research Experience
- Selected Publications and Open Source Code
- Technical Skills

## 3. Recommended Stack

- React 18
- TypeScript
- Vite (build tool)
- React Router (routing)
- CSS Modules or scoped plain CSS
- Optional animation: Framer Motion (light use)

Why:

- Fast development and simple deployment for GitHub Pages.
- Type safety for resume data models.
- Clear route-based structure for Home, Resume, and Hobbies.

## 4. Information Architecture

Routes:

- / : Landing page, hero summary, highlights, featured projects
- /resume : Full resume view from structured data
- /hobbies : Visual hobby journal with photos + text cards
- /publications : Optional dedicated publication list (can be merged into /resume first)

Navigation:

- Persistent top nav with active link state
- Footer with LinkedIn, GitHub, email

## 5. Content Model

Store content under src/data/profile.ts and src/data/resume.ts.

Suggested TypeScript interfaces:

Contact:

- name
- email
- phone
- linkedin
- github

EducationEntry:

- institution
- location
- degree
- startDate
- endDate
- honors[]

ExperienceEntry:

- organization
- location
- role
- startDate
- endDate
- bullets[]
- subroles[] (for Microsoft Contract Software Engineer timeline)

ResearchEntry:

- organization
- location
- role
- startDate
- endDate
- bullets[]

PublicationEntry:

- citation
- venue
- year
- repo
- link

SkillGroup:

- category
- items[]

HobbyEntry:

- title
- image
- alt
- description
- date

## 6. Component Architecture

Core layout components:

- AppShell
- SiteHeader
- SiteFooter
- SectionBlock

Page components:

- HomePage
- ResumePage
- HobbiesPage

Resume feature components:

- ResumeHeaderCard
- EducationSection
- ExperienceSection
- ResearchSection
- PublicationsSection
- SkillsSection
- TimelineItem
- BulletList

Hobby feature components:

- HobbyGrid
- HobbyCard
- EmptyStateCard

## 7. Visual Design Direction

Theme direction:

- Warm-light background with clean scientific visual tone
- Strong typography hierarchy for resume readability
- Accent color for links, timeline markers, and section labels

Typography:

- Heading font: elegant serif (for identity)
- Body font: modern sans-serif (for clarity)

Layout:

- Desktop: two-column hero and card-based resume sections
- Mobile: single-column stacking, larger tap targets

Motion:

- Subtle fade/slide on section reveal
- Avoid heavy animation in resume lists

## 8. Content Mapping from TeX

From resume.tex map to React sections:

Education:

- University of Washington, Graduate Non-Matriculated, Applied Mathematics
- Emory University, B.S. Chemistry (High Honors), Double Major CS, GPA 3.987
- Awards: NSF GRFP Honorable Mention, Barry Goldwater Scholarship

Work Experience:

- Microsoft, Quantum Software Engineer 2 (Jul 2025 - Present)
- Microsoft, Contract Software Engineer (Jan 2024 - Jun 2025)
- Include all bullets on Shor, QROM and adder optimization, Q#, sparse state prep, qdk-chemistry, skala, Azure HPC workflows

Community and Research:

- QOSF Mentee
- Jens Meiler Lab and Rosetta Commons

Publications and Open Source:

- qdk-chemistry arXiv 2026
- skala arXiv 2025
- quant-arith-re QCE 2025

Technical Skills:

- Languages and Libraries
- Domains and Tools

## 9. Proposed Folder Structure

src/

- app/
- components/
- data/
- pages/
- styles/

public/

- images/
- images/hobbies/

Suggested initial files:

- src/app/App.tsx
- src/app/routes.tsx
- src/data/profile.ts
- src/data/resume.ts
- src/data/hobbies.ts
- src/pages/HomePage.tsx
- src/pages/ResumePage.tsx
- src/pages/HobbiesPage.tsx
- src/styles/tokens.css
- src/styles/global.css

## 10. Implementation Plan

Phase 1: Foundation

- Initialize Vite + React + TypeScript
- Add routing and shared layout
- Set design tokens and global styles

Phase 2: Resume Data and Rendering

- Convert resume.tex content into typed data files
- Build resume section components and timeline rendering
- Add publication links and contact actions

Phase 3: Hobbies Page

- Convert current hobby placeholders to data-driven cards
- Add image path validation fallback and empty states
- Keep card template easy to duplicate for new entries

Phase 4: Polish and QA

- Responsive checks at mobile, tablet, and desktop
- Accessibility pass with semantic headings, alt text, and contrast checks
- Performance checks for optimized images and code splitting

Phase 5: Deployment

- Configure base path for GitHub Pages
- Build and deploy static files

## 11. Accessibility and Quality Requirements

- Semantic HTML and heading order
- Keyboard navigation for all controls
- Alt text for all hobby images
- Color contrast meets WCAG AA where feasible
- Avoid long unbroken lines in resume bullets

## 12. Risks and Mitigations

Risk:
TeX formatting details may be lost when manually converting text.

Mitigation:
Keep resume.ts content grouped exactly by TeX sections and role periods.

Risk:
Long bullet lists can reduce readability on mobile.

Mitigation:
Use collapsible groups for less critical bullets on small screens.

Risk:
GitHub Pages route refresh issues with React Router.

Mitigation:
Use HashRouter initially or add a 404 fallback strategy for BrowserRouter.

## 13. Definition of Done

- All resume sections from resume.tex are visible on /resume.
- Home page includes concise highlights and links to full resume sections.
- Hobbies page supports adding new image + text entries with one data object.
- Site is responsive and deploys successfully to GitHub Pages.
- Content updates require editing data files, not component logic.
