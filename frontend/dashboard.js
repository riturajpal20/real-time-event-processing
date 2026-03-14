// const ws = new WebSocket("ws://127.0.0.1:8000/ws")

// ws.onopen = () => {
//     console.log("WebSocket connected")
// }

// function formatNumber(value) {
//     return value.toLocaleString()
// }

// function formatRevenue(value) {
//     return "₹" + value.toLocaleString(undefined, { maximumFractionDigits: 2 })
// }

// function formatLatency(value) {
//     return (value * 1000).toFixed(2) + " ms"
// }

// ws.onmessage = (event) => {

//     const data = JSON.parse(event.data)

//     document.getElementById("gen").innerText =
//         formatNumber(data.events_generated)

//     document.getElementById("proc").innerText =
//         formatNumber(data.events_processed)

//     document.getElementById("queue").innerText =
//         formatNumber(data.queue_backlog)

//     document.getElementById("rev").innerText =
//         formatRevenue(data.revenue)
//     document.getElementById("events-per-sec").innerText = data.events_per_sec;
//     document.getElementById("workers").innerText = data.workers;

//     document.getElementById("clients").innerText =
//         data.clients

//     document.getElementById("lat").innerText =
//         formatLatency(data.avg_processing_latency)

//     document.getElementById("ws").innerText =
//         data.websocket_latency.toFixed(2) + " ms"

//     let rows = ""

//     for (const [category, value] of Object.entries(data.revenue_by_category)) {

//         rows += `
//         <tr>
//             <td>${category}</td>
//             <td>${formatRevenue(value)}</td>
//         </tr>
//         `
//     }

//     document.getElementById("revcat").innerHTML = rows
// }

// ws.onerror = (error) => {
//     console.log("WebSocket error:", error)
// }

// ws.onclose = () => {
//     console.log("WebSocket disconnected")
// }



// Connect to backend websocket
const ws = new WebSocket(`ws://${location.host}/ws`);

ws.onopen = () => {
    console.log("WebSocket connected");
};

ws.onerror = (error) => {
    console.log("WebSocket error:", error);
};

ws.onclose = () => {
    console.log("WebSocket disconnected");
};


// Formatting helpers

function formatNumber(value) {
    return Number(value || 0).toLocaleString();
}

function formatRevenue(value) {
    return "₹" + Number(value || 0).toLocaleString(undefined, {
        maximumFractionDigits: 2
    });
}

function formatLatency(value) {
    return Number(value || 0).toFixed(2) + " ms";
}


// Receive live metrics

ws.onmessage = (event) => {

    const data = JSON.parse(event.data);

    // Debug (optional)
    // console.log(data);

    document.getElementById("gen").innerText =
        formatNumber(data.events_generated);

    document.getElementById("proc").innerText =
        formatNumber(data.events_processed);

    document.getElementById("queue").innerText =
        formatNumber(data.queue_backlog);

    document.getElementById("rev").innerText =
        formatRevenue(data.revenue);

    document.getElementById("events-per-sec").innerText =
        formatNumber(data.events_per_sec);

    document.getElementById("workers").innerText =
        formatNumber(data.workers);

    document.getElementById("clients").innerText =
        formatNumber(data.clients);

    document.getElementById("lat").innerText =
        formatLatency(data.avg_processing_latency);

    document.getElementById("ws").innerText =
        formatLatency(data.websocket_latency);


    // Revenue by category table

    let rows = "";

    if (data.revenue_by_category) {

        for (const [category, value] of Object.entries(data.revenue_by_category)) {

            rows += `
            <tr>
                <td>${category}</td>
                <td>${formatRevenue(value)}</td>
            </tr>
            `;
        }

    }

    document.getElementById("revcat").innerHTML = rows;
};