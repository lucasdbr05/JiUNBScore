INSERT INTO tb_Usuario (nickname, senha, email)
VALUES ('admin', 'admin', 'admin@gmail.com');

INSERT INTO tb_Atletica (nome)
VALUES ('Selecic'),
       ('Aplicada');

INSERT INTO tb_Competidor (matricula, nome, id_atletica) 
VALUES ('231003406', 'Lucas Flu', 1),
       ('231019003', 'Cauê', 1),
       ('231003531', 'Emershow', 1);

INSERT INTO tb_Esportes (nome)
VALUES ('Futsal'),
       ('Basquete'),
       ('Vôlei'),
       ('Handebol');

INSERT INTO tb_Edicao (data_fim, data_comeco)
VALUES ('2025-07-1', '2025-10-30');

INSERT INTO tb_Fase (grupo, nome, id_edicao)
VALUES (1, 'FINAL', 1);

INSERT INTO tb_Local (ra, cep, quadra, rua, lote)
VALUES ('Asa Norte', '70855-530', 'Cidade Universitária', 'Rua Santander', 'Arena Zhou');

INSERT INTO tb_Partidas (placar_time_1, placar_time_2, id_edicao, id_fase, id_local, id_time_1, id_time_2)
VALUES (4, 0, 1, 1, 1, 1, 2);

INSERT INTO tb_Acao (nome, pontuacao, id_esporte)
VALUES ('Gol', 100, 1),
       ('Assistência', 50, 1);

INSERT INTO tb_Estatisticas (qtd_acoes, id_partida, id_acao, id_competidor)
VALUES (2, 1, 2,'231003406'),
       (1, 1, 2,'231019003'),
       (3, 1, 1,'231003531');
