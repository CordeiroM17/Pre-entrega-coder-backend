class TicketManager {
    #preciobaseDeGanancia = 0.15
    constructor() {
        this.eventos = []
    }

    #generarId() {
        let maxId = 0;
        for (let i = 0; i < array.length; i++) {
            const e = this.eventos[i];
            if (e.id > maxId) {
                maxId = e.id;
            }
        } return maxId++
    }s

    getEventos() {
        console.log(this.eventos)
        return this.eventos;
    }

    buscarEvento(id) {
        const encontrado = this.eventos.find((e) => e.id == id)
        return encontrado;
    }

    agregarEvento(nombre, lugar, precio, capacidad, fecha) {
        precio = precio + (precio * this.#preciobaseDeGanancia);
        capacidad = capacidad ?? 50;
        fecha = fecha || Date.now();
        const eventoNuevo = {nombre, lugar, precio, capacidad, fecha};
        this.eventos = [...this.eventos, eventoNuevo];
        return true;
    }
}

const tiketera = new TicketManager();

tiketera.agregarEvento("")