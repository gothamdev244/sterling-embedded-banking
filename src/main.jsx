import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Force Segoe UI font with JavaScript
const forceSegoeUI = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    *, *::before, *::after {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
    }
    
    html, body, #root {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
    }
    
    .font-sans, .font-system {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
    }
  `;
  document.head.appendChild(style);
  
  // Also set via JavaScript DOM manipulation
  document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  document.documentElement.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
};

// Execute immediately and on DOM load
forceSegoeUI();
document.addEventListener('DOMContentLoaded', forceSegoeUI);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
