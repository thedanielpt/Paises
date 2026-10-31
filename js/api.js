import { URL_API } from "./config.js";

// Obtiene el primer país de los resultados de la API.
export async function obtenerpais(nombrePais) {
    
    const respuesta = await fetch(URL_API + nombrePais, {
        signal: AbortSignal.timeout(5000)
    });

    if (!respuesta.ok) {
        throw new Error(`No se ha podido obtener la información del país. Error: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    // Buscamos un país cuyo nombre coincida exactamente.
    const pais = datos.find(pais =>
        pais.name.toLowerCase() == nombrePais.trim().toLowerCase()
    );

    // Si no existe, lanzamos un error.
    if (!pais) {
        throw new Error("El país introducido no existe");
    }

    return datos[0];
}
