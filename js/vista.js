export function crearElementoFavorito(pais) {

    const elemento = document.createElement("li");

    // Añadimos la clase CSS.
    elemento.classList.add("favorito");

    // Guardamos los datos.
    elemento.dataset.nombre = pais.name;
    elemento.dataset.poblacion = pais.population;

    const nombre = document.createElement("p");
    nombre.textContent = pais.name;

    const boton = document.createElement("button");
    boton.textContent = "Quitar";

    // Añadimos la clase que utilizas en tu CSS.
    boton.classList.add("btn-eliminar-favorito");

    boton.type = "button";

    elemento.append(nombre, boton);

    return elemento;
}