# Repository Cleanup Plan

## Current Situation

De GitHub repository https://github.com/MarvinNL046/Skilllinkup bevat nog oude blogar template bestanden van de "first commit". We willen een fresh start met alleen de huidige Next.js 15 applicatie.

## Strategie: Clean Slate (Aanbevolen)

### Stap 1: Backup maken (Already done ✅)
```bash
# Al gemaakt: ~/Documenten/skillLinkup-backup-20251002
```

### Stap 2: Git history herschrijven
```bash
# Verwijder alle commits en start opnieuw
cd ~/Documenten/skillLinkup

# Verwijder .git directory
rm -rf .git

# Initialiseer nieuwe git repo
git init

# Voeg remote toe
git remote add origin https://github.com/MarvinNL046/Skilllinkup.git

# Voeg alleen de huidige bestanden toe
git add app/ src/ lib/ documentation/ public/ posts/
git add package.json package-lock.json next.config.js tsconfig.json
git add .gitignore README.md CLAUDE.md

# Maak eerste commit
git commit -m "feat: Initial Next.js 15 setup with App Router

- Next.js 15.0.0 with App Router architecture
- React 18.3.1
- TypeScript support
- SEO blog homepage implementation
- Multi-tenant architecture planning
- Git Worktrees setup for CMS and Admin subdomains"

# Force push naar GitHub (overschrijft oude history)
git push -f origin main
```

### Stap 3: Worktrees opnieuw aanmaken
```bash
# Maak branches aan
git checkout -b cms/main
git push -u origin cms/main

git checkout -b admin/main
git push -u origin admin/main

git checkout main

# Verwijder oude worktrees
git worktree remove ../skillLinkup-cms --force
git worktree remove ../skillLinkup-admin --force

# Maak nieuwe worktrees
git worktree add ../skillLinkup-cms cms/main
git worktree add ../skillLinkup-admin admin/main
```

## Alternatieve Strategie: Cleanup Commit (Minder aanbevolen)

Als je de oude history wilt behouden:

```bash
# Stage alle deletions
git add -A

# Stage alle nieuwe bestanden
git add app/ src/ lib/ documentation/ public/ posts/
git add package.json package-lock.json next.config.js tsconfig.json

# Maak commit
git commit -m "refactor: Remove old blogar template, add Next.js 15 app"

# Push
git push origin main
git push origin cms/main
git push origin admin/main
```

## Voordelen Clean Slate:
1. ✅ Schone commit history
2. ✅ Geen oude blogar bestanden in history
3. ✅ Kleinere repository size
4. ✅ Professionele start

## Nadelen Clean Slate:
1. ❌ Verliest oude commit history (maar die is toch leeg/onbruikbaar)
2. ❌ Requires force push (acceptabel voor nieuw project)

## Voordelen Cleanup Commit:
1. ✅ Behoudt volledige history
2. ✅ Geen force push nodig

## Nadelen Cleanup Commit:
1. ❌ Oude bestanden blijven in Git history
2. ❌ Grotere repository size
3. ❌ Minder schone commit log

## Aanbeveling: Clean Slate

Omdat dit een nieuw project is en de oude "first commit" alleen template bestanden bevat, raad ik **Clean Slate** aan.

## Volgende Stappen

1. Kies strategie: Clean Slate (aanbevolen) of Cleanup Commit
2. Voer gekozen strategie uit
3. Verifieer met `git log`
4. Check GitHub repository
5. Maak worktrees opnieuw aan
6. Verifieer dat alles werkt
