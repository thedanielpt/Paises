// Función para obtener la información de un país.
import { obtenerpais } from "./api.js";
import { crearTarjetaPais, crearParrafoError} from "./dom.js";
import { addFavorito, cargarFavoritos } from "./favoritos.js";

// Referencias a los elementos del DOM.
const formulario = document.querySelector("#form-busqueda");
const input = document.querySelector("#input-pais");
const resultado = document.querySelector("#resultado-busqueda");

/**
 * Esta función será el orquestador de nuestra web.
 */
async function main() {

    resultado.replaceChildren();

    try {
        const nombrePais = input.value.trim();

        const pais = await obtenerpais(nombrePais);

        // Creamos la tarjeta del país.
        const tarjeta = crearTarjetaPais(pais);

        // Obtenemos el botón de favoritos.
        const botonFavorito = tarjeta.querySelector(".btn-favorito");

        // Añadimos el evento al botón.
        botonFavorito.addEventListener("click", () => {
            addFavorito(pais);
        });

        // Mostramos la tarjeta.
        resultado.appendChild(tarjeta);

    } catch (error) {
        resultado.appendChild(crearParrafoError(error.message));
    } finally {
        input.value = "";
    }
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Evita que el formulario recargue la página.
    main();
});

// Cargamos los favoritos guardados al abrir la página.
cargarFavoritos();