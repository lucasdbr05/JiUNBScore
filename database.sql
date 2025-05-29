CREATE TABLE tb_Competidor 
(
    matricula VARCHAR(20) PRIMARY KEY UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    id_atletica INT NOT NULL
);


CREATE TABLE tb_Usuario
(
    nickname VARCHAR(50) PRIMARY KEY UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL
);


CREATE TABLE tb_Atletica 
(
    id_atletica SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    logo BYTEA
);


CREATE TABLE tb_Esportes 
(
    id_codigo SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);


CREATE TABLE tb_Edicao 
(
    id_edicao SERIAL PRIMARY KEY,
    data_fim DATE NOT NULL,
    data_comeco DATE NOT NULL
);


CREATE TABLE tb_Partidas 
(
    id_partida SERIAL PRIMARY KEY,
    placar_time_1 INT CHECK (placar_time_1 >=0),
    placar_time_2 INT CHECK (placar_time_2 >=0),
    id_edicao INT NOT NULL,
    id_fase INT NOT NULL,
    id_local INT,
    id_time_1 INT,
    id_time_2 INT
    CHECK(id_time_1 != id_time_2)
);


CREATE TABLE tb_Local 
(
    id_local SERIAL PRIMARY KEY,
    ra VARCHAR(20) NOT NULL,
    cep VARCHAR(9) UNIQUE,
    quadra VARCHAR(20),
    rua VARCHAR(20),
    lote VARCHAR(20)
);


CREATE TABLE tb_Estatisticas 
(
    id_estatistica SERIAL PRIMARY KEY,
    qtd_acoes INT NOT NULL,
    id_partida INT NOT NULL,
    id_acao INT NOT NULL,
    id_competidor VARCHAR(20)
);


CREATE TABLE tb_Fase 
(
    id_fase SERIAL PRIMARY KEY,
    grupo INT,
    nome VARCHAR(20) NOT NULL,
    id_edicao INT
);


CREATE TABLE tb_Escalacao 
(
    id_escalacao SERIAL PRIMARY KEY,
    is_titular BOOLEAN NOT NULL,
    id_partida INT NOT NULL
);


CREATE TABLE tb_Relacionados 
(
    id_relacionado SERIAL PRIMARY KEY,
    funcao VARCHAR(20) NOT NULL,
    numero INT NOT NULL,
    id_competidor VARCHAR(20) NOT NULL
);


CREATE TABLE tb_Acao 
(
    id_acao SERIAL PRIMARY KEY,
    nome VARCHAR(20) NOT NULL,
    pontuacao INT NOT NULL,
    id_esporte INT NOT NULL
);


CREATE TABLE tb_EsportesAtletica 
(
    id_esporte INT,
    id_atletica INT,
    PRIMARY KEY (id_esporte, id_atletica)
);


CREATE TABLE tb_EsporteEdicao 
(
    id_esporte INT,
    id_edicao INT,
    PRIMARY KEY (id_esporte, id_edicao)
);


CREATE TABLE tb_RelacionadosEdicao 
(
    id_relacionado INT,
    id_edicao INT,
    PRIMARY KEY (id_relacionado, id_edicao)
);


CREATE TABLE tb_RelacionadosEscalacao 
(
    id_relacionado INT,
    id_escalacao INT,
    PRIMARY KEY (id_relacionado, id_escalacao)
);


ALTER TABLE tb_Usuario ADD FOREIGN KEY(nickname) REFERENCES tb_Usuario(nickname);
ALTER TABLE tb_Competidor ADD FOREIGN KEY(id_atletica) REFERENCES tb_Atletica(id_atletica) ON DELETE CASCADE;
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_edicao) REFERENCES tb_Edicao(id_edicao) ON DELETE CASCADE;
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_local) REFERENCES tb_Local(id_local) ON DELETE SET NULL;
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_fase) REFERENCES tb_Fase(id_fase) ON DELETE SET NULL;
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_time_1) REFERENCES tb_Atletica(id_atletica) ON DELETE SET NULL;
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_time_2) REFERENCES tb_Atletica(id_atletica) ON DELETE SET NULL;
ALTER TABLE tb_Estatisticas ADD FOREIGN KEY(id_partida) REFERENCES tb_Partidas(id_partida) ON DELETE CASCADE;
ALTER TABLE tb_Estatisticas ADD FOREIGN KEY(id_competidor) REFERENCES tb_Competidor(matricula) ON DELETE CASCADE;
ALTER TABLE tb_Fase ADD FOREIGN KEY(id_edicao) REFERENCES tb_Edicao(id_edicao) ON DELETE CASCADE;
ALTER TABLE tb_Escalacao ADD FOREIGN KEY(id_partida) REFERENCES tb_Partidas(id_partida) ON DELETE CASCADE;
ALTER TABLE tb_Relacionados ADD FOREIGN KEY(id_competidor) REFERENCES tb_Competidor(matricula) ON DELETE CASCADE;
ALTER TABLE tb_Estatisticas ADD FOREIGN KEY(id_acao) REFERENCES tb_Acao(id_acao) ON DELETE CASCADE;
ALTER TABLE tb_Acao ADD FOREIGN KEY(id_esporte) REFERENCES tb_Esportes(id_codigo) ON DELETE CASCADE;
ALTER TABLE tb_EsportesAtletica ADD FOREIGN KEY(id_esporte) REFERENCES tb_Esportes(id_codigo) ON DELETE CASCADE;
ALTER TABLE tb_EsportesAtletica ADD FOREIGN KEY(id_atletica) REFERENCES tb_Atletica(id_atletica) ON DELETE CASCADE;
ALTER TABLE tb_EsporteEdicao ADD FOREIGN KEY(id_esporte) REFERENCES tb_Esportes(id_codigo) ON DELETE CASCADE;
ALTER TABLE tb_EsporteEdicao ADD FOREIGN KEY(id_edicao) REFERENCES tb_Edicao(id_edicao) ON DELETE CASCADE;
ALTER TABLE tb_RelacionadosEdicao ADD FOREIGN KEY(id_relacionado) REFERENCES tb_Relacionados(id_relacionado) ON DELETE CASCADE;
ALTER TABLE tb_RelacionadosEdicao ADD FOREIGN KEY(id_edicao) REFERENCES tb_Edicao(id_edicao) ON DELETE CASCADE;
ALTER TABLE tb_RelacionadosEscalacao ADD FOREIGN KEY(id_relacionado) REFERENCES tb_Relacionados(id_relacionado) ON DELETE CASCADE;
ALTER TABLE tb_RelacionadosEscalacao ADD FOREIGN KEY(id_escalacao) REFERENCES tb_Escalacao(id_escalacao) ON DELETE CASCADE;