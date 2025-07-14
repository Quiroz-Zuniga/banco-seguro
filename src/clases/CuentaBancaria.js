export class CuentaBancaria {
    #saldo = 0;
    #historial = [];

    constructor(titular) {
        this.titular = titular;
        console.log(`Cuenta creada para: ${this.titular}`)
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
            console.log(`Saldo de ${this.titular}: $${this.#saldo}`)
        }
        verHistorial(){
            console.log(`Historial de ${this.titular}: `);
            this.#historial.forEach((item, i) => {
                console.log(`${i + 1}. ${item.tipo} - $${item.cantidad} - ${item.fecha.toLocaleString()}`);
            });
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
}