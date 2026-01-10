# Webkarigor Company Website

A modern company website built with Next.js, TypeScript, Tailwind CSS, GSAP, and Shadcn UI.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Animation library
- **Shadcn UI** - Component library
- **Radix UI** - Accessible component primitives

## Project Structure

```
webkarigor-frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── layout/           # Layout components (Header, Footer)
│   └── sections/         # Page sections (Hero, About, Services, etc.)
├── lib/                  # Utility functions
│   ├── utils.ts         # Utility functions (cn, etc.)
│   └── gsap.ts          # GSAP setup
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── constants/            # Application constants
└── public/               # Static assets
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Notes

- This is a setup-only project. Implementation code will be added later.
- All components are placeholders and ready for implementation.
