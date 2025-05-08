export const showQueryDevTools = false;

// SSR einschalten.
// Das würde man in einer echten Anwendung so nicht machen,
//  hier nur für die Demo, um den Umstieg auf SSR
//  zu zeigen
//
//  ⚠️ Es wird nur der Header SSR'ed
//     - SSR hört beim ersten Suspense auf
//     - ohne JavaScript würden wir nix sehen
export const enableSsr = true;
