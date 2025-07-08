//URL http://localhost:3000/books

//Create metodo POST
async function addFilm() {
  const titleInput = document.getElementById("title").value.trim();

  if (titleInput === "") {
    alert("Por favor, escribe un título");
    return;
  }

  const newFilm = {
    title: titleInput,
    director: "Desconocido",
    synopsis: "Sin sinopsis", // para que no quede vacío
  };

  try {
    const response = await fetch("http://localhost:4000/films", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFilm),
    });

    if (response.ok) {
      alert("¡Película agregada!");
      document.getElementById("title").value = "";
      printFilms(); // Actualizar la lista
    } else {
      alert("Error al agregar la película");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}


//Read metodo GET
async function getAllfilms() {
     const response= await fetch("http://localhost:4000/films", {
         method: "GET",
         header: {
             'Content-Type': 'application/json'
         }
     });
    const filmData= await response.json()
    return filmData
}
// console.log(getAllfilms())
getAllfilms()

//Read metodo PUT
function updateFilm(Id, editedfilm) {

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
    let listFilms = await getAllfilms();
    filmsContainer.innerHTML = ""
    const printFilmList = listFilms.map(film => {
        return filmsContainer.innerHTML += `<h1>${film.title}</h1> 
        <p>${film.director}</p>
        <p>${film.synopsis}</p>
        <button onclick="deleteBook(${film.id})">Eliminar</button>`
                                             
    });
    return printFilmList
}

