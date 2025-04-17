const isRunningLocally = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  /^127(?:\.\d{1,3}){3}$/.test(window.location.hostname)
);

export function register(config) {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    const publicURL = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicURL.origin !== window.location.origin) return;

    const swPath = `${process.env.PUBLIC_URL}/service-worker.js`;

    window.addEventListener('load', () => {
      if (isRunningLocally) {
        validateLocalServiceWorker(swPath, config);
        navigator.serviceWorker.ready.then(() => {
          console.log('App is being served via service worker on localhost.');
        });
      } else {
        initiateServiceWorker(swPath, config);
      }
    });
  }
}

function initiateServiceWorker(swPath, config) {
  navigator.serviceWorker
    .register(swPath)
    .then((registration) => {
      registration.onupdatefound = () => {
        const updatingWorker = registration.installing;
        if (!updatingWorker) return;

        updatingWorker.onstatechange = () => {
          if (updatingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('Updated content available, will activate when all tabs close.');
              config?.onUpdate?.(registration);
            } else {
              console.log('App is now cached for offline use.');
              config?.onSuccess?.(registration);
            }
          }
        };
      };
    })
    .catch((err) => {
      console.error('Service worker failed to register:', err);
    });
}

function validateLocalServiceWorker(swPath, config) {
  fetch(swPath, { headers: { 'Service-Worker': 'script' } })
    .then((response) => {
      const isJS = response.headers.get('content-type')?.includes('javascript');
      if (response.status === 404 || !isJS) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => window.location.reload());
        });
      } else {
        initiateServiceWorker(swPath, config);
      }
    })
    .catch(() => {
      console.log('Offline mode: no network connection detected.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => registration.unregister())
      .catch((err) => console.error('Unregistration error:', err));
  }
}
