import { CuentaAhorro } from "./src/clases/CuentaAhorro.js";
import { CuentaCorriente } from "./src/clases/CuentaCorriente.js";
let cuentas = [];
let cuentaActual = null;

const form = document.getElementById("forCuenta");
const nombreInput = document.getElementById("nombreTitular");
const tipoSelect = document.getElementById("tipoCuenta");
const acciones = document.getElementById("acciones");
const nombreCuenta = document.getElementById("nombreCuenta");
const output = document.getElementById("output")
// Acceder a cuenta
const formAcceder = document.getElementById("formAcceso");
const selecCuenta= document.getElementById("selectCuentas");
// Tramsferir entre cuentas
const formTransferir =document.getElementById("transferencias");
const cuentaDestino = document.getElementById("cuentaDestino");
const cuentaOrigen = document.getElementById("cuentaOrigen");
const cantidadTransferir = document.getElementById("cantidadTransferir")



function actualizarSelectCuentas() {
    if (selecCuenta != cuentaActual) {
        acciones.style.display = "none";
    }
    selecCuenta.innerHTML = "";
    cuentas.forEach((cuenta , index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${cuenta.titular} (${cuenta.constructor.name})`;
        selecCuenta.appendChild(option);
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = nombreInput.value;
    const tipo = tipoSelect.value;

    const cuenta = tipo === "ahorro"
    ? new CuentaAhorro(nombre)
    :new CuentaCorriente(nombre);

    cuentas.push(cuenta);
    actualizarSelectCuentas();
    form.reset();
});

// Formulario acceder
formAcceder.addEventListener("submit", (e) => {
    e.preventDefault();
    const index = selecCuenta.value;
    cuentaActual= cuentas[index];
    acciones.style.display = "block";
    nombreCuenta.textContent = `Cuenta acticva: ${cuentaActual.titular}`;

    document.getElementById("cantidad").value = "";
    output.textContent = "";
})

// Depositar
document.getElementById("btnDepositar").addEventListener("click", () =>{
    const cantidad = parseFloat(document.getElementById("cantidad").value);
    if(isNaN(cantidad) || cantidad <= 0) {
        output.textContent = "Cantidad inválida para depositar";
        return;
    }
    cuentaActual.depositar(cantidad);
    output.textContent = `Se depositaron $${cantidad} a la cuenta.` 
    document.getElementById("cantidad").value = "";
});

// Retirar
document.getElementById("btnRetirar").addEventListener("click", () => {
    const cantidad = parseFloat(document.getElementById("cantidad").value);
    if(isNaN(cantidad) || cantidad <= 0) {

        output.textContent = "Cantidad inválidad para retirar.";
        return;
    }
    cuentaActual.retirar(cantidad)
    output.textContent = `Se retira $${cantidad} de la cuenta. `;
        document.getElementById("cantidad").value = "";
})
// ver saldo
document.getElementById("btnSaldo").addEventListener("click", ()=> {
    // const saldo = cuentaActual.obtenerSaldo();
    output.textContent = cuentaActual.verSaldo();
}) 

// verHistorial
document.getElementById("btnHistorial").addEventListener("click", () => {
    const historia = cuentaActual.verHistorial()
    if(!historia.length){
        output.textContent = "No hay transaciones aún"
        return;
        
    }
    let texto = `Historial de la cuenta ${cuentaActual.titular}: \n`
        historia.forEach((item, i) => {
        texto += `${i + 1}. ${item.tipo} - $${item.cantidad} - ${item.fecha.toLocaleString()}\n`;
         });
    output.textContent = texto;
})



document.getElementById("mostrarTransferencias").addEventListener("click", () => {
    formTransferir.style.display = "block";
    transferiSelecCuenta();
})

// transaciones entres diferentes cuentas poo
function transferiSelecCuenta() {
    cuentaOrigen.innerHTML = "";
    cuentaDestino.innerHTML = "";
    cuentas.forEach((cuentas, i ) => {
        const option1 = new Option(`${cuentas.titular} (${cuentas.constructor.name})`, i);
        const option2 =  new Option(`${cuentas.titular} (${cuentas.constructor.name})`,i)
        cuentaOrigen.appendChild(option1);
        cuentaDestino.appendChild(option2);
    });
}

formTransferir.addEventListener("submit", (e) => {
    e.preventDefault();
    const cuentasOrigen = parseInt(cuentaOrigen.value);
    const cuentasDestino = parseInt(cuentaDestino.value);
    const transferir = parseFloat(cantidadTransferir.value);

    const origen = cuentas[cuentasOrigen];
    const destino = cuentas[cuentasDestino];

    const resultado = origen.transferir(destino, transferir)
    output.textContent = resultado;

    cantidadTransferir.value = ""


})


//Errores al mandar envios , puedes tener el acceso en una cuenta eliges otro cuenta origen diferente y puedes hacer los envios, lo cual no es correcto.
//las treanferencias se registren pero el monto no se resta de la cuenta origen.
//devemos hacervalidación. 
//al momento de acceder a otra cuenta debemos resfrescar los formularios.



// Crear dashboard para creador de cuenta bancaria. 
//crear interfaz de cliente, 