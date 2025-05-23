CREATE TABLE Competidor 
( 
 nome INT,  
 matricula INT PRIMARY KEY,  
 idAtlética INT,  
 idAtlética INT,  
); 

CREATE TABLE Usuário 
( 
 Email INT PRIMARY KEY,  
 nickname INT,  
 senha INT,  
); 

CREATE TABLE Atlética 
( 
 cod INT PRIMARY KEY,  
 nome INT,  
); 

CREATE TABLE Esportes 
( 
 código INT PRIMARY KEY,  
 nome INT,  
); 

CREATE TABLE Edição 
( 
 id INT PRIMARY KEY,  
 data_fim INT,  
 data_começo INT,  
); 

CREATE TABLE Partidas 
( 
 placar_time_1 INT,  
 placar_time_2 INT,  
 id INT PRIMARY KEY,  
 idEdição INT,  
 idLocal INT,  
 idFase INT,  
 id_time_1 INT,  
 id_time_2 INT,  
); 

CREATE TABLE Local 
( 
 RA INT,  
 cep INT,  
 id INT PRIMARY KEY,  
 quadra INT,  
 rua INT,  
 lote INT,  
); 

CREATE TABLE Estatisticas 
( 
 id INT PRIMARY KEY,  
 qtd_acoes INT,  
 idPartidas INT,  
 idCompetidor INT,  
); 

CREATE TABLE Fase 
( 
 grupo INT,  
 nome INT,  
 id INT PRIMARY KEY,  
 idEdição INT,  
); 

CREATE TABLE Escalação 
( 
 is_titular INT,  
 idPartidas INT,  
); 

CREATE TABLE Relacionados 
( 
 função INT,  
 número INT,  
 idCompetidor INT,  
); 

CREATE TABLE Ação 
( 
 pontuação INT,  
 código INT PRIMARY KEY,  
 idEstatisticas INT,  
 idEsportes INT,  
); 

CREATE TABLE Esportes_Atletica 
( 
 código INT PRIMARY KEY,  
 cod INT PRIMARY KEY,  
); 

CREATE TABLE Esporte_Edicao 
( 
 código INT PRIMARY KEY,  
 id INT PRIMARY KEY,  
); 

CREATE TABLE Relacionados_Edição 
( 
 idRelacionados INT PRIMARY KEY,  
 id INT PRIMARY KEY,  
); 

CREATE TABLE Relacionados_Escalacao 
( 
 idRelacionados INT PRIMARY KEY,  
 idEscalação INT PRIMARY KEY,  
); 

ALTER TABLE Competidor ADD FOREIGN KEY(idAtlética) REFERENCES Atlética (idAtlética)
ALTER TABLE Competidor ADD FOREIGN KEY(idAtlética) REFERENCES Atlética (idAtlética)
ALTER TABLE Partidas ADD FOREIGN KEY(idEdição) REFERENCES Edição (idEdição)
ALTER TABLE Partidas ADD FOREIGN KEY(idLocal) REFERENCES Local (idLocal)
ALTER TABLE Partidas ADD FOREIGN KEY(idFase) REFERENCES Fase (idFase)
ALTER TABLE Partidas ADD FOREIGN KEY(id_time_1) REFERENCES Atlética (id_time_1)
ALTER TABLE Partidas ADD FOREIGN KEY(id_time_2) REFERENCES Atlética (id_time_2)
ALTER TABLE Estatisticas ADD FOREIGN KEY(idPartidas) REFERENCES Partidas (idPartidas)
ALTER TABLE Estatisticas ADD FOREIGN KEY(idCompetidor) REFERENCES Competidor (idCompetidor)
ALTER TABLE Fase ADD FOREIGN KEY(idEdição) REFERENCES Edição (idEdição)
ALTER TABLE Escalação ADD FOREIGN KEY(idPartidas) REFERENCES Partidas (idPartidas)
ALTER TABLE Relacionados ADD FOREIGN KEY(idCompetidor) REFERENCES Competidor (idCompetidor)
ALTER TABLE Ação ADD FOREIGN KEY(idEstatisticas) REFERENCES Estatisticas (idEstatisticas)
ALTER TABLE Ação ADD FOREIGN KEY(idEsportes) REFERENCES Esportes (idEsportes)
ALTER TABLE Esportes_Atletica ADD FOREIGN KEY(código) REFERENCES Esportes (código)
ALTER TABLE Esportes_Atletica ADD FOREIGN KEY(cod) REFERENCES Atlética (cod)
ALTER TABLE Esporte_Edicao ADD FOREIGN KEY(código) REFERENCES Esportes (código)
ALTER TABLE Esporte_Edicao ADD FOREIGN KEY(id) REFERENCES Edição (id)
ALTER TABLE Relacionados_Edição ADD FOREIGN KEY(idRelacionados) REFERENCES Relacionados (idRelacionados)
ALTER TABLE Relacionados_Edição ADD FOREIGN KEY(id) REFERENCES Edição (id)
ALTER TABLE Relacionados_Escalacao ADD FOREIGN KEY(idRelacionados) REFERENCES Relacionados (idRelacionados)
ALTER TABLE Relacionados_Escalacao ADD FOREIGN KEY(idEscalação) REFERENCES Escalação (idEscalação)

