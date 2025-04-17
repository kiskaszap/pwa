import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

clientsClaim();

// Add pre-cached files to Workbox
precacheAndRoute(self.__WB_MANIFEST);

// Routing for SPA-style navigation (excluding files and special routes)
registerRoute(
  ({ request, url }) => {
    const isNav = request.mode === 'navigate';
    const isNotSpecial = !url.pathname.startsWith('/_');
    const isNotFile = !url.pathname.match(/\/[^/?]+\.[^/]+$/);
    return isNav && isNotSpecial && isNotFile;
  },
  createHandlerBoundToURL(`${process.env.PUBLIC_URL}/index.html`)
);

// Handle caching for PNG images with a stale-while-revalidate strategy
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache-images',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

// Listen for custom skip-waiting message
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
