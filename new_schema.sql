create schema ex1;

use ex1;

create table if not exists tutor (
	id int not null auto_increment primary key,
    dni char(8) not null,
    nombre varchar(100) not null, 
    direccion varchar(200) not null, 
    telefono varchar(20) not null
);

create table if not exists medico (
	id int not null auto_increment primary key, 
	dni char(8) not null, 
    nombre varchar(100) not null, 
    especialidad varchar(60) not null
);

create table if not exists paciente (
	id int not null auto_increment primary key, 
    idTutor int not null, 
    nombre varchar(100) not null, 
    especie varchar(10) not null, 
    raza varchar(50) not null, 
    edad int not null, 
    estado varchar(50) not null
);

alter table paciente
	add constraint fk_paciente_tutor
		foreign key paciente(idTutor) references tutor(id);

create table if not exists citamedica (
	id int not null auto_increment primary key, 
    idPaciente int not null, 
    idMedico int not null, 
    motivo varchar(200) not null, 
    fecha date not null
);

alter table citamedica
	add constraint fk_citamedica_paciente
		foreign key citamedica(idPaciente) references paciente(id);
        
alter table citamedica
	add constraint fk_citamedica_medico
		foreign key citamedica(idMedico) references medico(id);