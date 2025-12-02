import { apiFetch } from "./http";

export const BASE = "https://probable-fishstick-ff6o.onrender.com/api";

// THREAD NODES
export function getThreadNodes() {
    return apiFetch(`${BASE}/thread/nodes/`);
}

export function createThreadNode(data) {
    return apiFetch(`${BASE}/thread/nodes/`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export function updateThreadNode(id, data) {
    return apiFetch(`${BASE}/thread/nodes/${id}/`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export function deleteThreadNode(id) {
    return apiFetch(`${BASE}/thread/nodes/${id}/`, {
        method: "DELETE"
    });
}

// THREAD EDGES
export function getThreadEdges() {
    return apiFetch(`${BASE}/thread/edges/`);
}

export function createThreadEdge(data) {
    return apiFetch(`${BASE}/thread/edges/`, {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export function updateThreadEdge(id, data) {
    return apiFetch(`${BASE}/thread/edges/${id}/`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

export function deleteThreadEdge(id) {
    return apiFetch(`${BASE}/thread/edges/${id}/`, {
        method: "DELETE"
    });
}

// LOGOUT — expires cookies
export function logout() {
    // OPTIONAL: tell backend to expire refresh token (if implemented)
    fetch(`${BASE}/auth/logout/`, {
        method: "POST",
        credentials: "include"
    }).catch(() => { });

    // Remove cookies client side
    document.cookie = "access_token=; Max-Age=0; path=/;";
    document.cookie = "refresh_token=; Max-Age=0; path=/;";
}
