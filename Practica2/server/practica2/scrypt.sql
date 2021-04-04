create database practica2;
use practica2;


create table if not exists Usuario(
	codigo_usuario varchar(50) primary key,
    nombre varchar(50),
    pass varchar(50)
);

create table  if not exists Libro(
	codigo_libro int primary key not null AUTO_INCREMENT,
    titulo varchar(50),
    autor varchar(50),
    descripcion varchar(250),
    precio int,
    cantidad int,
	usuario_codigo varchar(50),
    foreign key (usuario_codigo) references Usuario(codigo_usuario) on delete cascade on update cascade
);


select * from Usuario;
select * from Libro;


insert into Usuario(codigo_usuario, nombre, pass) values('admin','admin', 'admin');
insert into Libro(titulo, autor, descripcion, precio, cantidad, usuario_codigo) values('Leonidas', 'Miguel de Cervantes', 'Libro inventado por miguel', 500, 100, 'admin');


update Usuario set codigo_usuario="", nombre="", pass="" where codigo_usuario="";

delete from Libro where codigo_libro="1";






