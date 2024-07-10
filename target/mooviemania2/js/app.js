// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  //
});

// Función para cargar películas o series en un contenedor
function cargarContenido(url, contenedor) {
  fetch(url, options)
    .then((response) => response.json())
    .then((datos) => {
      const resultadosLimitados = datos.results.slice(0, 15);

      const contenedorElemento = document.createElement("div");
      contenedorElemento.classList.add("movie-list");

      resultadosLimitados.forEach((elemento) => {
        const itemElemento = document.createElement("div");
        itemElemento.innerHTML = `
                    <div class="movie-list-item">
                      <h4>${elemento.title || elemento.name}</h4>
                      <img class="movie-list-item-img" src="https://image.tmdb.org/t/p/w500/${
                        elemento.poster_path
                      }" alt="${elemento.title || elemento.name}">
                    </div>
                  `;
        contenedorElemento.appendChild(itemElemento);
      });

      // Agregar nuevo contenido al final del contenido existente en el contenedor
      contenedor.appendChild(contenedorElemento);

      // Obtener la imagen destacada
      const destacada = datos.results[0];
      const contenidoDestacado = document.querySelector(".featured-content");
      contenidoDestacado.innerHTML = `
              <div class="featured-image" style="background-image: url('https://image.tmdb.org/t/p/w1280/${
                destacada.backdrop_path
              }')">
              </div>
              <div class="featured-info">
                <h2>${destacada.title || destacada.name}</h2>
                <p class="featured-desc">${destacada.overview}</p>
                <button class="featured-button">REPRODUCIR</button>
              </div>
            `;
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}

// Contenedores
let ContenedorUltimasPeliculas = document.querySelector(".movie-list-wrapper");
let contenedorMasPopular = document.querySelector(
  ".movie-list-wrapper.mas-popular"
);
let contenedorSeries = document.querySelector(".movie-list-wrapper.series");
let contenedorSeriesTop = document.querySelector(
  ".movie-list-wrapper.top-series"
);

// Configuración de opciones para la solicitud fetch
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDY3ZmFhMjZkNTc5NGUzZjg5NzZlZWEwMWE2NTFmZiIsInN1YiI6IjY2NGI4ZGYwNjZjNDVhNzlkOGRmYjZkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DqJI1S3iNNO6gTd35t37uDN7cQMQvXPUwOav2yXkjA0",
  },
};

// Carga las películas que se están reproduciendo actualmente
cargarContenido(
  "https://api.themoviedb.org/3/movie/now_playing?language=es-AR&page=1&region=AR",
  ContenedorUltimasPeliculas
);

// Carga las películas más populares
cargarContenido(
  "https://api.themoviedb.org/3/movie/popular?language=es-AR&page=1&region=AR",
  contenedorMasPopular
);

// Carga las series
cargarContenido(
  "https://api.themoviedb.org/3/tv/top_rated?language=es-AR&page=1",
  contenedorSeries
);

// Carga las series principales
cargarContenido(
  "https://api.themoviedb.org/3/tv/popular?language=es-AR&page=1&region=AR",
  contenedorSeriesTop
);
