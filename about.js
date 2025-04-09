document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentBoxes = document.querySelectorAll('.content-box');
  
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // 1. Deactivate all buttons and content boxes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        contentBoxes.forEach(box => box.classList.remove('active'));
  
        // 2. Activate the clicked button
        button.classList.add('active');
  
        // 3. Activate the corresponding content box
        const contentId = button.dataset.content; // Get the data-content attribute
        const contentBox = document.getElementById(contentId); // Find the content box
        if (contentBox) {
          contentBox.classList.add('active');
        }
      });
    });
  });