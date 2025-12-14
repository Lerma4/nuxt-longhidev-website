<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

useHead({
  title: 'Developer Portfolio (Terminal)',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap' }
  ]
})

// Terminal state
const currentPath = ref('/home/guest')
const commandHistory = ref([])
const inputCommand = ref('')
const terminalOutput = ref(null)
const inputRef = ref(null)
const currentTime = ref('')
let timeInterval = null

// Update time
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

// Virtual filesystem based on portfolio data
const filesystem = computed(() => ({
  '/home/guest': {
    type: 'directory',
    contents: ['about', 'skills', 'projects', 'contact']
  },
  '/home/guest/about': {
    type: 'directory',
    contents: ['readme.txt']
  },
  '/home/guest/about/readme.txt': {
    type: 'file',
    content: props.data.about.paragraphs.join('\n\n')
  },
  '/home/guest/skills': {
    type: 'directory',
    contents: ['skills.txt']
  },
  '/home/guest/skills/skills.txt': {
    type: 'file',
    content: props.data.skills.join('\n')
  },
  '/home/guest/projects': {
    type: 'directory',
    contents: props.data.projects.map((_, i) => `project_${i + 1}.txt`)
  },
  ...props.data.projects.reduce((acc, project, i) => {
    acc[`/home/guest/projects/project_${i + 1}.txt`] = {
      type: 'file',
      content: `Title: ${project.title}\n\nDescription:\n${project.description}\n\nTags: ${project.tags.join(', ')}`
    }
    return acc
  }, {}),
  '/home/guest/contact': {
    type: 'directory',
    contents: ['email.txt', 'socials.txt']
  },
  '/home/guest/contact/email.txt': {
    type: 'file',
    content: `Email: ${props.data.contact.email}`
  },
  '/home/guest/contact/socials.txt': {
    type: 'file',
    content: `GitHub: ${props.data.contact.socials.github}\nLinkedIn: ${props.data.contact.socials.linkedin}`
  }
}))

// Welcome message
const welcomeMessage = `

  ##       #####  ##   ##  ####  ##  ## ##    ####   ##### ##   ##
  ##      ##   ## ###  ## ##     ##  ## ##    ##  ## ##    ##   ##
  ##      ##   ## ## # ## ## ### ###### ##    ##  ## ####  ##   ##
  ##      ##   ## ##  ### ##  ## ##  ## ##    ##  ## ##     ## ## 
  ######   #####  ##   ##  ####  ##  ## ##    ####   #####   ###  

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ⚡ Welcome to my interactive portfolio terminal!
  
  📁 Type 'ls' to explore directories
  📖 Type 'cat <file>' to read files  
  ❓ Type 'help' for all available commands

`

// Initialize terminal
onMounted(() => {
  commandHistory.value.push({
    type: 'output',
    content: welcomeMessage
  })
  focusInput()
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
  // Initial scroll to bottom
  scrollToBottom()
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})

// Focus input
const focusInput = () => {
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// Scroll to bottom - use scrollIntoView on input
const scrollToBottom = () => {
  nextTick(() => {
    setTimeout(() => {
      if (inputRef.value) {
        inputRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }, 50)
  })
}

// Watch commandHistory to auto-scroll when new content is added
watch(
  () => commandHistory.value.length,
  () => {
    scrollToBottom()
  }
)

// Command handlers
const handleCommand = () => {
  const cmd = inputCommand.value.trim()
  
  // Add command to history
  commandHistory.value.push({
    type: 'command',
    path: currentPath.value,
    content: cmd
  })
  
  if (cmd) {
    const [command, ...args] = cmd.split(' ')
    const arg = args.join(' ')
    
    switch (command.toLowerCase()) {
      case 'ls':
        handleLs()
        break
      case 'cd':
        handleCd(arg)
        break
      case 'cat':
        handleCat(arg)
        break
      case 'clear':
        handleClear()
        break
      case 'help':
        handleHelp()
        break
      case 'pwd':
        handlePwd()
        break
      default:
        commandHistory.value.push({
          type: 'error',
          content: `Command not found: ${command}. Type 'help' for available commands.`
        })
    }
  }
  
  inputCommand.value = ''
  scrollToBottom()
}

// ls command
const handleLs = () => {
  const node = filesystem.value[currentPath.value]
  if (node && node.type === 'directory') {
    const listing = node.contents.map(item => {
      const itemPath = `${currentPath.value}/${item}`
      const itemNode = filesystem.value[itemPath]
      if (itemNode?.type === 'directory') {
        return `📁 ${item}/`
      }
      return `📄 ${item}`
    }).join('\n')
    
    commandHistory.value.push({
      type: 'output',
      content: listing || '(empty directory)'
    })
  }
}

// cd command
const handleCd = (target) => {
  if (!target || target === '~' || target === '') {
    currentPath.value = '/home/guest'
    return
  }
  
  if (target === '..') {
    if (currentPath.value !== '/home/guest') {
      const parts = currentPath.value.split('/')
      parts.pop()
      currentPath.value = parts.join('/') || '/home/guest'
    }
    return
  }
  
  // Handle absolute path
  let newPath = target.startsWith('/') 
    ? target 
    : `${currentPath.value}/${target}`
  
  // Normalize path (remove trailing slash)
  newPath = newPath.replace(/\/$/, '')
  
  const node = filesystem.value[newPath]
  if (node && node.type === 'directory') {
    currentPath.value = newPath
  } else if (node && node.type === 'file') {
    commandHistory.value.push({
      type: 'error',
      content: `cd: not a directory: ${target}`
    })
  } else {
    commandHistory.value.push({
      type: 'error',
      content: `cd: no such directory: ${target}`
    })
  }
}

// cat command
const handleCat = (filename) => {
  if (!filename) {
    commandHistory.value.push({
      type: 'error',
      content: 'cat: missing file argument'
    })
    return
  }
  
  const filePath = filename.startsWith('/')
    ? filename
    : `${currentPath.value}/${filename}`
  
  const node = filesystem.value[filePath]
  if (node && node.type === 'file') {
    commandHistory.value.push({
      type: 'output',
      content: node.content
    })
  } else if (node && node.type === 'directory') {
    commandHistory.value.push({
      type: 'error',
      content: `cat: ${filename} is a directory`
    })
  } else {
    commandHistory.value.push({
      type: 'error',
      content: `cat: ${filename}: No such file`
    })
  }
}

// clear command
const handleClear = () => {
  commandHistory.value = []
}

// help command
const handleHelp = () => {
  commandHistory.value.push({
    type: 'output',
    content: `Available commands:

  ls          List directory contents
  cd <dir>    Change directory
  cd          Return to home directory
  cd ..       Go up one directory
  cat <file>  Display file contents
  pwd         Print current directory
  clear       Clear terminal screen
  help        Show this help message`
  })
}

// pwd command
const handlePwd = () => {
  commandHistory.value.push({
    type: 'output',
    content: currentPath.value
  })
}

// Display path for prompt
const displayPath = computed(() => {
  return currentPath.value.replace('/home/guest', '~')
})

// Tab completion
const handleTab = (event) => {
  event.preventDefault()
  
  const input = inputCommand.value.trim()
  if (!input) return
  
  const parts = input.split(' ')
  const command = parts[0].toLowerCase()
  const partial = parts.slice(1).join(' ')
  
  // Only autocomplete for cd and cat commands
  if (!['cd', 'cat'].includes(command)) return
  
  // Get current directory contents
  const currentDir = filesystem.value[currentPath.value]
  if (!currentDir || currentDir.type !== 'directory') return
  
  // Find matches
  const matches = currentDir.contents.filter(item => 
    item.toLowerCase().startsWith(partial.toLowerCase())
  )
  
  if (matches.length === 1) {
    // Single match - complete it
    inputCommand.value = `${command} ${matches[0]}`
  } else if (matches.length > 1) {
    // Multiple matches - show them
    commandHistory.value.push({
      type: 'output',
      content: matches.join('  ')
    })
    
    // Find common prefix
    const commonPrefix = findCommonPrefix(matches)
    if (commonPrefix.length > partial.length) {
      inputCommand.value = `${command} ${commonPrefix}`
    }
    scrollToBottom()
  }
}

// Find common prefix among strings
const findCommonPrefix = (strings) => {
  if (strings.length === 0) return ''
  if (strings.length === 1) return strings[0]
  
  let prefix = strings[0]
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].toLowerCase().startsWith(prefix.toLowerCase())) {
      prefix = prefix.slice(0, -1)
      if (prefix === '') return ''
    }
  }
  return prefix
}
</script>

<template>
  <div class="terminal-container" @click="focusInput">
    <!-- Powerlevel10k-style header bar -->
    <!-- <div class="terminal-header">
      <div class="header-left">
        <span class="header-icon">⚡</span>
        <span class="header-title">longhidev</span>
        <span class="header-separator"></span>
        <span class="header-info">zsh 5.9</span>
      </div>
      <div class="header-center">
        <span class="header-path">{{ displayPath }}</span>
      </div>
      <div class="header-right">
        <span class="header-time">{{ currentTime }}</span>
      </div>
    </div> -->
    
    <div ref="terminalOutput" class="terminal-body">
      <div v-for="(entry, index) in commandHistory" :key="index" class="terminal-entry">
        <template v-if="entry.type === 'command'">
          <!-- Powerlevel10k-style prompt -->
          <div class="p10k-prompt">
            <span class="p10k-segment p10k-os">🐧</span>
            <span class="p10k-arrow p10k-arrow-os"></span>
            <span class="p10k-segment p10k-user">guest</span>
            <span class="p10k-arrow p10k-arrow-user"></span>
            <span class="p10k-segment p10k-path">📁 {{ entry.path.replace('/home/guest', '~') }}</span>
            <span class="p10k-arrow p10k-arrow-path"></span>
          </div>
          <div class="p10k-command-line">
            <span class="p10k-prompt-char">❯</span>
            <span class="command-text">{{ entry.content }}</span>
          </div>
        </template>
        <template v-else-if="entry.type === 'output'">
          <pre class="output-text">{{ entry.content }}</pre>
        </template>
        <template v-else-if="entry.type === 'error'">
          <pre class="error-text">{{ entry.content }}</pre>
        </template>
      </div>
      
      <!-- Current input line - Powerlevel10k style -->
      <div class="terminal-input-wrapper">
        <div class="p10k-prompt">
          <span class="p10k-segment p10k-os">🐧</span>
          <span class="p10k-arrow p10k-arrow-os"></span>
          <span class="p10k-segment p10k-user">guest</span>
          <span class="p10k-arrow p10k-arrow-user"></span>
          <span class="p10k-segment p10k-path">📁 {{ displayPath }}</span>
          <span class="p10k-arrow p10k-arrow-path"></span>
        </div>
        <div class="terminal-input-line">
          <span class="p10k-prompt-char">❯</span>
          <input
            ref="inputRef"
            v-model="inputCommand"
            type="text"
            class="terminal-input"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            @keydown.enter="handleCommand"
            @keydown.tab="handleTab"
          />
          <span class="cursor-blink"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Powerlevel10k-inspired Terminal Theme */
.terminal-container {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  background: linear-gradient(135deg, #1e1e2e 0%, #11111b 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Bar - iTerm2/Powerlevel10k style */
.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, #313244 0%, #1e1e2e 100%);
  padding: 10px 16px;
  border-bottom: 1px solid #45475a;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  font-size: 18px;
  filter: drop-shadow(0 0 4px #f9e2af);
}

.header-title {
  color: #cdd6f4;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.5px;
}

.header-separator {
  width: 1px;
  height: 16px;
  background: #45475a;
}

.header-info {
  color: #6c7086;
  font-size: 12px;
}

.header-center {
  flex: 1;
  text-align: center;
}

.header-path {
  color: #89b4fa;
  font-size: 13px;
  font-weight: 500;
  padding: 4px 12px;
  background: rgba(137, 180, 250, 0.1);
  border-radius: 4px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-time {
  color: #a6adc8;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.window-controls span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.window-controls span:hover {
  transform: scale(1.1);
}

.btn-close {
  background: linear-gradient(135deg, #f38ba8 0%, #eb6f92 100%);
  box-shadow: 0 0 6px rgba(243, 139, 168, 0.4);
}

.btn-minimize {
  background: linear-gradient(135deg, #f9e2af 0%, #e0af68 100%);
  box-shadow: 0 0 6px rgba(249, 226, 175, 0.4);
}

.btn-maximize {
  background: linear-gradient(135deg, #a6e3a1 0%, #7ec77e 100%);
  box-shadow: 0 0 6px rgba(166, 227, 161, 0.4);
}

/* Terminal Body */
.terminal-body {
  flex: 1;
  padding: 20px 24px;
  overflow-y: auto;
  background: #11111b;
  color: #cdd6f4;
  font-size: 14px;
  line-height: 1.6;
}

.terminal-body::-webkit-scrollbar {
  width: 8px;
}

.terminal-body::-webkit-scrollbar-track {
  background: #1e1e2e;
}

.terminal-body::-webkit-scrollbar-thumb {
  background: #45475a;
  border-radius: 4px;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
  background: #585b70;
}

@media (max-width: 640px) {
  .terminal-body {
    padding: 16px;
    font-size: 12px;
  }
  
  .terminal-header {
    padding: 8px 12px;
  }
  
  .header-center {
    display: none;
  }
}

/* Terminal Entries */
.terminal-entry {
  margin-bottom: 12px;
}

/* Powerlevel10k Prompt Segments */
.p10k-prompt {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  flex-wrap: wrap;
  gap: 0;
}

.p10k-segment {
  padding: 3px 10px;
  font-size: 13px;
  font-weight: 500;
}

.p10k-os {
  background: #45475a;
  color: #cdd6f4;
  border-radius: 6px 0 0 6px;
  padding-left: 8px;
}

.p10k-arrow {
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
}

.p10k-arrow-os {
  border-left: 8px solid #45475a;
}

.p10k-user {
  background: linear-gradient(90deg, #cba6f7 0%, #b4befe 100%);
  color: #1e1e2e;
  font-weight: 600;
}

.p10k-arrow-user {
  border-left: 8px solid #b4befe;
}

.p10k-path {
  background: linear-gradient(90deg, #89b4fa 0%, #74c7ec 100%);
  color: #1e1e2e;
  font-weight: 600;
}

.p10k-arrow-path {
  border-left: 8px solid #74c7ec;
}

/* Command Line */
.p10k-command-line {
  display: flex;
  align-items: center;
  padding-left: 8px;
  margin-top: 4px;
}

.p10k-prompt-char {
  color: #a6e3a1;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  text-shadow: 0 0 8px rgba(166, 227, 161, 0.5);
}

.command-text {
  color: #cdd6f4;
}

/* Output Text */
.output-text {
  color: #a6adc8;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 8px 0;
  padding: 8px 12px;
  font-family: inherit;
  background: rgba(49, 50, 68, 0.5);
  border-radius: 6px;
  border-left: 3px solid #89b4fa;
}

.error-text {
  color: #f38ba8;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 8px 0;
  padding: 8px 12px;
  font-family: inherit;
  background: rgba(243, 139, 168, 0.1);
  border-radius: 6px;
  border-left: 3px solid #f38ba8;
}

/* Input Wrapper */
.terminal-input-wrapper {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #313244;
}

.terminal-input-line {
  display: flex;
  align-items: center;
  padding-left: 8px;
  margin-top: 4px;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #cdd6f4;
  font-family: inherit;
  font-size: inherit;
  caret-color: #a6e3a1;
  padding: 4px 0;
}

.terminal-input::placeholder {
  color: #6c7086;
}

/* Blinking Cursor */
.cursor-blink {
  width: 8px;
  height: 18px;
  background: #a6e3a1;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
  border-radius: 1px;
  box-shadow: 0 0 8px rgba(166, 227, 161, 0.6);
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.terminal-input:focus + .cursor-blink {
  animation: blink 1s step-end infinite;
}

/* Selection styling */
::selection {
  background: rgba(137, 180, 250, 0.3);
  color: #cdd6f4;
}
</style>
