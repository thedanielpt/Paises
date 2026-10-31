
import { crearElementoFavorito } from "./vista.js";
import { guardarFavoritos, obtenerFavoritos } from "./almacen.js";

// Referencias al DOM.
const listaFavoritos = document.querySelector("#lista-favoritos");
const botonOrdenar = document.querySelector("#ordenar-poblacion");

// Añadir un país a favoritos.
export function addFavorito(pais) {

    const favoritos = obtenerFavoritos();

    // Comprobar si el país ya está añadido.
    const existe = favoritos.some(favorito =>
        favorito.name === pais.name
    );

    if (existe) {
        alert("Este país ya está en favoritos");
        return false;
    }

    // Crear el elemento y añadirlo al DOM.
    const elemento = crearElementoFavorito(pais);
    listaFavoritos.appendChild(elemento);

    // Guardar en localStorage.
    favoritos.push(pais);
    guardarFavoritos(favoritos);

    return true;
}

// Eliminar mediante delegación de eventos.
listaFavoritos.addEventListener("click", (evento) => {

    const boton = evento.target.closest(".btn-eliminar-favorito");

    if (!boton) {
        return;
    }

    const elemento = boton.closest("li");
    const nombre = elemento.dataset.nombre;

    // Eliminar del localStorage.
    const favoritos = obtenerFavoritos();

    const nuevosFavoritos = favoritos.filter(favorito =>
        favorito.name !== nombre
    );

    guardarFavoritos(nuevosFavoritos);

    // Eliminar del DOM.
    elemento.remove();
});

// Ordenar favoritos por población.

botonOrdenar.addEventListener("click", () => {

    const favoritos = Array.from(listaFavoritos.children);

    favoritos.sort((a, b) =>
        Number(b.dataset.poblacion) - Number(a.dataset.poblacion)
    );

    favoritos.forEach(favorito => {
        listaFavoritos.appendChild(favorito);
    });
});


// Recuperar los favoritos al abrir la página.
export function cargarFavoritos() {

    const favoritos = obtenerFavoritos();

    listaFavoritos.replaceChildren();

    favoritos.forEach(pais => {
        listaFavoritos.appendChild(crearElementoFavorito(pais));
    });
}
