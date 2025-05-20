/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*.{html,ts,css,scss,sass,less,styl}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [

      {
        // Custom Dark Theme
        dark: {
          'primary': '#900020',  // Custom dark primary color A32139
          'bg': '#121212',  // Dark background color
          'secondary':   '#BBBBBB',  // Custom dark secondary color (lighter than light secondary)        
          'secondarylight' : '#1B1B1B',
          'accent': '#FF6F61',  // Accent color to complement the primary color
          'neutral': '#1B1B1B',  //222222 Dark neutral color
          'base-100': '#181818',  // Base background for dark mode
          'info': '#4696EB',  // Info color
          'success': '#34D399',  // Success color
          'warning': '#EAB308',  // Warning color
          'error': '#F87171',  // Error color
        },
      },
      {
        // Custom Light Theme
        light: {
          'primary': '#800020',  // Custom light primary color
          'bg': '#F7F7F7',  // Light background color
          'secondary':'#444444',  // Custom secondary color          
          'secondarylight' : '#1B1B1B',
          'accent': '#FF6F61',  // Accent color that complements primary
          'neutral': '#EAEAEA',  //666666 Neutral color that contrasts well with primary and secondary
          'base-100': '#ffffff',  // Base background for light mode
          'info': '#007BFF',  // Info color
          'success': '#28A745',  // Success color
          'warning': '#FFC107',  // Warning color
          'error': '#DC3545',  // Error color
        },
      },
    ],
  },
};

