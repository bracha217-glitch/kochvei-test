const C="ktest-b-mw177nle";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
// cache:"reload" עוקף את העותק שהדפדפן שומר עשר דקות, כדי שגרסה חדשה לא תיטען מעותק ישן
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:"reload"})))))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(hit=>{const net=fetch(e.request,{cache:"no-cache"}).then(r=>{if(r&&(r.ok||r.type==="opaque")){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit);return hit||net}))});
