// Rendered-output checks that are independent of the Quartz engine.
// Keep these helpers dependency-free so they can be tested with small fixtures.

// Return short contexts for unresolved Obsidian wikilink delimiters in visible
// HTML text. Code examples are intentionally excluded: documentation may
// legitimately show [[wikilink]] syntax inside pre/code/script/style blocks.
export function findResidualWikilinks(html) {
  const visibleText = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<pre\b[^>]*>[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi, ' ')

  const findings = []
  for (const delimiter of ['[[', ']]']) {
    const index = visibleText.indexOf(delimiter)
    if (index === -1) continue
    const context = visibleText
      .slice(Math.max(0, index - 40), Math.min(visibleText.length, index + 82))
      .replace(/\s+/g, ' ')
      .trim()
    findings.push(`${delimiter} near "${context}"`)
  }
  return findings
}
