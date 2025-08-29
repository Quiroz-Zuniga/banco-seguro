export class CuentaBancaria {
    #saldo = 0;
    #historial = [];

    constructor(titular) {
        this.titular = titular;
        return `Cuenta creadad para ${titular}`
    }
    depositar(cantidad) {
        if (cantidad > 0) {
            this.#saldo += cantidad;
            this.#registrarTransaccion('Deposito', cantidad);
        }else {
            console.warn("Cantidad invalidad para depósito. ")
        }
    }
    retirar(cantidad) {
            if(cantidad > 0 && cantidad <= this.#saldo) {
                this.#saldo -= cantidad;
                this.#registrarTransaccion('Retiro', cantidad)
            }else {
                console.warn("Fondos Insuficientes o cantidad invalidad")
            }
        }
    verSaldo(){
        return`Saldo de ${this.titular}: $${this.#saldo}`;
    }
    verHistorial(){
        return this.#historial;
    }
    #registrarTransaccion(tipo,cantidad){
        this.#historial.push({
            tipo,
            cantidad,
            fecha: new Date()
        });
    }
    obtenerSaldo(){
        return this.#saldo;
    }

    transferir(destino,cantidad) {
        if (!(destino instanceof CuentaBancaria)){
            return "Cuenta Destino inválida."
        }
        if(cantidad <= 0 || isNaN(cantidad)) {
            return "Cantidad inválida para transferir."
        }
        if(destino === this) {
            return "no se puede tranferir a la misma cueta."
        }
        if(cantidad > this.obtenerSaldo()) {
            return "Fondos insuficientes para transferir."
        }
        this.retirar(cantidad);
        destino.depositar(cantidad);
        return `se deposito $${cantidad} de $${this.titular} a ${destino.titular}`
    }
}