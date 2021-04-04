const mysql = require('mysql');
const Router = require("express");
const app = Router();


var con = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "1234",
    database: "practica2"
});


/*******************************************************************************************************/
/*********************************************%%%%%*****%%%*********************************************/
/*********************************************%***%****%**%*********************************************/
/*********************************************%%%%%******%**********************************************/
/*********************************************%*********%***********************************************/
/*********************************************%********%%%%*********************************************/
/*******************************************************************************************************/
app.post("/crearUsuario", async (req, res) => {
    console.log("CREAR USUARIO----------------->")
    let body = req.body;

    let user = body.user;
    let name = body.name;
    let pass = body.pass;

    let consulta = `insert into Usuario(codigo_usuario, nombre, pass) values ("${user}","${name}","${pass}");`;
    //console.log(consulta)    
    con.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});

app.post("/Login", async (req, res) => {
    console.log("LOGIN----------------->")
    let body = req.body;

    let user = body.user;
    let pass = body.pass;

    let consulta = `select * from Usuario where  codigo_usuario = "${user}" and  pass = "${pass}";`;
    //console.log(consulta)    
    con.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});


app.post("/crearLibro", async (req, res) => {
    console.log("CREAR LIBRO----------------->")
    let body = req.body;

    let titulo = body.titulo;
    let autor = body.autor;
    let descripcion = body.descripcion;
    let precio = body.precio;
    let cantidad = body.cantidad;
    let user = body.user;


    let consulta = `insert into Libro(titulo, autor, descripcion, precio, cantidad, usuario_codigo) values('${titulo}', '${autor}', '${descripcion}', ${precio}, ${cantidad}, '${user}');`;
    con.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});

app.post("/modificarUsuario", async (req, res) => {
    console.log("MODIFICAR USUARIO----------------->")
    let body = req.body;

    let user = body.user;
    let newu = body.newu;
    let name = body.name;
    let pass = body.pass;

    let consulta = `update Usuario set codigo_usuario="${newu}", nombre="${name}", pass="${pass}" where codigo_usuario="${user}";`;
    con.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});

app.post("/modificarLibro", async (req, res) => {
    console.log("MODIFICAR LIBRO----------------->")
    let body = req.body;

    let id = body.id;
    let titulo = body.titulo;
    let autor = body.autor;
    let descripcion = body.descripcion;
    let precio = body.precio;
    let cantidad = body.cantidad;

    let consulta = `update Libro set titulo="${titulo}", autor="${autor}", descripcion="${descripcion}", precio=${precio}, cantidad=${cantidad} where codigo_libro=${id};`;
    con.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send('{"res" : "si"}');
        }
    });

});

app.post("/eliminarLibro", async (req, res) => {
    console.log("ELIMINAR LIBRO----------------->")
    let body = req.body;

    let id = body.id;

    let consulta = `delete from Libro where codigo_libro="${id}";`;
    con.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send('{"res" : "si"}');
        }
    });

});

app.get("/verLibros", async (req, res) => {
    console.log("VER LIBROS----------------->");

    let consulta = `select * from Libro;`;
    con.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});

module.exports = app;