## schussfreude.ch

Rewrite of schussfreude.ch as a headless solution with Next.js (13, App Router), TypeScript (5) and Cockpit CMS (v2).

### env

A `.env` file needs to be provided with:
- API key for Cockpit CMS
- SMTP password for nodemailer (not implemented yet)

### packages

Apart from the default packages, schussfreude uses the following additional packages:
- [react-icons](https://react-icons.github.io/react-icons/)

See `package.json` for details.

### routes

As a predominately blog oriented platform, schussfreude uses both static and dynamic routes.
To accomodate for the unified rendering of same-category blog posts, multiple dynamic routes are in place.
So far, the page structure looks like this, where [slug] indicates a dynamic route:

- /app
    - layout.tsx 
    - page.tsx 
    - not-found.tsx
    - kontakt
        - page.tsx
    - impressum
        - page.tsx
    - dsgvo
        - page.tsx
    - zeitdokumente
        - page.tsx
    - artikel 
        - page.tsx
        - allgemein
            - besuch
                - [slug]
                    - page.tsx
            - sportschiessen
                - [slug]
                    - page.tsx
            - [slug]
                - page.tsx
        - apps
            - [slug]
                - page.tsx
        - buecher
            - [slug]
                -page.tsx
        - zeitschriften
            - swm
                - [slug]
                    - page.tsx
            [slug]
                - page.tsx

### rendering

By default pages, layouts and components in Next.js 13 with App Router are rendered as server components.
Client components are only used where client side interactivity is intended. This is the case in the following components:

- Navbar_Mobile.tsx

### layout

schussfreude uses a root layout and does not employ nested layouts.
Screen responsiveness is typically self-regulated by use of flexbox and grid.
Explicit media queries employ `max-aspect-ratio: 13/9` for mobile (portrait) and `min-aspect-ratio: 13/9` for desktop (landscape) respectively. This ensures that opening a virtual keyboard on mobile (portrait) does not trigger a layout shift.

If separate components for either aspect ratio exist, they are both included in the page/layout/component and rendered conditionally
with media queries. This ensures that no hydration errors occur. This is the case for:

- Navbar.tsx and Navbar_Mobile.tsx
- Footer.tsx and Footer_Mobile.tsx

### assets

Generally assets for posts and pages are provided via CMS. 
Static asset imports using the public directory are used for:

- Logo in Navbar
- Social Icons

### TypeScript

schussfreude enforces strict TypeScript 5 but allows plain JavaScript when and if necessary.
Interfaces are preferred over Types. Generally Interfaces include all variable types regardless of usage.
The `any` type is generally avoided if possible.

#### pull requests

Generally schussfreude.ch is developed and maintained by Marcel Weber alone. You are free to fork the repo (see license), 
and you may open pull requests, but do not expect them to be approved or even considered.

