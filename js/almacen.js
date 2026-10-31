// Función para guardar los países favoritos.
export function guardarFavoritos(favoritos) {

    // Convertimos el array a texto y lo guardamos.
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

// Función para obtener los países favoritos.
export function obtenerFavoritos() {

    // Obtenemos los favoritos guardados.
    const datos = localStorage.getItem("favoritos");

    // Si no hay favoritos, devolvemos un array vacío.
    if (datos == null) {
        return [];
    }

    try {
        // Convertimos el texto otra vez en un array.
        const favoritos = JSON.parse(datos);

        // Comprobamos que lo recuperado sea un array.
        if (!Array.isArray(favoritos)) {
            return [];
        }

        return favoritos;

    } catch (error) {
        return [];
    }
}