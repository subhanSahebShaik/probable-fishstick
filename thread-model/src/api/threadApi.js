import { apiFetch } from "./http";

export const BASE = "https://probable-fishstick-ff6o.onrender.com/api";

// THREAD API
export const getThreadNodes = () => apiFetch(`${BASE}/thread/nodes/`);
export const getThreadEdges = () => apiFetch(`${BASE}/thread/edges/`);

export const createThreadNode = (data) =>
    apiFetch(`${BASE}/thread/nodes/`, { method: "POST", body: JSON.stringify(data) });

export const updateThreadNode = (id, data) =>
    apiFetch(`${BASE}/thread/nodes/${id}/`, { method: "PUT", body: JSON.stringify(data) });

export const deleteThreadNode = (id) =>
    apiFetch(`${BASE}/thread/nodes/${id}/`, { method: "DELETE" });

export const createThreadEdge = (data) =>
    apiFetch(`${BASE}/thread/edges/`, { method: "POST", body: JSON.stringify(data) });

export const updateThreadEdge = (id, data) =>
    apiFetch(`${BASE}/thread/edges/${id}/`, { method: "PUT", body: JSON.stringify(data) });

export const deleteThreadEdge = (id) =>
    apiFetch(`${BASE}/thread/edges/${id}/`, { method: "DELETE" });

// LOGOUT
export function logout() {
    document.cookie = "access_token=; Max-Age=0; path=/;";
    document.cookie = "refresh_token=; Max-Age=0; path=/;";
}
