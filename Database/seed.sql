INSERT INTO Usuario (nickname, senha, email)
VALUES ('admin', 'admin', 'admin@gmail.com');

INSERT INTO Atletica (nome)
VALUES ('Selecic'),
       ('Aplicada');


INSERT INTO Competidor (matricula, nome, id_atletica) 
VALUES ('231003406', 'Lucas Flu', 1),
       ('231019003', 'Cauê', 1),
       ('231003531', 'Emershow', 1);


INSERT INTO Esportes (nome)
VALUES ('Futsal'),
       ('Basquete'),
       ('Vôlei'),
       ('Handebol');


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
       ('Assistência', 50, 1);

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
