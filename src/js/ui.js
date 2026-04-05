// src/js/ui.js

export function renderFilms(films) {
    const container = document.getElementById("film-section");
    const counter = document.getElementById("film-count");

    counter.textContent = `(${films.length})`;

    if (films.length === 0) {
        container.innerHTML = `<p class="empty-state">No hay películas aún. ¡Añade la primera!</p>`;
        return;
    }

    container.innerHTML = films.map(film => `
        <article class="film-card" data-id="${film.id}">
            <div class="film-card-body">
                <h3 class="film-title">${film.title}</h3>
                <p class="film-director">🎥 ${film.director}</p>
                <p class="film-synopsis">${film.synopsis}</p>
            </div>
            <div class="film-card-actions">
                <button class="btn btn-sm btn-edit" data-id="${film.id}">✏️ Editar</button>
                <button class="btn btn-sm btn-delete" data-id="${film.id}">🗑️ Eliminar</button>
            </div>
        </article>
    `).join("");
}

export function showNotification(message, type = "success") {
    const el = document.getElementById("notification");
    el.textContent = message;
    el.className = `notification ${type}`;

    setTimeout(() => {
        el.className = "notification hidden";
    }, 3000);
}

export function setFormMode(mode, film = null) {
    const formTitle = document.getElementById("form-title");
    const addBtn = document.getElementById("add-btn");
    const updateBtn = document.getElementById("update-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    if (mode === "edit" && film) {
        formTitle.textContent = `Editando: ${film.title}`;
        document.getElementById("title").value = film.title;
        document.getElementById("director").value = film.director;
        document.getElementById("synopsis").value = film.synopsis;
        addBtn.style.display = "none";
        updateBtn.style.display = "inline-flex";
        cancelBtn.style.display = "inline-flex";
    } else {
        formTitle.textContent = "Añadir película";
        clearForm();
        addBtn.style.display = "inline-flex";
        updateBtn.style.display = "none";
        cancelBtn.style.display = "none";
    }
}

export function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("director").value = "";
    document.getElementById("synopsis").value = "";
}

export function getFormValues() {
    return {
        title: document.getElementById("title").value.trim(),
        director: document.getElementById("director").value.trim(),
        synopsis: document.getElementById("synopsis").value.trim(),
    };
}