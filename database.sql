CREATE TABLE tb_Competidor 
(
    nome INT,  
    id_matricula INT PRIMARY KEY,  
    id_atletica INT
);


CREATE TABLE tb_Usuario 
(
    id_email INT PRIMARY KEY,  
    nickname INT,  
    senha INT
);


CREATE TABLE tb_Atletica 
(
    id_cod INT PRIMARY KEY,  
    nome INT
);


CREATE TABLE tb_Esportes 
(
    id_codigo INT PRIMARY KEY,  
    nome INT
);


CREATE TABLE tb_Edicao 
(
    id_edicao INT PRIMARY KEY,  
    data_fim INT,  
    data_comeco INT
);


CREATE TABLE tb_Partidas 
(
    placar_time_1 INT,  
    placar_time_2 INT,  
    id_partida INT PRIMARY KEY,  
    id_edicao INT,  
    id_local INT,  
    id_fase INT,  
    id_time_1 INT,  
    id_time_2 INT
);


CREATE TABLE tb_Local 
(
    ra INT,  
    cep INT,  
    id_local INT PRIMARY KEY,  
    quadra INT,  
    rua INT,  
    lote INT
);


CREATE TABLE tb_Estatisticas 
(
    id_estatistica INT PRIMARY KEY,  
    qtd_acoes INT,  
    id_partida INT,  
    id_competidor INT
);


CREATE TABLE tb_Fase 
(
    grupo INT,  
    nome INT,  
    id_fase INT PRIMARY KEY,  
    id_edicao INT
);


CREATE TABLE tb_Escalacao 
(
    is_titular INT,  
    id_partida INT
);


CREATE TABLE tb_Relacionados 
(
    funcao INT,  
    numero INT,  
    id_competidor INT
);


CREATE TABLE tb_Acao 
(
    pontuacao INT,  
    id_acao INT PRIMARY KEY,  
    id_estatistica INT,  
    id_esporte INT
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

ALTER TABLE tb_Competidor ADD FOREIGN KEY(id_atletica) REFERENCES tb_Atletica (id_atletica);
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_edicao) REFERENCES tb_Edicao (id_edicao);
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_local) REFERENCES tb_Local (id_local);
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_fase) REFERENCES tb_Fase (id_fase);
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_time_1) REFERENCES tb_Atletica (id_atletica);
ALTER TABLE tb_Partidas ADD FOREIGN KEY(id_time_2) REFERENCES tb_Atletica (id_atletica);
ALTER TABLE tb_Estatisticas ADD FOREIGN KEY(id_partida) REFERENCES tb_Partidas (id_partida);
ALTER TABLE tb_Estatisticas ADD FOREIGN KEY(id_competidor) REFERENCES tb_Competidor (id_matricula);
ALTER TABLE tb_Fase ADD FOREIGN KEY(id_edicao) REFERENCES tb_Edicao (id_edicao);
ALTER TABLE tb_Escalacao ADD FOREIGN KEY(id_partida) REFERENCES tb_Partidas (id_partida);
ALTER TABLE tb_Relacionados ADD FOREIGN KEY(id_competidor) REFERENCES tb_Competidor (id_matricula);
ALTER TABLE tb_Acao ADD FOREIGN KEY(id_estatistica) REFERENCES tb_Estatisticas (id_estatistica);
ALTER TABLE tb_Acao ADD FOREIGN KEY(id_esporte) REFERENCES tb_Esportes (id_codigo);
ALTER TABLE tb_EsportesAtletica ADD FOREIGN KEY(id_esporte) REFERENCES tb_Esportes (id_codigo);
ALTER TABLE tb_EsportesAtletica ADD FOREIGN KEY(id_atletica) REFERENCES tb_Atletica (id_atletica);
ALTER TABLE tb_EsporteEdicao ADD FOREIGN KEY(id_esporte) REFERENCES tb_Esportes (id_codigo);
ALTER TABLE tb_EsporteEdicao ADD FOREIGN KEY(id_edicao) REFERENCES tb_Edicao (id_edicao);
ALTER TABLE tb_RelacionadosEdicao ADD FOREIGN KEY(id_relacionado) REFERENCES tb_Relacionados (id_competidor);
ALTER TABLE tb_RelacionadosEdicao ADD FOREIGN KEY(id_edicao) REFERENCES tb_Edicao (id_edicao);
ALTER TABLE tb_RelacionadosEscalacao ADD FOREIGN KEY(id_relacionado) REFERENCES tb_Relacionados (id_competidor);
ALTER TABLE tb_RelacionadosEscalacao ADD FOREIGN KEY(id_escalacao) REFERENCES tb_Escalacao (id_partida);

