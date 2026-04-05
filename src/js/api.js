import { API_URL } from "./config.js";

export async function getAllFilms() {
    const response = await fetch(API_URL);
    return await response.json();
}

export async function createFilm(film) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(film)
    });
    return response.ok;
}

export async function updateFilm(id, film) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(film)
    });
    return response.ok;
}

export async function deleteFilm(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    return response.ok;
}

export async function getFilmById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
}