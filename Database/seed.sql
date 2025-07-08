INSERT INTO Usuario (nickname, senha, email)
VALUES 
    ('admin', 'admin', 'admin@gmail.com'),
    ('painato', 'painato', 'painato@gaucho.com'),
    ('jonh', 'arias', 'jonh@arias.com'),
    ('german', 'cano', 'german@cano.com'),
    ('fabio', 'goleiro', 'fabio@goleiro.com');
    

INSERT INTO Atletica (nome)
VALUES ('Selecic'),
       ('Insana'),
       ('Aplicada'),
       ('Milionária'),
       ('Pesadelo'),
       ('Kanbada'),
       ('Halterada'),
       ('Hackeada');


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
VALUES ('2025-07-1', '2025-10-30'),
    ('2024-05-2', '2024-10-09'),
    ('2023-01-04', '2026-07-30'),
    ('2022-01-25', '2022-05-10'),
    ('2021-08-24', '2021-11-21');

INSERT INTO Fase (ordem, nome_etapa, nome_grupo)
VALUES (1, 'GRUPO', 'A'),
    (1, 'GRUPO', 'B'),
    (1, 'GRUPO', 'C'),
    (1, 'GRUPO', 'D'),
    (1, 'GRUPO', 'E'),
    (1, 'GRUPO', 'F'),
    (1, 'GRUPO', 'G'),
    (1, 'GRUPO', 'H'),
    (2, 'OITAVAS DE FINAL', NULL),
    (3, 'QUARTAS DE FINAL', NULL),
    (4, 'SEMI', NULL),
    (5, '3o LUGAR', NULL),
    (6, 'FINAL', NULL);

INSERT INTO Local (ra, cep, quadra, rua, lote)
VALUES ('Asa Norte', '70855-530', 'Cidade Universitária', 'Rua Santander', 'Arena Zhou'),
        ('Asa Norte', '70910-900', 'Cidade Universitária', 'Centro Olimpico', 'Arena UnB'),
        ('Asa Sul', '70330-000', '102 sul', 'Eixinho', 'Vila Norai'),
        ('Ceilândia', '70040-020', 'QNN 14', 'St. N', 'Abadião'),
        ('Gama', '72492-010', 'Setor Central', 'Rua Walmir Campelo Bezerra', 'Bezerrão');

INSERT INTO Partidas (placar_time_1, placar_time_2, id_edicao, id_fase, id_local, id_time_1, id_time_2, date) 
VALUES
    (8, 0, 1, 1, 1, 1, 2, '2025-07-07 00:00:00'),
    (5, 1, 1, 2, 1, 3, 4, '2025-07-07 00:00:00'),
    (3, 0, 1, 1, 1, 1, 6, '2025-07-07 00:00:00'),
    (2, 6, 1, 1, 1, 5, 1, '2025-07-07 00:00:00'),
    (1, 5, 1, 2, 1, 7, 3, '2025-07-07 00:00:00'),
    (3, 2, 1, 2, 1, 3, 8, '2025-07-07 00:00:00'),
    (2, 4, 1, 2, 1, 4, 7, '2025-07-07 00:00:00'),
    (3, 3, 1, 2, 1, 8, 4, '2025-07-07 00:00:00'),
    (4, 0, 1, 2, 1, 7, 8, '2025-07-07 00:00:00'),
    (0, 5, 1, 1, 1, 2, 5, '2025-07-07 00:00:00'),
    (4, 3, 1, 1, 1, 6, 2, '2025-07-07 00:00:00'),
    (3, 2, 1, 1, 1, 6, 5, '2025-07-07 00:00:00');


INSERT INTO Acao (nome, pontuacao, id_esporte)
VALUES ('Gol', 100, 1),
       ('Assistência', 50, 1),
       ('Toco', 25, 2),
       ('Cesta', 100, 2),
       ('Assistência', 35, 2),
       ('Bloqueio', 15, 3),
       ('Defesa', 45, 1),
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
       (3, 1, 1,'231003531'),
       (5, 1, 14, '231034841'),
       (1, 1, 15, '231003406');

INSERT INTO EsportesAtletica (id_atletica, id_esporte) 
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5);

INSERT INTO EsporteEdicao (id_edicao, id_esporte) 
VALUES 
    (1, 1), (1, 2),(1, 3),(1, 4),(1, 5),
    (2, 1), (2, 2),(2, 3),(2, 4),(2, 5),
    (3, 1), (3, 2),(3, 3),(3, 4),(3, 5),
    (4, 1), (4, 2),(4, 3),(4, 4),(4, 5),
    (5, 1), (5, 2),(5, 3),(5, 4),(5, 5);
    
        
