package edu.ar.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ar.data.PeliculaDAO;
import edu.ar.model.Pelicula;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet("/movies")
public class MovieServletController extends HttpServlet {

  static Logger logger = LoggerFactory.getLogger(MovieServletController.class);
  List<Pelicula> movieList = new ArrayList<>();
  ObjectMapper mapper = new ObjectMapper();


  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    String route = req.getParameter("action");
    logger.info("route : " + route);
    switch (route) {
      case "getAll"-> {
        res.setContentType("application/json; charset=UTF-8");
        movieList = PeliculaDAO.obtener();
        System.out.println("Dentro de getAll : " + movieList.size());
        //transformo en json y lo envio
        mapper.writeValue(res.getWriter(), movieList);
        logger.info(mapper.toString());
      }

      default -> {
        System.out.println("Parámetro no válido");
      }
    }
  }

  //En el doPost enviamos los datos del formulario a Java para que los
  //inserte en la base de datos.
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    //String route = req.getParameter("action");
    String route = "add";
    logger.info("Dentro del doPost()");
    logger.info("route : " + route);
    logger.info("req : " + req);
    logger.info("req : " + req.getParameter("nombre"));
    switch(route) {
      case "add": {
        String nombre = req.getParameter("nombre");
        String descripcion = req.getParameter("descripcion");
        String genero = req.getParameter("genero");
        int calificacion = Integer.parseInt(req.getParameter("calificacion"));
        int anio = Integer.parseInt(req.getParameter("anio"));
        byte estrellas = Byte.valueOf(req.getParameter("estrellas"));
        String director = req.getParameter("director");
        logger.info(nombre,descripcion,genero,calificacion,anio,estrellas,director);

        Pelicula newMovie = new Pelicula(nombre, descripcion, genero, calificacion, anio, estrellas, director);
       
        
        PeliculaDAO.insertar(newMovie);

       // Enviar una respuesta de éxito al cliente
                res.setContentType("text/html;charset=UTF-8");
                PrintWriter out = res.getWriter();
                out.println("<script>alert('Película guardada exitosamente!!!'); window.location.href='http://localhost:8080/mooviemania2/registrarpelis.html';</script>");
                break;
      }

            default:
                // Si la ruta no es "add", enviar una respuesta de error
                res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                res.getWriter().write("Ruta no válida");
                logger.error("Ruta no válida: " + route);
                break;
      }
       

      
      }
    
    
  }


