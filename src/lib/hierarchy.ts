// src/lib/hierarchy.ts

// 1. Define the exact parent for every specific path
// key: Child Route | value: Parent Route
export const ROUTE_HIERARCHY: Record<string, string> = {
  // Level 1 -> Home
  '/services/video-editing': '/',
  '/services/web-dev': '/',
  '/services/ai-agents': '/',
  '/about': '/',
  '/process': '/',
  '/careers': '/',
  '/contact': '/',
  
  // Level 2 -> Service Parents
  // Note: Dynamic IDs will be handled by logic, but static children go here
  '/services/video-editing/cat-shorts': '/services/video-editing',
  '/services/video-editing/cat-corporate': '/services/video-editing',
};

// 2. Helper to determine parent dynamically
export function getLogicalParent(currentPath: string): string {
  // Remove hash symbol if present
  const path = currentPath.replace('#', '');

  // A. Exact Match in Config
  if (ROUTE_HIERARCHY[path]) {
    return ROUTE_HIERARCHY[path];
  }

  // B. Dynamic Route Handling (e.g., /services/video-editing/123)
  // If we are deep in video editing, go back to video editing hub
  if (path.includes('/services/video-editing/')) {
    return '/services/video-editing';
  }
  
  if (path.includes('/services/web-dev/')) {
    return '/services/web-dev';
  }

  // C. Default Fallback (Home)
  // If we are at root, parent is root (stops loops)
  if (path === '/' || path === '') return '/';
  
  return '/';
}