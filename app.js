async function buscar() {

  const texto = document.getElementById("inputBusqueda").value;
  const contenedor = document.getElementById("resultado");

  if (!texto) {
    contenedor.innerHTML = "<p>Escribe algo para buscar.</p>";
    return;
  }

  contenedor.innerHTML = "<p>Cargando...</p>";

  try {

    const respuesta = await fetch(
      `https://imdb.iamidiotareyoutoo.com/search?q=${texto}`
    );

    const datos = await respuesta.json();

    if (!datos.description || datos.description.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
      return;
    }

    mostrarPeliculas(datos.description);

  } catch (error) {
    console.error(error);
    contenedor.innerHTML =
      "<p>Error al cargar las películas.</p>";
  }
}

function mostrarPeliculas(peliculas) {

  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = "";

  peliculas.forEach(pelicula => {

    const imagen = pelicula["#IMG_POSTER"]
      ? pelicula["#IMG_POSTER"]
      : "https://via.placeholder.com/300x450";

    const titulo = pelicula["#TITLE"];
    const year = pelicula["#YEAR"];

    const tarjeta = `
      <div class="tarjeta">
        <img src="${imagen}" alt="${titulo}">
        <h3>${titulo}</h3>
        <p><strong>Año:</strong> ${year}</p>
      </div>
    `;

    contenedor.innerHTML += tarjeta;

  });
}

