// Service Worker : met l'application en cache pour qu'elle s'ouvre même sans réseau (PWA).
// IMPORTANT : le numéro de version change à chaque publication (build_gh.py), ce qui force
// les appareils à récupérer la nouvelle version au prochain lancement.
const CACHE = 'planning-maintenance-v11';
const SHELL = ['./', './index.html', './manifest.json', './assets/lhte-logo-anim.mp4',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png', './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon-180.png', './assets/icons/favicon-32.png', './assets/icons/favicon-16.png', './assets/icons/favicon.ico'];
const CDN = ['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'];
self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(SHELL);
    await Promise.all(CDN.map((u) => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Vidéo d'intro : requêtes « Range » (lecture progressive) servies depuis le cache complet.
  if (url.pathname.endsWith('.mp4')) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE); const hit = await c.match('./assets/lhte-logo-anim.mp4');
      if (!hit) return fetch(req);
      const range = req.headers.get('range'); if (!range) return hit;
      const buf = await hit.arrayBuffer(); const m = /bytes=(\d+)-(\d*)/.exec(range); const start = +m[1]; const end = m[2] ? +m[2] : buf.byteLength - 1;
      return new Response(buf.slice(start, end + 1), { status: 206, headers: { 'Content-Type': 'video/mp4', 'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`, 'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes' } });
    })());
    return;
  }
  // Page : réseau d'abord (pour recevoir les mises à jour), cache si hors ligne.
  if (req.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put('./index.html', cp)); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  // Le reste (bibliothèques, polices, icônes) : cache d'abord.
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok && (url.origin === location.origin || /cdnjs|fonts\.(googleapis|gstatic)/.test(url.host))) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); }
    return r;
  }).catch(() => hit)));
});
