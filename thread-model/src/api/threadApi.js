export const BASE = "https://probable-fishstick-ff6o.onrender.com/api";

function authHeader() {
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access")}`,
    };
}


export async function getThreadNodes() {
    return fetch(`${BASE}/thread/nodes/`, {
        headers: authHeader()
    }).then(r => r.json());
}

export async function createThreadNode(data) {
    return fetch(`${BASE}/thread/nodes/`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export async function updateThreadNode(id, data) {
    return fetch(`${BASE}/thread/nodes/${id}/`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export async function deleteThreadNode(id) {
    return fetch(`${BASE}/thread/nodes/${id}/`, {
        method: "DELETE",
        headers: authHeader()
    });
}

export async function getThreadEdges() {
    return fetch(`${BASE}/thread/edges/`, { headers: authHeader() }).then(r => r.json());
}

export async function createThreadEdge(data) {
    return fetch(`${BASE}/thread/edges/`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export async function updateThreadEdge(id, data) {
    return fetch(`${BASE}/thread/edges/${id}/`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(r => r.json());
}

export async function deleteThreadEdge(id) {
    return fetch(`${BASE}/thread/edges/${id}/`, {
        method: "DELETE",
        headers: authHeader()
    });
}

export function logout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
}
