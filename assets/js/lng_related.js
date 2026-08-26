   
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
      backgroundColors.push(`hsla(${hue}, 70%, 60%, 0.75)`);
      borderColors.push(`hsla(${hue}, 75%, 45%, 1)`);
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

document.addEventListener('DOMContentLoaded', () => {

  // Dynamic Color Generator (Generates distinct HSL hues for pie slices)
  const resolvePieColors = (json) => {
    const count = json.data.length;

    // Single-color theme mode: generates lighter/darker shades of a base color
    if (json.colorMode === 'single') {
      const baseHue = 210; // Blue hue
      const backgroundColors = [];
      const borderColors = [];

      for (let i = 0; i < count; i++) {
        const lightness = 35 + Math.floor((45 / count) * i);
        backgroundColors.push(`hsla(${baseHue}, 70%, ${lightness}%, 0.85)`);
        borderColors.push('#ffffff');
      }

      return { backgroundColors, borderColors };
    }

    // Default multi-color mode: spread evenly across the 360-degree color wheel
    const backgroundColors = [];
    const borderColors = [];

    for (let i = 0; i < count; i++) {
      const hue = Math.floor((360 / count) * i);
      backgroundColors.push(`hsla(${hue}, 70%, 60%, 0.85)`);
      borderColors.push('#ffffff');
    }

    return { backgroundColors, borderColors };
  };

  // Main Pie Chart Builder
  const buildPieChart = async (canvas) => {
    const jsonPath = canvas.getAttribute('data-json');
    if (!jsonPath) return;

    try {
      const response = await fetch(jsonPath);
      const json = await response.json();

      const colors = resolvePieColors(json);

      new Chart(canvas.getContext('2d'), {
        type: 'pie',
        data: {
          labels: json.labels,
          datasets: [{
            label: json.unit || 'Share',
            data: json.data,
            backgroundColor: colors.backgroundColors,
            borderColor: colors.borderColors,
            borderWidth: 2,
            hoverOffset: 6
          }]
        },
        options: {
          radius: "100%",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: !!json.title,
              text: json.title,
              font: { family: 'Exo 2', size: 16 },
              padding: { bottom: 15 }
            },
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                font: { family: 'Exo 2', size: 12 },
                padding: 15,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              backgroundColor: '#1a202c',
              padding: 12,
              cornerRadius: 8,
              titleFont: { family: 'Exo 2', size: 13 },
              bodyFont: { family: 'Exo 2', size: 12 },
              callbacks: {
                // Adds unit text (e.g., "%") inside the hover tooltip
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return ` ${label}: ${value} ${json.unit || ''}`;
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error(`Error loading pie chart from ${jsonPath}:`, error);
    }
  };

  // Auto-initialize all pie chart canvases
  document.querySelectorAll('.dynamic-pie-chart').forEach(buildPieChart);
});