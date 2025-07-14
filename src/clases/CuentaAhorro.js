import { CuentaBancaria } from "./CuentaBancaria";

export class CuentaAhorro extends CuentaBancaria {
    #retirosRealizados = 0;
    #limitesRetiros = 3;

    retirar(cantidad) {
        if(this.#retirosRealizados >= this.#limitesRetiros) {
            console.warn("Límite de retiros mensuales alcanzados.")
            return;
        }
        super.retirar(cantidad);
        this.#retirosRealizados++;
    }

    reiniciarRetiros() {
        this.#retirosRealizados = 0;
    }
}