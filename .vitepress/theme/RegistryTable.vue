<script setup>
import { ref, computed, onMounted } from 'vue'

const entries = ref([])
const ready = ref(false)
const q = ref('')

onMounted(async () => {
  try {
    const res = await fetch(import.meta.env.BASE_URL + 'registry.json')
    entries.value = await res.json()
  } catch (err) {
    console.error('failed to load registry.json', err)
  } finally {
    ready.value = true
  }
})

const filtered = computed(() => {
  const needle = q.value.trim().toLowerCase()
  const all = entries.value
  if (!needle) return all
  return all.filter((e) =>
    [e.key, e.title, e.authors, e.venue, e.model, ...(e.topics || []), String(e.year ?? '')]
      .join(' ')
      .toLowerCase()
      .includes(needle)
  )
})
</script>

<template>
  <input
    v-model="q"
    class="registry-filter"
    placeholder="Filter by key, title, author, venue, model, topic, or year"
    aria-label="Filter registry entries"
  />
  <p v-if="ready && entries.length === 0" class="registry-empty">
    registry.json failed to load or is empty. Run <code>bun run index</code> and retry.
  </p>
  <p v-else-if="ready && filtered.length === 0" class="registry-empty">No entries match.</p>
  <table v-else>
    <thead>
      <tr>
        <th>Key</th>
        <th>Paper</th>
        <th>Model</th>
        <th>Topics</th>
        <th>DOI</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="e in filtered" :key="e.key">
        <td><a :href="e.url">{{ e.key }}</a></td>
        <td>{{ e.authors }} ({{ e.year }}). {{ e.title }}. <em>{{ e.venue }}</em></td>
        <td>{{ e.model }}</td>
        <td>{{ (e.topics || []).join(', ') }}</td>
        <td><a :href="'https://doi.org/' + e.doi">{{ e.doi }}</a></td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.registry-filter {
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 16px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.registry-empty {
  color: var(--vp-c-text-2);
}
</style>
