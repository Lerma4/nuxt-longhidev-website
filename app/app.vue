<script setup>
import { ref, computed } from 'vue'
import { usePortfolioData } from '~~/composables/usePortfolioData'
import ModernTemplate from '~~/components/ModernTemplate.vue'
import Win95Template from '~~/components/Win95Template.vue'

const portfolioData = usePortfolioData()
const currentTemplate = ref('modern')

const templates = {
  modern: ModernTemplate,
  win95: Win95Template
}

const currentTemplateComponent = computed(() => templates[currentTemplate.value])
</script>

<template>
  <div>
    <div class="fixed top-4 right-4 z-50 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg p-2 flex items-center space-x-2 opacity-90 hover:opacity-100 transition-opacity">
      <label class="text-xs font-bold uppercase tracking-wider text-gray-500">Theme:</label>
      <select v-model="currentTemplate" class="bg-transparent text-sm font-medium focus:outline-none cursor-pointer text-gray-800 dark:text-gray-200">
        <option value="modern">Modern</option>
        <option value="win95">Windows 95</option>
      </select>
    </div>
    
    <component :is="currentTemplateComponent" :data="portfolioData" />
  </div>
</template>
