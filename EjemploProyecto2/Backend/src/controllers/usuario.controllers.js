const {Usuario} = require('../models/Usuario')
const {listaUsuarios} = require('../lists/lists')

const registrarUsuarios = (req, res) => {

    //let json = {msg: 'Hola Mundo', msg2: 'JavaScript', msg3: 'Usuarios'}
    //carnet, nombres, apellidos, genero, facultad, carrera, correo, password
    //let usuario = new Usuario(20230100, 'estudiante1', 'hjfdf', 'M', 'Ingenieria', 'Sistemas', 'correo@gmail.com', '123')
    
    //const carnet = req.body.carnet;
    //const nombres = req.body.nombres;
    const {carnet, nombres, password} = req.body;
    let usuario = new Usuario(carnet, nombres, password)

    const existeUsuario = listaUsuarios.find(user => user.getCarnet() === carnet)

    if (existeUsuario != undefined) {
        return res.json({msg: 'El usuario ya existe'})
    }
    
    listaUsuarios.push(usuario);

    res.json({msg: 'El usuario ha sido guardado correctamente'})
}

const verUsuarios = (req, res) => {
    res.json(listaUsuarios)
}

const loginUsuarios = (req, res) => {
    const {carnet, password} = req.body;

    const usuario = listaUsuarios.find(user => user.getCarnet() === carnet && user.getPassword() === password)

    if (usuario == undefined) {
        return res.json({ok: false, msg: 'Error de usuario o contraseña'})
    }
    res.json({user: usuario, ok: true, msg: 'Se logueo correctamente'})
}


module.exports = {
    registrarUsuarios,
    verUsuarios,
    loginUsuarios
}