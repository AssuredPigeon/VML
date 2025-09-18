// visualization-3d.js
// Renderizado 3D con Plotly

function render3D(zCol) {
    let url = '/data';
    if (zCol) {
        url += '?z=' + encodeURIComponent(zCol);
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const trace = {
                x: data.x,
                y: data.y,
                z: data.z,
                mode: 'markers',
                type: 'scatter3d',
                marker: {
                    size: 4,
                    color: data.z,
                    colorscale: 'Viridis',
                    opacity: 0.8
                },
                text: data.expr,
                hovertemplate:
                    "<b>Etiqueta:</b> %{text}<br>" +
                    "X: %{x}<br>" +
                    "Y: %{y}<br>" +
                    "Z (" + data.z_column + "): %{z}<extra></extra>"
            };

            const layout = {
                margin: { l: 0, r: 0, b: 0, t: 0 },
                scene: {
                    xaxis: { title: "Componente 1" },
                    yaxis: { title: "Componente 2" },
                    zaxis: { title: data.z_column }
                }
            };

            Plotly.newPlot('plotDiv3', [trace], layout);
        })
        .catch(err => console.error("Error al cargar datos 3D:", err));
}

// Render inicial con Evolution 1 o Evolution 2
render3D();

// Lo expongo globalmente para que desde la consola puedas llamar:
// render3D("Evolution 2") o render3D("Generation 3")
window.render3D = render3D;
