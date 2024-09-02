export default class Proveedor {
    static contadorId = 0;

    constructor(nombre, email, telefono) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.idProveedor = Proveedor.contadorId++;
        this.articulos = [];
    }

    getNombre = () => this.nombre;
    setNombre = nombre => this.nombre = nombre;

    getEmail = () => this.email;
    setEmail= email => this.email = email;

    getTelefono = () => this.telefono;
    setTelefono = telefono => this.telefono = telefono;

    getId = () => this.idProveedor;

    registrarArticulo = articulo => this.articulos.push(articulo);

    getInfoProveedor() {
        return `Nombre: ${this.nombre}, Telefono: ${this.telefono}`;
    }
}