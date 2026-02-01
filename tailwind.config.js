// Step 6: Tailwind config - tells Tailwind to respond to .dark class
/** @type {import('tailwindcss').Config} */
module.exports = {
  // These paths tell Tailwind where to look for classes (scan these files)
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // All files in app folder
    './components/**/*.{js,ts,jsx,tsx}', // All files in components folder
    './pages/**/*.{js,ts,jsx,tsx}',    // If you use pages router
  ],
  
  // ← THIS IS THE KEY: tells Tailwind to use .dark class instead of media query
  // Without this, dark:bg-black won't work when you toggle .dark class!
  darkMode: 'class', // 'media' (default) or 'class'
  
  theme: {
    extend: {},
  },
  plugins: [],
};
