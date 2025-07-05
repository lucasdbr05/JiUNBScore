CREATE TABLE Competidor 
(
    matricula VARCHAR(20) PRIMARY KEY UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    id_atletica INT NOT NULL
);


CREATE TABLE Usuario
(
    nickname VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);


CREATE TABLE Atletica 
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    logo BYTEA
);


CREATE TABLE Esportes 
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);


CREATE TABLE Edicao 
(
    id SERIAL PRIMARY KEY,
    data_fim DATE NOT NULL,
    data_comeco DATE NOT NULL
);


CREATE TABLE Partidas 
(
    id SERIAL PRIMARY KEY,
    placar_time_1 INT CHECK (placar_time_1 >=0),
    placar_time_2 INT CHECK (placar_time_2 >=0),
    id_edicao INT NOT NULL,
    id_fase INT NOT NULL,
    id_local INT,
    id_time_1 INT,
    id_time_2 INT,
    date DATE NOT NULL
    CHECK(id_time_1 != id_time_2)
);


CREATE TABLE Local 
(
    id SERIAL PRIMARY KEY,
    ra VARCHAR(20) NOT NULL,
    cep VARCHAR(9) UNIQUE,
    quadra VARCHAR(20),
    rua VARCHAR(20),
    lote VARCHAR(20)
);


CREATE TABLE Estatisticas 
(
    id SERIAL PRIMARY KEY,
    qtd_acoes INT NOT NULL,
    id_partida INT NOT NULL,
    id_acao INT NOT NULL,
    id_competidor VARCHAR(20)
);


CREATE TABLE Fase 
(
    id SERIAL PRIMARY KEY,
    ordem INT,
    nome_grupo VARCHAR(50),
    nome_etapa VARCHAR(50) NOT NULL
);  


CREATE TABLE Escalacao 
(
    id SERIAL PRIMARY KEY,
    is_titular BOOLEAN NOT NULL,
    id_partida INT NOT NULL
);


CREATE TABLE Relacionados 
(
    id SERIAL PRIMARY KEY,
    funcao VARCHAR(20) NOT NULL,
    numero INT NOT NULL,
    id_competidor VARCHAR(20) NOT NULL
);


CREATE TABLE Acao 
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    pontuacao INT NOT NULL,
    id_esporte INT NOT NULL
);


CREATE TABLE EsportesAtletica 
(
    id_esporte INT,
    id_atletica INT,
    PRIMARY KEY (id_esporte, id_atletica)
);


CREATE TABLE EsporteEdicao 
(
    id_esporte INT,
    id_edicao INT,
    PRIMARY KEY (id_esporte, id_edicao)
);


CREATE TABLE RelacionadosEdicao 
(
    id_relacionado INT,
    id_edicao INT,
    PRIMARY KEY (id_relacionado, id_edicao)
);


CREATE TABLE RelacionadosEscalacao 
(
    id_relacionado INT,
    id_escalacao INT,
    PRIMARY KEY (id_relacionado, id_escalacao)
);


ALTER TABLE Usuario ADD FOREIGN KEY(nickname) REFERENCES Usuario(nickname);
ALTER TABLE Competidor ADD FOREIGN KEY(id_atletica) REFERENCES Atletica(id) ON DELETE CASCADE;
ALTER TABLE Partidas ADD FOREIGN KEY(id_edicao) REFERENCES Edicao(id) ON DELETE CASCADE;
ALTER TABLE Partidas ADD FOREIGN KEY(id_local) REFERENCES Local(id) ON DELETE SET NULL;
ALTER TABLE Partidas ADD FOREIGN KEY(id_fase) REFERENCES Fase(id) ON DELETE SET NULL;
ALTER TABLE Partidas ADD FOREIGN KEY(id_time_1) REFERENCES Atletica(id) ON DELETE SET NULL;
ALTER TABLE Partidas ADD FOREIGN KEY(id_time_2) REFERENCES Atletica(id) ON DELETE SET NULL;
ALTER TABLE Estatisticas ADD FOREIGN KEY(id_partida) REFERENCES Partidas(id) ON DELETE CASCADE;
ALTER TABLE Estatisticas ADD FOREIGN KEY(id_competidor) REFERENCES Competidor(matricula) ON DELETE CASCADE;
ALTER TABLE Escalacao ADD FOREIGN KEY(id_partida) REFERENCES Partidas(id) ON DELETE CASCADE;
ALTER TABLE Relacionados ADD FOREIGN KEY(id_competidor) REFERENCES Competidor(matricula) ON DELETE CASCADE;
ALTER TABLE Estatisticas ADD FOREIGN KEY(id_acao) REFERENCES Acao(id) ON DELETE CASCADE;
ALTER TABLE Acao ADD FOREIGN KEY(id_esporte) REFERENCES Esportes(id) ON DELETE CASCADE;
ALTER TABLE EsportesAtletica ADD FOREIGN KEY(id_esporte) REFERENCES Esportes(id) ON DELETE CASCADE;
ALTER TABLE EsportesAtletica ADD FOREIGN KEY(id_atletica) REFERENCES Atletica(id) ON DELETE CASCADE;
ALTER TABLE EsporteEdicao ADD FOREIGN KEY(id_esporte) REFERENCES Esportes(id) ON DELETE CASCADE;
ALTER TABLE EsporteEdicao ADD FOREIGN KEY(id_edicao) REFERENCES Edicao(id) ON DELETE CASCADE;
ALTER TABLE RelacionadosEdicao ADD FOREIGN KEY(id_relacionado) REFERENCES Relacionados(id) ON DELETE CASCADE;
ALTER TABLE RelacionadosEdicao ADD FOREIGN KEY(id_edicao) REFERENCES Edicao(id) ON DELETE CASCADE;
ALTER TABLE RelacionadosEscalacao ADD FOREIGN KEY(id_relacionado) REFERENCES Relacionados(id) ON DELETE CASCADE;
ALTER TABLE RelacionadosEscalacao ADD FOREIGN KEY(id_escalacao) REFERENCES Escalacao(id) ON DELETE CASCADE;