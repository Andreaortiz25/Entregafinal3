const input = document.getElementById("nombreInput");
const boton = document.getElementById("btnConsultar");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", consultarGenero);

async function consultarGenero() {

    const nombre = input.value.trim();

    if (nombre === "") {
        resultado.innerHTML = "<p style='color:red;'>Por favor escribe un nombre</p>";
        return;
    }

    resultado.innerHTML = "Consultando...";

    try {

        const respuesta = await fetch(`https://api.genderize.io?name=${nombre}`);

        if (!respuesta.ok) {
            throw new Error("Error en la petición");
        }

        const data = await respuesta.json();

        if (!data.gender) {
            resultado.innerHTML = "<p>No se encontró información para ese nombre.</p>";
            return;
        }

        resultado.innerHTML = `
            <div class="card-resultado">
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Género:</strong> ${data.gender}</p>
                <p><strong>Probabilidad:</strong> ${data.probability * 100}%</p>
                <p><strong>Consultas:</strong> ${data.count}</p>
            </div>
        `;

    } catch (error) {
        resultado.innerHTML = "<p style='color:red;'>Ocurrió un error al consultar la API.</p>";
        console.error(error);
    }
}
