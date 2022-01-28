CREATE DATABASE docato;

CREATE TABLE docato.users (
  id int(10) PRIMARY KEY auto_increment,
  name varchar(200),
  email varchar(200),
  password varchar(200),
  username varchar(200),
  cpf varchar(200),
  admnistrador tinyINT(1)
);