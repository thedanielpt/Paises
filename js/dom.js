
import {IMAGEN_POR_DEFECTO} from "./config.js";

//Fucnion para crear elementos del DOM
function crearElemento(etiqueta, clase, texto = ""){
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.classList.add(clase);
    elemento.textContent = texto;

    return elemento;
}

//Funcion que crear tarjetas para los paises
export function crearTarjetaPais(datos){

    const tarjeta = crearElemento("div", "paises");

    const imagen = crearElemento("img", "imagenes");
    imagen.src = datos.flags?.png ?? IMAGEN_POR_DEFECTO;
    imagen.alt = `Bandera de ${datos.name}`;

    const nombre = crearElemento("p", "", `Nombre: ${datos.name}`);

    const capital = crearElemento("p", "", `Capital: ${datos.capital}`);

    const region = crearElemento("p", "", `Región: ${datos.region}`);

    const poblacion = crearElemento("p", "", `Población: ${datos.population}`);

    const botonFavorito = crearElemento("button", "btn-favorito", "Añadir favorito");

    const botonEliminar = crearElemento("button", "btn-eliminar-favorito", "Eliminar favorito");

    botonEliminar.hidden = true;

    tarjeta.append(imagen, nombre, capital, region, poblacion, botonFavorito, botonEliminar);

    return tarjeta;
}

//Funcion que crea un elemento p y se pone un error
export function crearParrafoError(error){
    const parrafo = crearElemento("p", "error");

    parrafo.textContent = error;

    return parrafo;
}

//Crea el elemento li, con la informacion de el pais
export function crearElementoFavorito(pais) {

    // Creamos el contenedor del favorito.
    const li = crearElemento("li", "favorito");

    li.dataset.nombre = pais.name;
    li.dataset.poblacion = pais.population;

    // Creamos el nombre del país.
    const nombre = crearElemento("span", "", pais.name);

    // Creamos el botón para eliminar.
    const botonEliminar = crearElemento(
        "button",
        "btn-eliminar-favorito",
        "Quitar"
    );

    botonEliminar.type = "button";

    // Añadimos los elementos directamente al li.
    li.append(nombre, botonEliminar);

    return li;
}

//Añadir a la lista
export function agregarFavorito(pais, listaFavoritos) {

    const existe = Array.from(listaFavoritos.children).some(
        elemento => elemento.dataset.nombre === pais.name
    );

    if (existe) {
        return false;
    }

    const favorito = crearElementoFavorito(pais);

    listaFavoritos.appendChild(favorito);

    return true;
}