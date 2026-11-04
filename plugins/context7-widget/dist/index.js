// qpsy local Quartz plugin: Context7 chat widget loader.
//
// Registers a component that renders nothing but contributes an
// afterDOMLoaded script, which the engine bundles into the site-wide
// postscript. The script appends the Context7 widget
// (https://context7.com/widget.js, data-library below) to <body> on every
// page, and re-appends it after in-site navigations: Quartz's SPA router
// morphs <body>, which removes the widget element and never executes
// morphed-in script tags, so the widget must be re-created on each `nav`
// event (the event fires after the morph, see spa.inline.ts).
//
// dist/index.js is hand-written on purpose: the module is plain ESM with no
// imports, so there is no build step to keep in sync.

const DEFAULTS = {
  src: "https://context7.com/widget.js",
  library: "/sghng/qpsy",
}

const loaderScript = (o) =>
  [
    "var qpsyLoadContext7Widget = function () {",
    '  if (document.getElementById("context7-widget")) return',
    '  var s = document.createElement("script")',
    "  s.src = " + JSON.stringify(o.src),
    "  s.setAttribute(" + JSON.stringify("data-library") + ", " + JSON.stringify(o.library) + ")",
    "  document.body.appendChild(s)",
    "}",
    "qpsyLoadContext7Widget()",
    'document.addEventListener("nav", qpsyLoadContext7Widget)',
  ].join("\n")

const Context7Widget = (opts) => {
  const o = { ...DEFAULTS, ...opts }
  const component = () => null
  component.afterDOMLoaded = loaderScript(o)
  return component
}

export { Context7Widget }
