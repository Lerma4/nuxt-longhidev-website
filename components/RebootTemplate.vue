<template>
  <div class="reboot-template bg-background-dark text-white font-display overflow-x-hidden antialiased selection:bg-primary selection:text-white">
    <!-- Sticky Navigation (Floating Dock Style) -->
    <div class="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 reveal-up">
      <nav class="flex items-center gap-1 bg-surface-dark/80 backdrop-blur-md border border-surface-border rounded-full p-2 pl-6 pr-2 shadow-2xl shadow-black/50 transition-all hover:border-primary/50">
        <div class="mr-6 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[20px]">terminal</span>
          <span class="font-bold text-sm tracking-tight text-white">{{ data.hero.title }}</span>
        </div>
        <div class="flex items-center gap-1">
          <a class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors" href="#about">About</a>
          <a class="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors" href="#work">Work</a>
          <a class="hidden sm:block px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors" href="#skills">Skills</a>
        </div>
        <a class="ml-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors" href="#contact">
          Contact
        </a>
      </nav>
    </div>

    <!-- Hero Section -->
    <section class="relative flex min-h-screen w-full flex-col justify-center items-center px-4 sm:px-10 py-20 overflow-hidden">
      <!-- Abstract Background Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>

      <div class="layout-content-container flex flex-col max-w-[1024px] w-full z-10 text-center">
        <div class="flex flex-col gap-6 items-center">
          <div class="reveal-up delay-100 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span class="text-xs font-medium text-gray-300 uppercase tracking-wider">Available for new projects</span>
          </div>

          <h1 class="reveal-up delay-200 text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 pb-2">
            Building Digital <br />
            <span class="text-white">Products.</span>
          </h1>

          <p class="reveal-up delay-300 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed font-light">
            {{ data.hero.subtitle }}
          </p>

          <div class="reveal-up delay-300 flex flex-wrap gap-4 justify-center mt-4">
            <a class="group relative flex items-center justify-center gap-2 h-12 px-8 bg-primary text-white text-base font-bold rounded-lg overflow-hidden transition-all hover:bg-primary-hover" href="#work">
              <span>View Selected Work</span>
              <span class="material-symbols-outlined text-[18px] transition-transform group-hover:translate-y-1">arrow_downward</span>
            </a>
            <a class="flex items-center justify-center h-12 px-8 bg-white/5 border border-white/10 text-white hover:bg-white/10 text-base font-medium rounded-lg transition-colors" :href="data.contact.socials.github" target="_blank">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span class="text-xs uppercase tracking-widest text-gray-500">Scroll</span>
        <span class="material-symbols-outlined text-gray-500">expand_more</span>
      </div>
    </section>

    <!-- Marquee Skills Section -->
    <div id="skills" class="w-full border-y border-white/5 bg-surface-dark/30 py-8 backdrop-blur-sm overflow-hidden">
      <div class="marquee-container">
        <div class="marquee-content flex gap-12 items-center px-4 text-gray-500 font-bold text-xl sm:text-2xl uppercase tracking-widest select-none">
          <template v-for="(skill, index) in data.skills" :key="'skill-1-' + index">
            <span>{{ skill }}</span>
            <span>•</span>
          </template>
          <!-- Duplicate for seamless loop -->
          <template v-for="(skill, index) in data.skills" :key="'skill-2-' + index">
            <span>{{ skill }}</span>
            <span>•</span>
          </template>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <section id="about" class="py-24 sm:py-32 px-4 sm:px-10 flex justify-center bg-background-dark">
      <div class="max-w-[1024px] w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div class="md:col-span-4">
          <div class="sticky top-32">
            <h2 class="text-sm font-bold uppercase tracking-widest text-primary mb-2">{{ data.about.title }}</h2>
            <h3 class="text-3xl font-bold text-white leading-tight">Bridging design and engineering.</h3>
          </div>
        </div>
        <div class="md:col-span-8 flex flex-col gap-8">
          <p v-for="(paragraph, index) in data.about.paragraphs" :key="index" class="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light">
            {{ paragraph }}
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div class="p-6 rounded-xl bg-surface-dark border border-white/5">
              <span class="material-symbols-outlined text-primary mb-4 text-3xl">code</span>
              <h4 class="text-lg font-bold text-white mb-2">Engineering</h4>
              <p class="text-gray-400 text-sm leading-relaxed">Clean, scalable code using modern stacks like React, Next.js, and Node. Performance first approach.</p>
            </div>
            <div class="p-6 rounded-xl bg-surface-dark border border-white/5">
              <span class="material-symbols-outlined text-primary mb-4 text-3xl">palette</span>
              <h4 class="text-lg font-bold text-white mb-2">Design</h4>
              <p class="text-gray-400 text-sm leading-relaxed">Pixel-perfect implementation with a keen eye for typography, layout, and micro-interactions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Selected Work Section -->
    <section id="work" class="py-24 px-4 sm:px-10 flex justify-center">
      <div class="max-w-[1024px] w-full flex flex-col gap-20">
        <div class="flex items-end justify-between border-b border-white/10 pb-6">
          <h2 class="text-4xl sm:text-5xl font-bold text-white tracking-tight">Selected Work</h2>
          <span class="hidden sm:block text-gray-500 font-mono text-sm">({{ String(data.projects.length).padStart(2, '0') }})</span>
        </div>

        <!-- Project Cards -->
        <div v-for="(project, index) in data.projects" :key="index" class="group hover-card-zoom cursor-pointer">
          <div class="relative w-full aspect-video sm:aspect-[2/1] rounded-2xl overflow-hidden bg-surface-dark mb-6 border border-white/5">
            <div class="card-image w-full h-full bg-gradient-to-br from-primary/30 via-primary/10 to-surface-dark flex items-center justify-center">
              <span class="text-6xl text-primary/50">{{ index + 1 }}</span>
            </div>
            <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span class="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">View Case Study</span>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 class="text-2xl font-bold text-white group-hover:text-primary transition-colors">{{ project.title }}</h3>
              <p class="text-gray-400 mt-1">{{ project.description }}</p>
            </div>
            <div class="flex gap-2 flex-wrap">
              <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-400">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services / Approach -->
    <section class="py-24 px-4 sm:px-10 flex justify-center bg-surface-dark/30 border-y border-white/5">
      <div class="max-w-[1024px] w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="flex flex-col gap-4 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-primary/30 transition-colors">
            <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">speed</span>
            </div>
            <h3 class="text-xl font-bold text-white">Performance First</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Websites should be fast. I optimize for Core Web Vitals to ensure smooth user experiences and better SEO rankings.
            </p>
          </div>
          <div class="flex flex-col gap-4 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-primary/30 transition-colors">
            <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">devices</span>
            </div>
            <h3 class="text-xl font-bold text-white">Responsive & Fluid</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Layouts that adapt gracefully to any screen size, from large 4k monitors down to the smallest mobile devices.
            </p>
          </div>
          <div class="flex flex-col gap-4 p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-primary/30 transition-colors">
            <div class="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <span class="material-symbols-outlined">accessibility_new</span>
            </div>
            <h3 class="text-xl font-bold text-white">Accessible</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Building for everyone. Following WAI-ARIA standards to ensure content is usable by people with disabilities.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer / Contact -->
    <footer id="contact" class="py-24 sm:py-32 px-4 sm:px-10 flex justify-center bg-background-dark relative overflow-hidden">
      <!-- Background radial gradient -->
      <div class="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-surface-dark to-transparent pointer-events-none"></div>
      
      <div class="max-w-[1024px] w-full z-10 flex flex-col items-center text-center gap-12">
        <h2 class="text-4xl sm:text-6xl font-black text-white tracking-tighter">
          {{ data.contact.title }}<br />
          <span class="text-primary">Let's connect.</span>
        </h2>
        
        <a class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-surface-dark border border-white/10 rounded-full overflow-hidden transition-transform hover:scale-105" :href="'mailto:' + data.contact.email">
          <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56 opacity-20"></span>
          <span class="relative flex items-center gap-3">
            <span class="material-symbols-outlined">mail</span>
            {{ data.contact.email }}
          </span>
        </a>
        
        <div class="flex gap-8 mt-8">
          <a class="text-gray-400 hover:text-white text-sm font-medium transition-colors" :href="data.contact.socials.linkedin">LinkedIn</a>
          <a class="text-gray-400 hover:text-white text-sm font-medium transition-colors" :href="data.contact.socials.github">GitHub</a>
        </div>
        
        <div class="w-full h-px bg-white/10 mt-12"></div>
        
        <div class="flex flex-col sm:flex-row justify-between items-center w-full text-xs text-gray-500 gap-4">
          <p>© {{ new Date().getFullYear() }} {{ data.hero.title }}. All Rights Reserved.</p>
          <p>Built with Nuxt & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* Custom scrollbar for modern feel */
.reboot-template ::-webkit-scrollbar {
  width: 8px;
}
.reboot-template ::-webkit-scrollbar-track {
  background: #131118;
}
.reboot-template ::-webkit-scrollbar-thumb {
  background: #2e2839;
  border-radius: 4px;
}
.reboot-template ::-webkit-scrollbar-thumb:hover {
  background: #7a3df5;
}

/* Subtle reveal animation for sections */
.reveal-up {
  animation: revealUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

/* Delay utility classes */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

@keyframes revealUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Marquee Animation */
.marquee-container {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.marquee-content {
  display: inline-block;
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Hover effect for cards */
.hover-card-zoom:hover .card-image {
  transform: scale(1.05);
}
.hover-card-zoom .card-image {
  transition: transform 0.5s ease-out;
}

/* Color variables using Tailwind custom colors */
.bg-background-dark {
  background-color: #131118;
}
.bg-surface-dark {
  background-color: #1E1B26;
}
.border-surface-border {
  border-color: #2e2839;
}
.bg-primary-hover {
  background-color: #682bd9;
}
</style>
