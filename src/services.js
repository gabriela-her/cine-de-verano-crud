//URL http://localhost:3000/books

//Create metodo POST
async function addFilm() {
    const titleInput = document.getElementById("title").value.trim(); //llamas el input del html 
    const directorInput = document.getElementById("director").value.trim();
    const synopsisInput = document.getElementById("synopsis").value.trim();

    if (titleInput === "" || directorInput === "" || synopsisInput === "") {
        alert("Por favor, rellena el campo de texto");
        return; //si el campo esta vacio no puedes enviarlo
    }

    const newFilm = {
        title: titleInput,
        director: directorInput,
        synopsis: synopsisInput
    };

    try { //es como decir intenta esto y dime que pasa si algo falla 
        const response = await fetch("http://localhost:4000/films", { //pides algo y esperas que el servidor responda 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFilm),
        });

        if (response.ok) {
            alert("Se creo la pelicula satisfactoriamente")
            clearFormFields();
            printFilms(); // Actualizar la lista de peliculas en la pagina 
        } else {
            alert("Error al agregar la película");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
   
}
document.getElementById("add-btn").addEventListener("click", addFilm);

//Read metodo GET
async function getAllfilms() {
    const response = await fetch("http://localhost:4000/films", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const filmData = await response.json()
    return filmData
}
// console.log(getAllfilms())
getAllfilms()

//Read metodo PUT

async function updateFilm() {
    const updateBtn = document.getElementById("update-btn");
    const filmId = updateBtn.dataset.id;

    if (!filmId) {
        alert("No hay una película seleccionada para editar.");
        return;
    }

    const title = document.getElementById("title").value.trim();
    const director = document.getElementById("director").value.trim();
    const synopsis = document.getElementById("synopsis").value.trim();

    const editedFilm = { title, director, synopsis };

    try {
        const response = await fetch(`http://localhost:4000/films/${filmId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedFilm)
        });

        if (response.ok) {
            alert("Película actualizada con éxito");
            printFilms();
            clearFormFields();

            // Resetear el estado del botón
            updateBtn.removeAttribute("data-id");
            document.getElementById("add-btn").style.display = "inline";
            updateBtn.style.display = "none";
        } else {
            alert("No se pudo actualizar la película");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}

//Read metodo DELETE
async function deleteFilm(id) {
    const response = await fetch(`http://localhost:4000/films/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        await printFilms()
    } else {
        console.error("Error al eliminar la pelicula");
    }
}

//Print

const filmsContainer = document.getElementById("film-section");

// Función para iniciar edición 
function startEditingFilm(id) {
    document.getElementById("update-btn").dataset.id = id;
    document.getElementById("add-btn").style.display = "none";
    document.getElementById("update-btn").style.display = "inline";

    fetch(`http://localhost:4000/films/${id}`)
      .then(res => res.json())
      .then(film => {
          document.getElementById("title").value = film.title;
          document.getElementById("director").value = film.director;
          document.getElementById("synopsis").value = film.synopsis;
      })
      .catch(err => console.error(err));
}

async function printFilms() {
    const listFilms = await getAllfilms();

    const filmHTML = listFilms.map(film => `
        <h3>${film.title}</h3> 
        <p>Director: ${film.director}</p>
        <p>Sinopsis: ${film.synopsis}</p>
        <button onclick='deleteFilm("${film.id}")'>Eliminar</button>
        <button onclick='startEditingFilm("${film.id}")'>Editar</button>
    `).join("");

    filmsContainer.innerHTML = filmHTML;
}
    // Ajustes de botones por si quedan ocultos
    document.getElementById("print-btn").addEventListener("click", printFilms);

    document.getElementById("add-btn").style.display = "inline";
    document.getElementById("update-btn").style.display = "none";
    document.getElementById("update-btn").addEventListener("click", updateFilm);

     function clearFormFields() {
        document.getElementById("title").value = "";
        document.getElementById("director").value = "";
        document.getElementById("synopsis").value = "";
    }
