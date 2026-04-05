// src/js/app.js
import { getAllFilms, createFilm, updateFilm, deleteFilm, getFilmById } from "./api.js";
import { renderFilms, showNotification, setFormMode, getFormValues } from "./ui.js";

let filmToDeleteId = null;
let allFilms = [];

// ── Cargar y renderizar ──────────────────────────────
async function loadFilms() {
    allFilms = await getAllFilms();
    renderFilms(allFilms);
}

// ── Añadir ───────────────────────────────────────────
document.getElementById("add-btn").addEventListener("click", async () => {
    const film = getFormValues();
    if (!film.title || !film.director || !film.synopsis) {
        showNotification("Por favor, rellena todos los campos.", "error");
        return;
    }
    const ok = await createFilm(film);
    if (ok) {
        showNotification("Película añadida correctamente ✅");
        setFormMode("add");
        loadFilms();
    } else {
        showNotification("Error al añadir la película.", "error");
    }
});

// ── Editar ───────────────────────────────────────────
document.getElementById("film-section").addEventListener("click", async (e) => {
    const editBtn = e.target.closest(".btn-edit");
    const deleteBtn = e.target.closest(".btn-delete");

    if (editBtn) {
        const id = editBtn.dataset.id;
        const film = await getFilmById(id);
        setFormMode("edit", film);
        document.getElementById("update-btn").dataset.id = id;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (deleteBtn) {
        filmToDeleteId = deleteBtn.dataset.id;
        document.getElementById("delete-modal").classList.remove("hidden");
    }
});

document.getElementById("update-btn").addEventListener("click", async () => {
    const id = document.getElementById("update-btn").dataset.id;
    const film = getFormValues();
    if (!film.title || !film.director || !film.synopsis) {
        showNotification("Por favor, rellena todos los campos.", "error");
        return;
    }
    const ok = await updateFilm(id, film);
    if (ok) {
        showNotification("Película actualizada ✅");
        setFormMode("add");
        loadFilms();
    } else {
        showNotification("Error al actualizar.", "error");
    }
});

// ── Cancelar edición ─────────────────────────────────
document.getElementById("cancel-btn").addEventListener("click", () => {
    setFormMode("add");
});

// ── Confirmar borrado (modal) ────────────────────────
document.getElementById("confirm-delete-btn").addEventListener("click", async () => {
    if (!filmToDeleteId) return;
    const ok = await deleteFilm(filmToDeleteId);
    if (ok) {
        showNotification("Película eliminada.");
        loadFilms();
    } else {
        showNotification("Error al eliminar.", "error");
    }
    filmToDeleteId = null;
    document.getElementById("delete-modal").classList.add("hidden");
});

document.getElementById("cancel-delete-btn").addEventListener("click", () => {
    filmToDeleteId = null;
    document.getElementById("delete-modal").classList.add("hidden");
});

// ── Búsqueda en tiempo real ──────────────────────────
document.getElementById("search-input").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allFilms.filter(film =>
        film.title.toLowerCase().includes(query) ||
        film.director.toLowerCase().includes(query)
    );
    renderFilms(filtered);
});

// ── Inicio ───────────────────────────────────────────
loadFilms();