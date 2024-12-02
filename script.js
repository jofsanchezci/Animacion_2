document.getElementById("startAnimation").addEventListener("click", () => {
    animateFibonacciComparison();
});

function animateFibonacciComparison() {
    const ctx = document.getElementById("fibonacciChart").getContext("2d");

    // Datos iniciales
    const nValues = Array.from({ length: 20 }, (_, i) => i + 1); // Valores de n: 1 a 20
    const recursiveTimes = nValues.map(n => Math.pow(2, n) / 1e6); // Simular complejidad O(2^n)
    const iterativeTimes = nValues.map(n => n / 1e4); // Simular complejidad O(n)

    // Configuración inicial del gráfico
    const data = {
        labels: [],
        datasets: [
            {
                label: "Fibonacci Recursivo",
                data: [],
                borderColor: "orange",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Fibonacci Iterativo",
                data: [],
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const config = {
        type: "line",
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Valor de n",
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: "Tiempo de Ejecución (segundos)",
                    },
                    type: "logarithmic", // Cambiar a logarítmico para mostrar mejor los tiempos
                },
            },
        },
    };

    const fibonacciChart = new Chart(ctx, config);

    // Animación progresiva
    let currentIndex = 0;
    const interval = setInterval(() => {
        if (currentIndex >= nValues.length) {
            clearInterval(interval); // Detener la animación cuando se terminen los datos
            return;
        }
        // Agregar datos dinámicamente
        fibonacciChart.data.labels.push(nValues[currentIndex]);
        fibonacciChart.data.datasets[0].data.push(recursiveTimes[currentIndex]);
        fibonacciChart.data.datasets[1].data.push(iterativeTimes[currentIndex]);
        fibonacciChart.update(); // Actualizar el gráfico
        currentIndex++;
    }, 500); // Actualizar cada 0.5 segundos
}
