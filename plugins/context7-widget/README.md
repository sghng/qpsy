# context7-widget

A qpsy-owned local Quartz plugin. It contributes an `afterDOMLoaded` script
(site-wide `postscript`) that appends the
[Context7 chat widget](https://context7.com/docs/howto/chat-widget) to every
page and re-creates it after in-site SPA navigations. The component itself
renders nothing.

- `dist/index.js` is hand-written plain ESM (no imports, no build step).
- The engine resolves this package through the local-source path
  `./plugins/context7-widget` in `quartz.config.yaml`; `scripts/bootstrap-quartz.mjs`
  symlinks the repo's `plugins/` directory into `.quartz-engine/` so the path
  exists at build time. The loader then links it into `.quartz/plugins/`.
- Widget parameters (`src`, `library`) are the `DEFAULTS` in `dist/index.js`.
  Options in `quartz.config.yaml` are ignored for registry-instantiated
  components (the engine instantiates with `undefined`), so the defaults are
  the source of truth.

Server-side prerequisite (Context7 admin, not this repo): the widget must be
enabled for `/sghng/qpsy` with `qpsy.dev` in the allowed domains, else the
chat endpoint answers "Widget is not enabled" / "Origin not allowed".
