# Blog Pipeline Upgrade — Match Go2Thailand Quality

**Date**: 2026-03-07
**Status**: Approved

## Problem

The Skilllinkup blog pipeline has 10 quality gaps vs go2thailand, causing daily post overwrites, wasted API costs, and no resilience.

## Changes

### 1. Fuzzy Dedup (content-generator.ts — selectTopic)
- Replace exact `slugify(topic) === slug` with keyword + topic word matching
- 60%+ fuzzy match OR all significant words match
- Extended stop words list
- Remove useless `completedTopicsCache`
- Graceful `return null` instead of `throw Error` on queue exhaustion

### 2. AI Provider Resilience (content-generator.ts — callClaude)
- Switch from Sonnet to Haiku 4.5 (20x cheaper, sufficient for blog posts)
- Add 2x retry with exponential backoff
- Add OpenAI GPT-4o-mini fallback
- Add 120s timeout per call

### 3. Anti-Hallucination (content-generator.ts — buildPrompt)
- Add strict venue/name prohibition rule (no names unless in reference data)
- Add hedging language requirement
- Strengthen "no reference data" instructions

### 4. Image Format (image-generator.ts)
- Change from PNG to WebP (smaller files)
- Update GitHub commit path accordingly

### 5. Pipeline Orchestration (generate/route.ts)
- Handle `selectTopic` returning null gracefully
- Log fact-check risk level, warn on "high" (don't block yet)
- Remove completedTopicsCache usage

### 6. Cron Route (generate-blog/route.ts)
- No changes needed (thin wrapper)

## Files Modified
- `src/lib/pipeline/content-generator.ts` — dedup, AI calls, prompt
- `src/lib/pipeline/image-generator.ts` — WebP output
- `src/lib/pipeline/github-commit.ts` — .webp path
- `src/app/api/pipeline/generate/route.ts` — null topic handling
