<template>
  <div class="font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 antialiased">
    <div class="relative min-h-screen">
      <div class="grain-overlay"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header class="py-6">
          <nav class="flex justify-between items-center">
            <div class="text-primary text-xl font-bold uppercase tracking-widest">
              Portfolio
            </div>
            <div class="hidden md:flex space-x-8 text-sm uppercase font-medium tracking-wider">
              <a class="hover:text-primary transition-colors duration-300" href="#about">About</a>
              <a class="hover:text-primary transition-colors duration-300" href="#skills">Skills</a>
              <a class="hover:text-primary transition-colors duration-300" href="#projects">Projects</a>
              <a class="hover:text-primary transition-colors duration-300" href="#contact">Contact</a>
            </div>
          </nav>
        </header>
        <main class="py-12 md:py-24">
          <section class="text-center relative mb-24 md:mb-32" id="hero">
            <div class="relative inline-block">
              <div class="absolute -top-8 -left-8 w-full border-t-2 border-l-2 border-primary h-12"></div>
              <div class="absolute -bottom-8 -right-8 w-full border-b-2 border-r-2 border-primary h-12"></div>
              <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter bg-primary text-background-dark dark:text-background-dark py-4 px-8 relative z-10">
                Enigma
              </h1>
            </div>
            <p class="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Full-stack developer crafting modern, responsive, and performant web experiences with a retro-futuristic twist.
            </p>
          </section>
          <section class="mb-24 md:mb-32" id="about">
            <div class="border-2 border-primary p-1">
              <div class="bg-background-light dark:bg-background-dark p-8 md:p-12">
                <h2 class="text-4xl md:text-5xl font-bold uppercase text-primary tracking-tighter mb-6">About Me</h2>
                <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    Hello! I'm a passionate full-stack developer with a love for creating beautiful and functional applications. My journey into code began with a fascination for 90s aesthetics and early internet culture, which I now blend with modern technologies to build unique digital experiences.
                  </p>
                  <p>
                    With expertise in both front-end and back-end development, I thrive on tackling complex challenges and turning ideas into reality. From designing intuitive user interfaces to architecting robust server-side logic, I'm dedicated to writing clean, efficient, and scalable code. When I'm not coding, you can find me exploring vintage video games or tinkering with synthesizers.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section class="mb-24 md:mb-32" id="skills">
            <h2 class="text-4xl md:text-5xl font-bold uppercase text-primary tracking-tighter mb-8">Skills</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">JavaScript</p>
              </div>
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">React</p>
              </div>
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">Node.js</p>
              </div>
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">Python</p>
              </div>
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">SQL</p>
              </div>
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">TypeScript</p>
              </div>
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">Next.js</p>
              </div>
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">GraphQL</p>
              </div>
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">Docker</p>
              </div>
              <div class="border border-primary/50 bg-primary/10 dark:bg-primary/5 p-4 text-center">
                <p class="font-semibold">Tailwind CSS</p>
              </div>
            </div>
          </section>
          <section class="mb-24 md:mb-32" id="projects">
            <h2 class="text-4xl md:text-5xl font-bold uppercase text-primary tracking-tighter mb-8">Projects</h2>
            <div class="grid md:grid-cols-2 gap-8 md:gap-12">
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-primary opacity-0 group-hover:opacity-75 transition duration-300"></div>
                <div class="relative border-2 border-primary p-1 h-full">
                  <div class="relative bg-background-light dark:bg-background-dark p-6 h-full flex flex-col">
                    <h3 class="text-2xl font-bold uppercase text-primary mb-2">Project One</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">A web application that visualizes real-time data using D3.js, featuring a retro-inspired interface.</p>
                    <div class="flex space-x-2 text-sm">
                      <span class="bg-primary/20 text-primary px-2 py-1 font-mono">React</span>
                      <span class="bg-primary/20 text-primary px-2 py-1 font-mono">Node.js</span>
                      <span class="bg-primary/20 text-primary px-2 py-1 font-mono">D3.js</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-primary opacity-0 group-hover:opacity-75 transition duration-300"></div>
                <div class="relative border-2 border-primary p-1 h-full">
                  <div class="relative bg-background-light dark:bg-background-dark p-6 h-full flex flex-col">
                    <h3 class="text-2xl font-bold uppercase text-primary mb-2">Project Two</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">An e-commerce platform with a custom CMS, built with Next.js and integrated with Stripe for payments.</p>
                    <div class="flex space-x-2 text-sm">
                      <span class="bg-primary/20 text-primary px-2 py-1 font-mono">Next.js</span>
                      <span class="bg-primary/20 text-primary px-2 py-1 font-mono">GraphQL</span>
                      <span class="bg-primary/20 text-primary px-2 py-1 font-mono">PostgreSQL</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="group relative">
                <div class="absolute -inset-0.5 bg-primary opacity-0 group-hover:opacity-75 transition duration-300"></div>
                <div class="relative border-2 border-primary p-1 h-full">
                  <div class="relative bg-background-light dark:bg-background-dark p-6 h-full flex flex-col">
                    <h3 class="text-2xl font-bold uppercase text-primary mb-2">Project Three</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">A collaborative pixel-art editor using WebSockets for live updates and a cloud-based storage system.</p>
                    <div class="flex space-x-2 text-sm">
                      <span class="bg-primary/20 text-primary px-2 py-1 font-mono">TypeScript</span>
                      <span class="bg-primary/20 text-primary px-2 py-1 font-mono">WebSockets</span>
                      <span class="bg-primary/20 text-primary px-2 py-1 font-mono">Firebase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="text-center" id="contact">
            <h2 class="text-4xl md:text-5xl font-bold uppercase text-primary tracking-tighter mb-4">Get In Touch</h2>
            <p class="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">I'm currently open to new opportunities. Feel free to reach out via email or connect with me on social media.</p>
            <a class="inline-block bg-primary text-background-dark dark:text-background-dark font-bold uppercase tracking-widest py-3 px-8 hover:bg-opacity-90 transition-colors duration-300" href="mailto:hello@example.com">
              Email Me
            </a>
            <div class="flex justify-center space-x-6 mt-8">
              <a aria-label="GitHub" class="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors duration-300" href="#">
                <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" fill-rule="evenodd"></path></svg>
              </a>
              <a aria-label="LinkedIn" class="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors duration-300" href="#">
                <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
          </section>
        </main>
        <footer class="text-center py-8 mt-16 border-t border-primary/20">
          <p class="text-sm text-gray-500 dark:text-gray-400">© 2024. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  </div>
</template>
