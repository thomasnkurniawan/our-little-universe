---
trigger: always_on
---

---
trigger: manual
---
# Windsurf Project Rules

## Tech Stack
- React (Vite)
- JavaScript (no TypeScript)
- Tailwind CSS
- clsx for conditional classes
- No additional UI libraries unless explicitly requested

## Coding Style
- Use `export default function ComponentName()` for React components
- Use named exports for hooks and utilities
- Avoid anonymous default exports
- Prefer simple, readable code over clever abstractions

## Component Guidelines
- Keep components small and focused
- UI components live in `src/components/ui`
- Page-level components live in `src/pages`
- Layout components live in `src/layouts`
- Reusable helpers go to `src/utils`

## Styling Rules
- Use Tailwind CSS utility classes
- Use `cn()` helper from `src/utils/cn.js` for conditional class names
- Do NOT inline complex conditional logic inside JSX
- Do NOT introduce CSS files per component

## State Management
- Use React `useState` and `useEffect`
- Avoid global state libraries (Redux, Zustand, etc.)
- Use localStorage only when necessary

## Scope Control
- Do NOT overengineer solutions
- Do NOT introduce backend, auth, or database unless explicitly requested
- Prefer mock data or static data for examples

## File Generation Rules
- Only create files that are explicitly requested
- Do NOT create extra folders or configs unless asked
- Follow the existing project structure strictly

## Goal
This project is optimized for:
- Fast development
- Small to medium side projects
- Easy cloning and reuse
- Quick deployment (Vercel / Netlify)

## Design System
- Overall theme: minimalist & monochrome
- Primary colors: black, white, slate, gray
- Avoid bright or saturated colors unless explicitly requested
- Prefer neutral UI with subtle contrast

## Styling Guidelines
- Use Tailwind default grayscale palette (slate, gray, neutral)
- Avoid excessive shadows, gradients, or decorative effects
- Prefer spacing, typography, and layout over visual decoration
- UI should feel clean, calm, and functional

## Component Aesthetics
- Rounded corners should be subtle (rounded-md / rounded-lg)
- Shadows should be light or minimal (shadow-sm or none)
- Focus on readability and hierarchy, not visual flair


