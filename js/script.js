const API_KEY = "f231fb0313f74f5ea69fd011580bfcd6";
const url = `https://api.rawg.io/api/games?key=${API_KEY}&platforms=15&page=1&page_size=30&ordering=-rating`;
const contenedorPrimeraSeccion = document.getElementById("contenedor-cartas-primera-seccion");
const contenedorCatalogo = document.getElementById("contenedor-catalogo");
import { agregarCarrito } from "./carrito.js";

// async await lo estoy aprendiendo en un curso de Node, por eso los uso
const hacerRequest = async () => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        return data.results;
    } catch (error) {
        console.error("There was an error");
    }
}

const crearCarta = (game) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.innerHTML = `
        <img src="${game.background_image}" alt="caratula-juego">
        <h3 class="play-regular">${game.name}</h3>
        <div class="datos-carta">
            <p><b>Lanzamiento:</b> ${game.released}</p>
            <p><b>Rating: </b> ${game.rating}</p>
            <p><b>Genero:</b> ${game.genres[0].name}</p>
        </div>
        <button class="boton-descarga">Descargar ⬇️</button>
    `;
    return carta;
}

const cargarCatalogo = async (games) => {
    try {
        games.forEach((game) => {
            const carta = crearCarta(game);
            contenedorCatalogo.appendChild(carta);
        });
    } catch (error) {
        console.error("There was an error");
    }
}

const cargarDatosSeccionPrincipal = async (games) => {
    try {
        games.forEach((game) => {
            const carta = crearCarta(game);
            contenedorPrimeraSeccion.appendChild(carta);
        });
    } catch (error) {
        console.error("There was an error");
    }
}

try {
    (async () => {
        const games = await hacerRequest();
        cargarCatalogo(games);

        const topRating = games.slice(0, 8);

        cargarDatosSeccionPrincipal(topRating);
        
        contenedorCatalogo.addEventListener("click", (event) => agregarCarrito(event));
        contenedorPrimeraSeccion.addEventListener("click", (event) => agregarCarrito(event));
    })();
} catch (error) {
    console.error("There was an error");
}