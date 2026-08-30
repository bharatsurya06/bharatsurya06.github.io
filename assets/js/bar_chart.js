document.addEventListener('DOMContentLoaded', () => {

  // Helper to resolve color logic
  const resolveColors = (json) => {
    const count = json.data.length;

    // CASE 1: Single Color requested
    if (json.colorMode === 'single') {
      const baseColor = json.singleColor || '#64696e'; // Fallback to blue if color isn't defined
      return {
        backgroundColor: baseColor,
        borderColor: baseColor
      };
    }

    // CASE 2: Multi Color (Default) - Dynamic HSL generation



    const backgroundColors = [];
    const borderColors = [];

    for (let i = 0; i < count; i++) {
      const hue = Math.floor((360 / count) * i);
      // backgroundColors.push(palette[i % palette.length]);
      backgroundColors.push(`hsla(${hue}, 82%, 50%, 1)`);
      // borderColors.push(`hsla(${hue}, 75%, 45%, 1)`);
    }

    return {
      backgroundColor: backgroundColors,
      borderColor: borderColors
    };
  };

  // Main Builder
  const buildChart = async (canvas) => {
    const jsonPath = canvas.getAttribute('data-json');
    if (!jsonPath) return;

    try {
      const response = await fetch(jsonPath);
      const json = await response.json();

      // Resolve colors based on JSON configuration
      const colors = resolveColors(json);

      new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
          labels: json.labels,
          datasets: [{
            label: json.unit || 'Value',
            data: json.data,
            backgroundColor: colors.backgroundColor, // Accepts either string or array
            borderColor: colors.borderColor,         // Accepts either string or array
            borderWidth: 0,
            borderRadius: 0,
            borderSkipped: false
            
          }]
        },
        options: {
          responsive: true,
          barPercentage: 0.5,
          maintainAspectRatio: false,
         
          plugins: {
            title: {
              display: !!json.title,
              text: json.title,
              font: { family: 'Exo 2', size: 16 }
            },
            legend: { display: false }
          },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true }
          }
        }
      });
    } catch (error) {
      console.error(`Error loading chart from ${jsonPath}:`, error);
    }
  };

  // Render all canvases marked with .dynamic-chart
  document.querySelectorAll('.dynamic-chart').forEach(buildChart);
});

