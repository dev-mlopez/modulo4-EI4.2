import Proveedor from "./class/Proveedor.js";
import Articulo from "./class/Articulo.js";

const d = document;

const proveedores = [],
    articulos = [],
    infoProveedor = new Map(),
    correos = new Set();

const consultarCorreo = correo => 
    correos.has(correo);

const gestionarProveedor = (nombre, correo, telefono) => 
    consultarCorreo(correo)
        ? alert(`El email ${correo} ya existe, no se puede volver a registrar un proveedor con este correo`)
        : anadirProveedor(nombre, correo, telefono);

const gestionarArticulo = (correo, nombre, precio) => 
    consultarCorreo(correo)
        ? anadirArticulo(correo, nombre, precio)
        : alert(`El email ${correo} no existe`);

const anadirProveedor = (nombre, correo, telefono) => {
    correos.add(correo);
    let proveedor = new Proveedor(nombre, correo, telefono);
    proveedores.push(proveedor);
    infoProveedor.set(proveedor.getEmail(), proveedor.getId());
    mostrarProveedor();
}

const anadirArticulo = (correo, nombre, precio) => {
    let articulo = new Articulo(nombre, precio);
    articulos.push(articulo);
    proveedores[infoProveedor.get(correo)].registrarArticulo(articulo);
    mostrarArticulos();
}

const registrarProveedor = () => 
    gestionarProveedor(
        d.getElementById("nombreProveedor").value, 
        d.getElementById("emailProveedor").value, 
        d.getElementById("telefonoProveedor").value);

const registrarArticulo = () =>
    gestionarArticulo(
        d.getElementById("emailProveedorRegistrado").value,
        d.getElementById("nombreArticulo").value,
        parseInt(d.getElementById("precioArticulo").value));

// Anadir datos por defecto
const gestionarProveedores = [
        {
            nombre: "Mauricio", 
            email: "Mauri@email.com", 
            telefono: 931823578
        },
        {
            nombre: "Pedro",
            email: "Pedro@email.com",
            telefono: 985739285
        },
        {
            nombre: "Ignacio", 
            email: "Ignacio@email.com", 
            telefono: 985748397
        },
        {
            nombre: "Juan", 
            email: "Juan@email.com", 
            telefono: 958362857
        },
        {
            nombre: "Gabriel", 
            email: "Gabriel@email.com", 
            telefono: 985748398
        }
    ],
    gestionarArticulos = [
        {
            email: "Pedro@email.com",
            nombre: "Limon",
            precio: 500
        },
        {
            email: "Mauri@email.com",
            nombre: "Fideos",
            precio: 1000
        },
        {
            email: "Pedro@email.com",
            nombre: "Arroz",
            precio: 800
        }
    ]

gestionarProveedores.forEach(proveedor => {
    gestionarProveedor(proveedor.nombre, proveedor.email, proveedor.telefono);
})

gestionarArticulos.forEach(articulo => {
    gestionarArticulo(articulo.email, articulo.nombre, articulo.precio);
})

// Mostrar datos registrados
function mostrarProveedor() {
    const $tablaProveedor = d.getElementById("tablaProveedores"),
        $tablaCuerpoProveedor = d.createElement("tbody");
    $tablaProveedor.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Telefono</th>
            </tr>
        </thead>    
    `
    proveedores.forEach(proveedor => {
        $tablaCuerpoProveedor.innerHTML += `
            <tr>
                <td>${proveedor.getId()}</td>
                <td>${proveedor.getNombre()}</td>
                <td>${proveedor.getEmail()}</td>
                <td>${proveedor.getTelefono()}</td>
            </tr>
        `
        $tablaProveedor.appendChild($tablaCuerpoProveedor);
    })
}

function mostrarArticulos() {
    const $tablaArticulos = d.getElementById("tablaArticulos"),
        $tablaCuerpoArticulo = d.createElement("tbody");
    $tablaArticulos.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
            </tr>
        </thead>
    `
    articulos.forEach(articulo => {
        $tablaCuerpoArticulo.innerHTML += `
            <tr>
                <td>${articulo.getId()}</td>
                <td>${articulo.getNombre()}</td>
                <td>${articulo.getPrecio()}</td>
            </tr>
        `
        $tablaArticulos.appendChild($tablaCuerpoArticulo);
    })
}

// Acciones de Btn
d.getElementById("registrarProveedorBtn").addEventListener("click", e => {
    registrarProveedor();
})

d.getElementById("registrarArticuloBtn").addEventListener("click", e => {
    registrarArticulo();
})

// proveedores[infoProveedor.get("Pedro@email.com")].registrarArticulo(articulos[0])
// console.log(proveedores[infoProveedor.get("Pedro@email.com")].articulos);
