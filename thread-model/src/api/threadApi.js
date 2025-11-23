const BASE = "http://127.0.0.1:8000/api/thread";

export async function getThreadNodes() {
    return fetch(`${BASE}/nodes/`).then(r => r.json());
}

export async function createThreadNode(data) {
    return fetch(`${BASE}/nodes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export async function updateThreadNode(id, data) {
    return fetch(`${BASE}/nodes/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export async function deleteThreadNode(id) {
    return fetch(`${BASE}/nodes/${id}/`, {
        method: "DELETE",
    });
}

export async function getThreadEdges() {
    return fetch(`${BASE}/edges/`).then(r => r.json());
}

export async function createThreadEdge(data) {
    return fetch(`${BASE}/edges/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export async function updateThreadEdge(id, data) {
    return fetch(`${BASE}/edges/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export async function deleteThreadEdge(id) {
    return fetch(`${BASE}/edges/${id}/`, {
        method: "DELETE",
    });
}
