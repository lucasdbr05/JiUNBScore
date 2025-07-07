INSERT INTO Usuario (nickname, senha, email)
VALUES ('admin', 'admin', 'admin@gmail.com');

INSERT INTO Atletica (nome)
VALUES ('Selecic'),
       ('Aplicada');


INSERT INTO Competidor (matricula, nome, id_atletica) 
VALUES ('231003406', 'Lucas Flu', 1),
       ('231019003', 'Cauê', 1),
       ('231003531', 'Emershow', 1),
       ('231018964', 'Pedrolas', 1),
       ('231034841', 'Henrique', 1),
       ('200016997', 'Bigode', 2),
       ('190086912', 'Everson', 2),
       ('201020124', 'Guga', 2),
       ('211003406', 'Guto', 2),
       ('222340070', 'Trikas', 2);


INSERT INTO Esportes (nome)
VALUES ('Futsal'),
       ('Basquete'),
       ('Vôlei'),
       ('Handebol'),
       ('Futebol Americano');


INSERT INTO Edicao (data_fim, data_comeco)
VALUES ('2025-07-1', '2025-10-30');

INSERT INTO Fase (ordem, nome_etapa, nome_grupo)
VALUES (1, 'FINAL', '');

INSERT INTO Local (ra, cep, quadra, rua, lote)
VALUES ('Asa Norte', '70855-530', 'Cidade Universitária', 'Rua Santander', 'Arena Zhou');

INSERT INTO Partidas (placar_time_1, placar_time_2, id_edicao, id_fase, id_local, id_time_1, id_time_2, date)
VALUES (4, 0, 1, 1, 1, 1, 2, '2025-10-04T19:00:00');

INSERT INTO Acao (nome, pontuacao, id_esporte)
VALUES ('Gol', 100, 1),
       ('Assistência', 50, 1),
       ('Toco', 25, 2),
       ('Cesta', 100, 2),
       ('Assistência', 35, 2),
       ('Bloqueio', 15, 3),
       ('Defesa', 100, 1),
       ('Defesa', 100, 4),
       ('Gol', 100, 4),
       ('Assistência', 50, 4),
       ('Field Goal', 75, 5),
       ('Towchdown recebido', 100, 5),
       ('Towchdown corrido', 100, 5),
       ('Touchdown Passe', 100, 5),
       ('Interceptação', 75, 5),
       ('Interceptação', 20, 1),
       ('Interceptação', 15, 4),
       ('Tackle', 20, 5),
       ('Passe Completo', 10, 5),
       ('Passe Completo', 10, 1),
       ('Passe Completo', 10, 4),
       ('Passe Completo', 5, 5),
       ('Passe Completo', 5, 1),
       ('Passe Tentado', 5, 4),
       ('Ponto', 100, 2);

INSERT INTO Estatisticas (qtd_acoes, id_partida, id_acao, id_competidor)
VALUES (2, 1, 2,'231003406'),
       (1, 1, 2,'231019003'),
       (3, 1, 1,'231003531');

INSERT INTO EsportesAtletica (id_atletica, id_esporte) 
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4);

INSERT INTO EsporteEdicao (id_edicao, id_esporte) 
VALUES (1, 1);
