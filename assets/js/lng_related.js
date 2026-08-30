   
    document.querySelectorAll('.chapter-btn').forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');

        // Deactivate all buttons and hide all chapters
        document.querySelectorAll('.chapter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.chapter-content').forEach(content => content.classList.remove('active'));

        // Activate selected button and show target chapter
        button.classList.add('active');
        document.getElementById(targetId).classList.add('active');
      });
    });

    
