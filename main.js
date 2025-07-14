import { CuentaAhorro } from "./src/clases/CuentaAhorro.js";
import { CuentaCorriente } from "./src/clases/CuentaCorriente.js";

let cuentaActual = null;

const form = document.getElementById("forCuenta");
const nombreInput = document.getElementById("nombreTitular");
const tipoSelect = document.getElementById("tipoCuenta");
const acciones = document.getElementById("acciones");
const nombreCuenta = document.getElementById("nombreCuenta");
const output = document.getElementById("output")

// formulario 

form.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = nombreInput.value;
    const tipo = tipoSelect.value;

    cuentaActual = tipo === "ahorro"
    ? new CuentaAhorro(nombre)
    :new CuentaCorriente(nombre);

    nombreCuenta.textContent = `Cuenta de ${nombre}`;
    acciones.style.display = "block";
    output.textContent = "";

});