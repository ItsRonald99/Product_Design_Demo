# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The Next.js application lives entirely in `fintech-app/`. There is no code at the repo root — it exists only to hold the git history and the Vercel deployment config.

All development work happens inside `fintech-app/`. See `fintech-app/CLAUDE.md` for the full architecture reference, commands, and coding conventions.

## Vercel deployment

The project is deployed from this repo with **Root Directory set to `fintech-app`** and **Framework Preset set to Next.js**. Build command is `npm run build`, install command is `npm install`, output directory is `.next`. These must be set explicitly in the Vercel project settings — without them Vercel will not detect the framework and will produce an empty 41ms build that deploys as a 404.
