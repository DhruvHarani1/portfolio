/**
 * Routes that render their own full-screen, non-scrolling UI and should
 * not be wrapped by the marketing site's global chrome (smooth scroll,
 * scroll progress bar, command palette, back-to-top).
 */
export function isImmersiveRoute(pathname: string): boolean {
  return pathname.startsWith("/desktop") || pathname.startsWith("/inbox");
}
