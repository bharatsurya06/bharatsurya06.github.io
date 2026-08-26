   
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

    
{
  // 1. Define your data dynamically
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const dataValues = [12, 19, 15, 22, 18, 25, 21];

  // 2. Automatically generate unique colors for every data entry
  const generateDynamicColors = (count) => {
    const backgroundColors = [];
    const borderColors = [];

    for (let i = 0; i < count; i++) {
      // Evenly distribute hues across the 360-degree color wheel
      const hue = Math.floor((360 / count) * i);
      backgroundColors.push(`hsla(${hue}, 70%, 60%, 0.75)`);
      borderColors.push(`hsla(${hue}, 75%, 45%, 1)`);
    }

    return { backgroundColors, borderColors };
  };

  const colors = generateDynamicColors(dataValues.length);

  // 3. Render Chart
  const ctx = document.getElementById('myBarChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Volume (MT)',
        data: dataValues,
        backgroundColor: colors.backgroundColors,
        borderColor: colors.borderColors,
        borderWidth: 2,
        borderRadius: 8,          // Rounded bar edges
        borderSkipped: false,
        hoverBackgroundColor: colors.borderColors
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false           // Clean look by hiding the top legend box
        },
        tooltip: {
          backgroundColor: '#1a202c',
          padding: 12,
          cornerRadius: 8,
          titleFont: { family: 'Exo 2', size: 14 },
          bodyFont: { family: 'Exo 2', size: 13 }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#718096', font: { family: 'Exo 2' } }
        },
        y: {
          grid: { color: 'rgba(226, 232, 240, 0.6)' },
          ticks: { color: '#718096', font: { family: 'Exo 2' } },
          beginAtZero: true
        }
      }
    }
  });
}
