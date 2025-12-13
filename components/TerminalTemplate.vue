<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'

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
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=VT323&display=swap' }
  ]
})

// Terminal state
const currentPath = ref('/home/guest')
const commandHistory = ref([])
const inputCommand = ref('')
const terminalOutput = ref(null)
const inputRef = ref(null)

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
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ${props.data.hero.title.padEnd(52)}     ║
║   ${props.data.hero.subtitle.substring(0, 52).padEnd(52)}     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

Type 'help' for available commands.
Type 'ls' to explore.
`

// Initialize terminal
onMounted(() => {
  commandHistory.value.push({
    type: 'output',
    content: welcomeMessage
  })
  focusInput()
})

// Focus input
const focusInput = () => {
  nextTick(() => {
    inputRef.value?.focus()
  })
}

// Scroll to bottom
const scrollToBottom = () => {
  nextTick(() => {
    if (terminalOutput.value) {
      terminalOutput.value.scrollTop = terminalOutput.value.scrollHeight
    }
  })
}

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
    <div class="terminal-header">
      <div class="terminal-buttons">
        <span class="btn-close"></span>
        <span class="btn-minimize"></span>
        <span class="btn-maximize"></span>
      </div>
      <div class="terminal-title">guest@portfolio: {{ displayPath }}</div>
      <div class="terminal-spacer"></div>
    </div>
    
    <div ref="terminalOutput" class="terminal-body">
      <div v-for="(entry, index) in commandHistory" :key="index" class="terminal-entry">
        <template v-if="entry.type === 'command'">
          <span class="prompt">
            <span class="prompt-user">guest</span>@<span class="prompt-host">portfolio</span>:<span class="prompt-path">{{ entry.path.replace('/home/guest', '~') }}</span>$
          </span>
          <span class="command-text">{{ entry.content }}</span>
        </template>
        <template v-else-if="entry.type === 'output'">
          <pre class="output-text">{{ entry.content }}</pre>
        </template>
        <template v-else-if="entry.type === 'error'">
          <pre class="error-text">{{ entry.content }}</pre>
        </template>
      </div>
      
      <!-- Current input line -->
      <div class="terminal-input-line">
        <span class="prompt">
          <span class="prompt-user">guest</span>@<span class="prompt-host">portfolio</span>:<span class="prompt-path">{{ displayPath }}</span>$
        </span>
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.terminal-container {
  font-family: 'VT323', monospace;
  background-color: #1a1a2e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  display: flex;
  align-items: center;
  background: linear-gradient(to bottom, #3a3a5a, #2a2a4a);
  padding: 8px 12px;
  border-bottom: 1px solid #4a4a6a;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.btn-close {
  background-color: #ff5f56;
}

.btn-minimize {
  background-color: #ffbd2e;
}

.btn-maximize {
  background-color: #27c93f;
}

.terminal-title {
  flex: 1;
  text-align: center;
  color: #9a9aba;
  font-size: 14px;
}

.terminal-spacer {
  width: 52px;
}

.terminal-body {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #0d0d1a;
  color: #00ff00;
  font-size: 18px;
  line-height: 1.4;
}

@media (max-width: 640px) {
  .terminal-body {
    padding: 12px;
    font-size: 14px;
  }
}

.terminal-entry {
  margin-bottom: 4px;
}

.prompt {
  margin-right: 8px;
}

.prompt-user {
  color: #00cc00;
}

.prompt-host {
  color: #00cc00;
}

.prompt-path {
  color: #5599ff;
}

.command-text {
  color: #ffffff;
}

.output-text {
  color: #00ff00;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 4px 0;
  font-family: inherit;
}

.error-text {
  color: #ff6b6b;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 4px 0;
  font-family: inherit;
}

.terminal-input-line {
  display: flex;
  align-items: center;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: inherit;
  font-size: inherit;
  caret-color: #00ff00;
}

.terminal-input::placeholder {
  color: #4a4a6a;
}

/* Blinking cursor effect */
@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.terminal-input:focus {
  animation: none;
}
</style>
