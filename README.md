# CalcHub

CalcHub is a modern, fast, and comprehensive online calculator platform built with Next.js 14, React, TypeScript, and Tailwind CSS. It features a wide array of calculators covering Finance, Health, Math, Academic, and Utility categories.

## Features

- **Blazing Fast**: Static export compatible (`output: 'export'`) for blazing fast load times on CDNs.
- **Responsive Design**: Mobile-first design using Tailwind CSS.
- **Client-side Calculations**: All calculator logic runs in the browser, ensuring data privacy and instant results.
- **SEO Optimized**: Fully optimized with JSON-LD structured data, dynamic meta tags, and canonical URLs.
- **Dark Mode Support**: Seamless light/dark mode switching via `next-themes`.
- **Search Functionality**: Client-side search for instantly finding calculators.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI (via shadcn/ui)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Folder Structure

```
calctools/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── calculators/     # Calculator specific pages
│   │   ├── blog/            # Blog pages
│   │   └── ...              # Legal and static pages
│   ├── components/          # React components
│   │   ├── ui/              # Base UI components (shadcn)
│   │   ├── seo/             # SEO & JSON-LD components
│   │   ├── ads/             # Advertisement components
│   │   └── shared/          # Shared layout components
│   ├── lib/                 # Utilities and logic
│   │   ├── calculators/     # Pure mathematical functions for calculators
│   │   └── ...
│   └── types/               # TypeScript definitions
├── public/                  # Static assets
└── ...
```

## Getting Started

1. **Clone the repository**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
   ```bash
   npm run dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Deployment

This project is configured for static export. To generate the static HTML/CSS/JS files:

```bash
npm run build
```

The output will be located in the `out` directory, which can be deployed to any static hosting service like Vercel, Netlify, GitHub Pages, or AWS S3.

## License

This project is licensed under the MIT License.
