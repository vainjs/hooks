# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

@vainjs/monorepo containing React hooks library (`@vainjs/hooks`) and utility library (`@vainjs/ore`). Uses pnpm workspaces with Turborepo orchestration.

## Project Structure

```
packages/
  hooks/          # React hooks library (@vainjs/hooks)
  ore/            # Utility library (@vainjs/ore)
docs/             # Storybook documentation site
```

## Commands

```bash
pnpm install       # Install all dependencies
pnpm build        # Build all packages via turbo
pnpm test         # Run all tests via turbo
pnpm dev          # Run dev mode for all packages
pnpm prepare      # Install husky git hooks
```

### Individual Packages

```bash
# @vainjs/hooks or @vainjs/ore
pnpm --filter @vainjs/hooks build   # Build specific package
pnpm --filter @vainjs/hooks test   # Test specific package
pnpm --filter @vainjs/hooks dev    # Watch mode for specific package
```

## Architecture

- **@vainjs/hooks**: React hooks (useDebounce, useIntersectionObserver, usePagination, etc.) in `packages/hooks/src/`
- **@vainjs/ore**: Utility functions (array, async, control, object, string, typed) in `packages/ore/src/`
- **docs**: Storybook site with `@vainjs/hooks` documentation

Both packages use Rollup for bundling (ESM + CJS), Jest for testing, and export TypeScript types.

## Build Outputs

- `dist/es/` - ES modules
- `dist/cjs/` - CommonJS
- `dist/umd/` - UMD (ore only)

## Code Style

ESLint + Prettier with React Hooks plugin. Commit messages follow Conventional Commits (commitlint).
