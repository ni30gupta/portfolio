// SharedWorker: single instance shared across tabs
// It acts like a "fake websocket server/connection"

let ports = [];
let clients = 0;

function removePort(port) {
    const idx = ports.indexOf(port);
    if (idx !== -1) {
        ports.splice(idx, 1);
        clients = Math.max(0, clients - 1);
        broadcast({ type: "CLIENTS", count: clients });
    }
}

function broadcast(payload) {
    for (const p of ports) {
        p.postMessage(payload);
    }
}

function now() {
    return new Date().toISOString();
}

function logts() {
    // In worker context, performance API is available in modern browsers
    const hasPerf = typeof performance !== "undefined" && typeof performance.now === "function" && typeof performance.timeOrigin === "number";
    let t = Date.now();
    if (hasPerf) t = performance.timeOrigin + performance.now();
    const d = new Date(Math.floor(t));
    const m = String(d.getMinutes()).padStart(2, "0");
    const s = String(d.getSeconds()).padStart(2, "0");
    const us = String(Math.floor((t % 1000) * 1000)).padStart(6, "0");
    return `${m}:${s}:${us}`;
}

// fake server events every 5 sec
setInterval(() => {
    if (ports.length === 0) return;
    console.log(`[${logts()}][Worker] server tick: broadcasting SERVER_MESSAGE to ${ports.length} ports`);
    broadcast({
        type: "SERVER_MESSAGE",
        message: {
            id: crypto.randomUUID(),
            text: "Auto ping from shared connection",
            from: "server",
            ts: now(),
        },
    });
}, 5000);

onconnect = (e) => {
    const port = e.ports[0];
    ports.push(port);
    clients += 1;

    port.start();
    console.log(`[${logts()}][Step 3] Worker: onconnect; clients: ${clients}`);

    // send connected info to everyone
    broadcast({ type: "CLIENTS", count: clients });
    console.log(`[${logts()}][Worker] broadcast CLIENTS count ${clients}`);

    port.postMessage({
        type: "WELCOME",
        message: "Connected to SharedWorker (single shared engine)",
    });
    console.log(`[${logts()}][Worker] sent WELCOME to new port`);

    port.onmessage = (event) => {
        const data = event.data;
        console.log('data..............in shared worker...',data);
        if (data?.type === "SEND_MESSAGE") {
            // simulate message fan-out
            broadcast({
                type: "NEW_MESSAGE",
                message: {
                    id: crypto.randomUUID(),
                    text: data.text,
                    from: data.from || "tab",
                    ts: now(),
                },
            });
        }

        if (data?.type === "PING") {
            console.log(`[${logts()}][Worker] received PING; replying PONG`);
            port.postMessage({ type: "PONG", ts: now() });
        }

        if (data?.type === "DISCONNECT") {
            removePort(port);
            console.log(`[${logts()}][Worker] DISCONNECT processed; clients: ${clients}`);
        }
    };

    port.onmessageerror = (err) => {
        console.error("SharedWorker message error", err);
    };
};
