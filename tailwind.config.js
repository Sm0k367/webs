/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./src/**/*.{js,ts,jsx,tsx}"
],
theme: {
extend: {
colors: {
'nexus-lime': '#aaff99',
'nexus-cyan': '#90e6ff',
'nexus-pink': '#ff80d7',
'nexus-bg': '#0b0c10'
},
fontFamily: {
'mono': ['Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace']
},
boxShadow: {
'neon': '0 0 10px #0f0, 0 0 30px #0f0a, 0 0 60px #0f0b'
}
}
},
plugins: [],
}
