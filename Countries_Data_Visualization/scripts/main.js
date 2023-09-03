const ctx = document.getElementById('chart').getContext('2d')

var data = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4"],
    datasets: [
        {
            label: "Horizontal Bar Chart",
            data: [10, 25, 15, 30], // Replace with your data values
            backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#FF33E3"], // Colors for the bars
        },
    ],
};

var options = {
    scales: {
        x: {
            beginAtZero: true, // Start the x-axis at zero
        },
    },
};

var barChart = new Chart(ctx, {
    type: "horizontalBar",
    data: data,
    options: options,
});