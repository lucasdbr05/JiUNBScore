
CREATE TABLE tb_competidor 
( 
 nome INT,  
 id_matricula INT PRIMARY KEY,  
 id_atletica INT
); 

CREATE TABLE tb_usuario 
( 
 id_email INT PRIMARY KEY,  
 nickname INT,  
 senha INT
); 

CREATE TABLE tb_atletica 
( 
 id_cod INT PRIMARY KEY,  
 nome INT
); 

CREATE TABLE tb_esportes 
( 
 id_codigo INT PRIMARY KEY,  
 nome INT
); 

CREATE TABLE tb_edicao 
( 
 id_edicao INT PRIMARY KEY,  
 data_fim INT,  
 data_comeco INT
); 

CREATE TABLE tb_partidas 
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

CREATE TABLE tb_local 
( 
 ra INT,  
 cep INT,  
 id_local INT PRIMARY KEY,  
 quadra INT,  
 rua INT,  
 lote INT
); 

CREATE TABLE tb_estatisticas 
( 
 id_estatistica INT PRIMARY KEY,  
 qtd_acoes INT,  
 id_partida INT,  
 id_competidor INT
); 

CREATE TABLE tb_fase 
( 
 grupo INT,  
 nome INT,  
 id_fase INT PRIMARY KEY,  
 id_edicao INT
); 

CREATE TABLE tb_escalacao 
( 
 is_titular INT,  
 id_partida INT
); 

CREATE TABLE tb_relacionados 
( 
 funcao INT,  
 numero INT,  
 id_competidor INT
); 

CREATE TABLE tb_acao 
( 
 pontuacao INT,  
 id_acao INT PRIMARY KEY,  
 id_estatistica INT,  
 id_esporte INT
); 

CREATE TABLE tb_esportes_atletica 
( 
 id_esporte INT,  
 id_atletica INT,  
 PRIMARY KEY (id_esporte, id_atletica)
); 

CREATE TABLE tb_esporte_edicao 
( 
 id_esporte INT,  
 id_edicao INT,  
 PRIMARY KEY (id_esporte, id_edicao)
); 

CREATE TABLE tb_relacionados_edicao 
( 
 id_relacionado INT,  
 id_edicao INT,  
 PRIMARY KEY (id_relacionado, id_edicao)
); 

CREATE TABLE tb_relacionados_escalacao 
( 
 id_relacionado INT,  
 id_escalacao INT,  
 PRIMARY KEY (id_relacionado, id_escalacao)
); 

ALTER TABLE tb_competidor ADD FOREIGN KEY(id_atletica) REFERENCES tb_atletica (id_atletica);
ALTER TABLE tb_partidas ADD FOREIGN KEY(id_edicao) REFERENCES tb_edicao (id_edicao);
ALTER TABLE tb_partidas ADD FOREIGN KEY(id_local) REFERENCES tb_local (id_local);
ALTER TABLE tb_partidas ADD FOREIGN KEY(id_fase) REFERENCES tb_fase (id_fase);
ALTER TABLE tb_partidas ADD FOREIGN KEY(id_time_1) REFERENCES tb_atletica (id_atletica);
ALTER TABLE tb_partidas ADD FOREIGN KEY(id_time_2) REFERENCES tb_atletica (id_atletica);
ALTER TABLE tb_estatisticas ADD FOREIGN KEY(id_partida) REFERENCES tb_partidas (id_partida);
ALTER TABLE tb_estatisticas ADD FOREIGN KEY(id_competidor) REFERENCES tb_competidor (id_matricula);
ALTER TABLE tb_fase ADD FOREIGN KEY(id_edicao) REFERENCES tb_edicao (id_edicao);
ALTER TABLE tb_escalacao ADD FOREIGN KEY(id_partida) REFERENCES tb_partidas (id_partida);
ALTER TABLE tb_relacionados ADD FOREIGN KEY(id_competidor) REFERENCES tb_competidor (id_matricula);
ALTER TABLE tb_acao ADD FOREIGN KEY(id_estatistica) REFERENCES tb_estatisticas (id_estatistica);
ALTER TABLE tb_acao ADD FOREIGN KEY(id_esporte) REFERENCES tb_esportes (id_codigo);
ALTER TABLE tb_esportes_atletica ADD FOREIGN KEY(id_esporte) REFERENCES tb_esportes (id_codigo);
ALTER TABLE tb_esportes_atletica ADD FOREIGN KEY(id_atletica) REFERENCES tb_atletica (id_atletica);
ALTER TABLE tb_esporte_edicao ADD FOREIGN KEY(id_esporte) REFERENCES tb_esportes (id_codigo);
ALTER TABLE tb_esporte_edicao ADD FOREIGN KEY(id_edicao) REFERENCES tb_edicao (id_edicao);
ALTER TABLE tb_relacionados_edicao ADD FOREIGN KEY(id_relacionado) REFERENCES tb_relacionados (id_competidor);
ALTER TABLE tb_relacionados_edicao ADD FOREIGN KEY(id_edicao) REFERENCES tb_edicao (id_edicao);
ALTER TABLE tb_relacionados_escalacao ADD FOREIGN KEY(id_relacionado) REFERENCES tb_relacionados (id_competidor);
ALTER TABLE tb_relacionados_escalacao ADD FOREIGN KEY(id_escalacao) REFERENCES tb_escalacao (id_partida);

