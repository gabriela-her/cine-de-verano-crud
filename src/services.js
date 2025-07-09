//URL http://localhost:3000/books

//Create metodo POST
async function addFilm() {
    const titleInput = document.getElementById("title").value.trim(); //llamas el input del html 
    const directorInput = document.getElementById("director").value.trim();
    const synopsisInput = document.getElementById("synopsis").value.trim();

    if (titleInput === ""&& directorInput ===""&& synopsisInput ==="") {
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
            // alert("¡Película agregada!"); //alerta emergente
            document.getElementById("title").value = ""; // esto lo que hace es vaciar el campo de texto 
            printFilms(); // Actualizar la lista de peliculas en la pagina 
        } else {
            alert("Error al agregar la película");
        }
    } catch (error) {
        alert("Error: " + error.message);
    }
}


//Read metodo GET
async function getAllfilms() {
    const response = await fetch("http://localhost:4000/films", {
        method: "GET",
        header: {
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
  // Paso 1: Tomar los valores escritos por la persona
  const id = document.getElementById("filmId").value.trim();      // ID de la película a cambiar
  const title = document.getElementById("title").value.trim();    // nueva peli y asi sucesivamente  
  const director = document.getElementById("director").value.trim();  
  const synopsis = document.getElementById("synopsis").value.trim();  

  // Paso 2: Crear un objeto con los datos nuevos como en el post
  const editedFilm = {
    title: title,
    director: director,
    synopsis: synopsis
  };

  // Paso 3: Enviar la actualización al servidor
  try {
    const response = await fetch(`http://localhost:4000/films/${id}`, {
      method: "PUT", // método PUT = editar
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedFilm) // Convertir los datos en texto JSON
    });

    if (response.ok) {
      alert("Película actualizada con éxito");
      printFilms(); // Volver a mostrar la lista actualizada
    } else {
      alert("No se pudo actualizar la película");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}

//Read metodo DELETE
//delete: 
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
let filmsContainer = document.getElementById("film-section")

async function printFilms() {
    let listFilms = await getAllfilms(); //pinta todas las peliculas de json
    filmsContainer.innerHTML = "" //para que no se dupliquen
    const printFilmList = listFilms.map(film => {
        return filmsContainer.innerHTML += `<h1>${film.title}</h1> 
        <p>${film.director}</p>
        <p>${film.synopsis}</p>
        <button onclick='deleteFilm("${film.id}")'>Eliminar</button>`

    });
    return printFilmList
}

