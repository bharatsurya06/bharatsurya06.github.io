// Load navbar and manage dark mode toggle consistently across pages
(function(){
  function setupNavbar(html){
    const container = document.getElementById('navbar');
    if(!container) return;
    container.innerHTML = html;
    // Dark mode logic shared by pages
    function applyDarkModeSetting() {
      const isDark = localStorage.getItem('darkMode') === 'true';
      document.body.classList.toggle('dark-mode', isDark);
      const toggle = document.querySelector('.input#darkModeToggle');
      if (toggle) toggle.checked = isDark;
    }
    setTimeout(() => {
      const toggle = document.querySelector('.input#darkModeToggle');
      if (toggle) {
        toggle.checked = localStorage.getItem('darkMode') === 'true';
        toggle.addEventListener('change', function() {
          document.body.classList.toggle('dark-mode', this.checked);
          localStorage.setItem('darkMode', this.checked);
        });
      }
      applyDarkModeSetting();
    }, 50);
    applyDarkModeSetting();
  }

  fetch('components/navbar.html')
    .then(response => response.text())
    .then(html => setupNavbar(html))
    .catch(()=>{});
})();
