function initDarkMode() {
  const toggleBtn = document.getElementById('modeToggle');
  const html = document.documentElement;

  if (!toggleBtn) {
    console.warn('Dark mode toggle button not found. Make sure the navbar is loaded first.');
    return;
  }

  const savedTheme = localStorage.getItem('theme');

  
  if (savedTheme === 'dark') {
    html.classList.add('dark');
    toggleBtn.textContent = '☀️';
  } else {
    
    html.classList.remove('dark');
    toggleBtn.textContent = '🌙'; 

    
    if (!savedTheme) {
        localStorage.setItem('theme', 'light');
    }
  }

 
  toggleBtn.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '🌙';
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '☀️';
    }
  });
}


if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initDarkMode);
} else {
 
  setTimeout(initDarkMode, 100);
}