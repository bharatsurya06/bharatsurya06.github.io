/**
 * Dynamic HSL color generator for unlimited series
 */
function generateSeriesColor(index, alpha = 1) {
  const hue = (index * 137.5) % 360; // Spread hues evenly around the color wheel
  return `hsla(${hue}, 70%, 55%, ${alpha})`;
}

/**
 * Initializes interactive filled area charts for all target canvases
 */
async function initAreaCharts() {
  const canvases = document.querySelectorAll('canvas.auto-area-chart');

  canvases.forEach(async (canvas) => {
    const jsonUrl = canvas.dataset.json;
    if (!jsonUrl) return;

    try {
      // Fetch external JSON file
      const response = await fetch(jsonUrl);
      if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
      const data = await response.json();

      // Read configuration from HTML data-attributes
      const title = canvas.dataset.title || '';
      const xTitle = canvas.dataset.xTitle || '';
      const yTitle = canvas.dataset.yTitle || '';

      // Format datasets with styling & interaction properties
      const datasets = data.series.map((item, index) => ({
        label: item.name,
        data: item.values,
        fill: 'origin',
        borderColor: generateSeriesColor(index, 1),
        backgroundColor: generateSeriesColor(index, 0.25),
        tension: 0.35, // Smooth line curves
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: generateSeriesColor(index, 1),
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2
      }));

      // Render interactive Chart.js instance
      new Chart(canvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',      // Hovering over X-axis highlights all series at that point
            intersect: false    // Triggers tooltips anywhere on the vertical axis line
          },
          plugins: {
            title: {
              display: Boolean(title),
              text: title,
              font: { size: 16, weight: 'bold' }
            },
            legend: {
              display: true,
              position: 'top',
              labels: { usePointStyle: true }
            },
            tooltip: {
              enabled: true,
              padding: 10,
              usePointStyle: true
            }
          },
          scales: {
            x: {
              title: {
                display: Boolean(xTitle),
                text: xTitle
              },
              grid: { display: false }
            },
            y: {
              title: {
                display: Boolean(yTitle),
                text: yTitle
              },
              beginAtZero: false
            }
          }
        }
      });

    } catch (error) {
      console.error(`Failed to render chart for ${jsonUrl}:`, error);
    }
  });
}

// Automatically mount charts when DOM content loads
document.addEventListener('DOMContentLoaded', initAreaCharts);