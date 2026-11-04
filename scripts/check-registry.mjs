#!/usr/bin/env bun
// Validate the canonical registry without requiring a Quartz build.
import { REGISTRY_DIR, readRegistryRecords, validateRegistry } from './lib/registry.mjs'

try {
  const records = readRegistryRecords(REGISTRY_DIR)
  const errors = validateRegistry(records)
  if (errors.length > 0) {
    console.error(`Registry validation failed with ${errors.length} error(s):`)
    for (const error of errors) console.error(`  ${error}`)
    process.exitCode = 1
  } else {
    console.log(`Registry validation passed: ${records.length} ${records.length === 1 ? 'entry' : 'entries'}`)
  }
} catch (error) {
  console.error(`registry:check: ${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
}
