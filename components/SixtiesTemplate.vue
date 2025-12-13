<script setup>
import { ref } from 'vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

const mobileMenuOpen = ref(false)

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMenu = () => {
  mobileMenuOpen.value = false
}

useHead({
  title: 'Developer Portfolio (1960s Ads)',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@400;500;600&display=swap' }
  ]
})
</script>

<style scoped>
.font-heading {
  font-family: 'Playfair Display', serif;
}
.font-body {
  font-family: 'Poppins', sans-serif;
}
.section-border {
  border: 3px solid #1a2a4c;
}
</style>

<template>
  <div class="font-body bg-[#fdf6e3] text-[#1a2a4c] antialiased">
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="py-4 sm:py-6">
          <nav class="flex justify-between items-center">
            <div class="font-heading text-xl sm:text-2xl md:text-3xl font-bold truncate max-w-[60%] sm:max-w-none">
              {{ data.hero.title }}
            </div>
            <!-- Desktop menu -->
            <div class="hidden md:flex space-x-6 font-semibold text-lg">
              <a class="hover:text-[#d74a49]" href="#about">About</a>
              <a class="hover:text-[#d74a49]" href="#skills">Skills</a>
              <a class="hover:text-[#d74a49]" href="#projects">Projects</a>
              <a class="hover:text-[#d74a49]" href="#contact">Contact</a>
            </div>
            <!-- Mobile menu button -->
            <button 
              class="md:hidden p-2 border-2 border-[#1a2a4c] bg-white"
              @click="toggleMenu"
              aria-label="Toggle menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </nav>
          <!-- Mobile menu -->
          <div 
            v-if="mobileMenuOpen" 
            class="md:hidden mt-4 py-4 border-2 border-[#1a2a4c] bg-white"
          >
            <div class="flex flex-col space-y-4 font-semibold text-lg text-center">
              <a class="hover:text-[#d74a49] py-2" href="#about" @click="closeMenu">About</a>
              <a class="hover:text-[#d74a49] py-2" href="#skills" @click="closeMenu">Skills</a>
              <a class="hover:text-[#d74a49] py-2" href="#projects" @click="closeMenu">Projects</a>
              <a class="hover:text-[#d74a49] py-2" href="#contact" @click="closeMenu">Contact</a>
            </div>
          </div>
        </header>
        <main class="py-8">
          <section class="text-center mb-12 sm:mb-16 md:mb-24" id="hero">
            <h1 class="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-[#1a2a4c] break-words px-2">
              {{ data.hero.title }}
            </h1>
            <p class="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto font-medium px-2">
              {{ data.hero.subtitle }}
            </p>
          </section>
          <div class="space-y-8 sm:space-y-12 md:space-y-16">
            <section class="bg-[#a7d5e8] section-border p-1 overflow-hidden" id="about">
              <div class="bg-[#fdf6e3] section-border p-4 sm:p-6 md:p-10">
                <h2 class="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">{{ data.about.title }}</h2>
                <div class="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                  <p v-for="(paragraph, index) in data.about.paragraphs" :key="index">
                    {{ paragraph }}
                  </p>
                </div>
              </div>
            </section>
            <section class="section-border bg-[#d74a49] p-1 overflow-hidden" id="skills">
              <div class="bg-[#fdf6e3] section-border p-4 sm:p-6 md:p-10">
                <h2 class="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">My Toolkit</h2>
                <div class="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                  <div v-for="skill in data.skills" :key="skill" class="bg-white border-2 border-[#1a2a4c] py-1.5 sm:py-2 px-3 sm:px-4 text-center text-sm sm:text-base md:text-lg font-semibold">
                    <p>{{ skill }}</p>
                  </div>
                </div>
              </div>
            </section>
            <section class="section-border bg-[#f3d06e] p-1 overflow-hidden" id="projects">
              <div class="bg-[#fdf6e3] section-border p-4 sm:p-6 md:p-10">
                <h2 class="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">Featured Projects</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  <div v-for="(project, index) in data.projects" :key="index" class="border-2 border-[#1a2a4c] bg-white p-4 sm:p-6 flex flex-col h-full space-y-2 sm:space-y-3">
                    <h3 class="text-lg sm:text-xl md:text-2xl font-heading font-bold">{{ project.title }}</h3>
                    <p class="text-sm sm:text-base md:text-lg flex-grow">{{ project.description }}</p>
                    <div class="flex flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm">
                      <span v-for="tag in project.tags" :key="tag" class="bg-[#a7d5e8] border border-[#1a2a4c] text-[#1a2a4c] px-1.5 sm:px-2 py-0.5 sm:py-1 font-medium">{{ tag }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="section-border bg-[#1a2a4c] p-1 overflow-hidden" id="contact">
              <div class="bg-[#fdf6e3] section-border p-4 sm:p-6 md:p-10 text-center">
                <h2 class="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{{ data.contact.title }}</h2>
                <p class="text-sm sm:text-base md:text-lg max-w-lg mx-auto mb-4 sm:mb-6">{{ data.contact.text }}</p>
                <a class="inline-block bg-[#d74a49] text-white font-bold text-base sm:text-lg md:text-xl py-2 sm:py-3 px-6 sm:px-8 border-2 border-[#1a2a4c] hover:bg-[#1a2a4c] hover:text-white transition-colors" :href="'mailto:' + data.contact.email">
                  Email Me
                </a>
                <div class="flex justify-center space-x-4 sm:space-x-6 mt-6 sm:mt-8">
                  <a aria-label="GitHub" class="text-[#1a2a4c] hover:text-[#d74a49]" :href="data.contact.socials.github">
                    <svg aria-hidden="true" class="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24"><path clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" fill-rule="evenodd"></path></svg>
                  </a>
                  <a aria-label="LinkedIn" class="text-[#1a2a4c] hover:text-[#d74a49]" :href="data.contact.socials.linkedin">
                    <svg aria-hidden="true" class="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>
        <footer class="text-center py-6 sm:py-8 mt-8 sm:mt-12">
          <p class="text-sm sm:text-base md:text-lg font-medium">© 2024. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  </div>
</template>
