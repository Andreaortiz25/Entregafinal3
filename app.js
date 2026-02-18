const TOKEN = "eyJhdWQiOiI5NDM5ZDlhODRlODBkNWM4OTMzNjBkZmRlZmVmMzdmZCIsIm5iZiI6MTc3MTM5MTU5MC45ODcsInN1YiI6IjY5OTU0YTY2YmRiZmFkMGRhMTk1YTViZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ";

async function obtenerPeliculas() {
  try {
    const respuesta = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=es-ES&page=1",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );

    const datos = await respuesta.json();
    mostrarPeliculas(datos.results);

  } catch (error) {
    console.error(error);
    document.getElementById("resultado").innerHTML =
      "<p>Error al cargar películas.</p>";
  }
}

function mostrarPeliculas(peliculas) {
  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = "";

  peliculas.forEach(pelicula => {

    const imagen = pelicula.poster_path
      ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
      : "https://via.placeholder.com/300x450";

    const tarjeta = `
      <div class="tarjeta">
        <img src="${imagen}" alt="${pelicula.title}">
        <h3>${pelicula.title}</h3>
        <p class="rating">⭐ ${pelicula.vote_average.toFixed(1)}</p>
      </div>
    `;

    contenedor.innerHTML += tarjeta;
  });
}

document.addEventListener("DOMContentLoaded", obtenerPeliculas);