# Contributing to ARISE-X1

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/SomeshTalligeriDEV/Arise-X1.git
cd Arise-X1
pnpm install
pnpm dev
```

## Branch Naming

- `feat/` — new features
- `fix/` — bug fixes
- `chore/` — maintenance tasks
- `docs/` — documentation updates

## Commit Style

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): short description
fix(scope): short description
```

## Code Style

- TypeScript strict mode
- Tailwind CSS for styling — no inline styles except where necessary
- Radix UI primitives via shadcn/ui
- Keep components small and focused
