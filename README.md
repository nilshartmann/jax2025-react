# React 2025

Dieses Repository enthält den Source-Code für meinen Talk auf der JAX ["State of React – Edition 2025"](https://react.schule/jax2025-react).

- Achtung! Die Verzeichnisstruktur, der CSS-Code etc. entsprechen nicht Best Practices. Bitte nicht übernehmen 😉.

## Teil 1: Neues in React

- Workspace: `react2025`
- "Normale" React-Anwendung mit experimenteller Vorab-Version von React
- Starten und installieren mit (p)npm: `pnpm install`und `pnpm dev`

## Teil 2: Routing und Fullstack mit TanStack

- Workspace: `tanstack2025`
- Enthält sowohl die SPA- als auch die Fullstack-Version der Anwendung
- Für die Data-Fetching-Beispiele wird ein kleines Backend benötigt, das im Verzeichnis `backend` liegt
  - Dort: `pnpm install` und `pnpm start` ausführen (läuft dann auf http://localhost:7100)
- Je nach Stand der Anwendung muss die App mit `pnpm spa:dev` oder `pnpm ssr:dev` gestartet werden
  - Der initiale Stand auf dem `main`-Branch enthält die SPA-Variante
  - Der "fertige" Stand nach dem Live-Coding sollte - so der Plan - die fertige SSR-Variante enthalten 🙏

## Teil 3: Testen mit Vitest Browser Mode und MSW 
- Workspace: `tanstack2025`
- Exemplarischer Test für die `CardEditor`-Komponente, die TansTack Query verwendet (aber nicht den Router)
- Ausführen des Tests (mit Playwright/Chromium) aus dem `tanstack2025`-Verzeichnis: `pnpm test:browser`


# Kontakt

Bei Fragen oder Problemen, kannst du dich gerne bei mir melden. Hier findest du meine Kontaktdaten: https://nilshartmann.net/kontakt
