import { CuentaBancaria } from "./CuentaBancaria";

export class CuentaCorriente extends CuentaBancaria {
    #limiteSobregiro = 500;

    retirar(cantidad){
        const saldoActual = this.obtenerSaldo();
        const saldoSimulado = saldoActual - cantidad;

        if (cantidad > 0 && saldoSimulado >= this.#limiteSobregiro) {
            super.retirar(cantidad);
        }else {
            console.warn("No se puede retirar: sobregiro exedido.")
        }
    }
}