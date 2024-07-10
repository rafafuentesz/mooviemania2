console.log("Entró a GetRequest");

document.addEventListener("DOMContentLoaded", function() {

  const movieSection = document.getElementById("bodyPelis");
  const movies = [];

  function loadMovieList() {
    console.log("Entró a loadMovieList");
    fetch("/mooviemania2/movies?action=getAll")
      .then(response => response.json())
      .then(data => {
        console.log("data:", data);
        movieSection.innerHTML = ""; // Limpiar contenido anterior
        data.forEach(movie =>{
          movies.push(movie);
          movieSection.innerHTML += `
            <tr>
              <td>${movie.nombre}</td>
              <td>${movie.descripcion}</td>
              <td>${movie.genero}</td>
              <td>${movie.calificacion}</td>
            </tr>
          `
        });
        new DataTable('#tablaPelis', {
          responsive: true
        });
      });
  }

  loadMovieList();

  
  document.getElementById("miFormulario").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // Código para enviar la solicitud POST al servidor
    fetch("/mooviemania2/movies", {
        method: "POST",
        body: new FormData(document.getElementById("miFormulario"))
    })
    .then(response => {
        if (response.ok) {
        
          alert("Película guardada exitosamente!!!");
          
          document.getElementById("miFormulario").reset();
         
          loadMovieList();
        } else {
          throw new Error('Error al registrar la película');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        
    });
  });

});
