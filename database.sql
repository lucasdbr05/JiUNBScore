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


ALTER TABLE Usuario ADD FOREIGN KEY(nickname) REFERENCES Usuario(nickname);
ALTER TABLE Competidor ADD FOREIGN KEY(id_atletica) REFERENCES Atletica(id) ON DELETE CASCADE;
ALTER TABLE Partidas ADD FOREIGN KEY(id_edicao) REFERENCES Edicao(id) ON DELETE CASCADE;
ALTER TABLE Partidas ADD FOREIGN KEY(id_local) REFERENCES Local(id) ON DELETE SET NULL;
ALTER TABLE Partidas ADD FOREIGN KEY(id_fase) REFERENCES Fase(id) ON DELETE SET NULL;
ALTER TABLE Partidas ADD FOREIGN KEY(id_time_1) REFERENCES Atletica(id) ON DELETE SET NULL;
ALTER TABLE Partidas ADD FOREIGN KEY(id_time_2) REFERENCES Atletica(id) ON DELETE SET NULL;
ALTER TABLE Estatisticas ADD FOREIGN KEY(id_partida) REFERENCES Partidas(id) ON DELETE CASCADE;
ALTER TABLE Estatisticas ADD FOREIGN KEY(id_competidor) REFERENCES Competidor(matricula) ON DELETE CASCADE;
ALTER TABLE Relacionados ADD FOREIGN KEY(id_competidor) REFERENCES Competidor(matricula) ON DELETE CASCADE;
ALTER TABLE Estatisticas ADD FOREIGN KEY(id_acao) REFERENCES Acao(id) ON DELETE CASCADE;
ALTER TABLE Acao ADD FOREIGN KEY(id_esporte) REFERENCES Esportes(id) ON DELETE CASCADE;
ALTER TABLE EsportesAtletica ADD FOREIGN KEY(id_esporte) REFERENCES Esportes(id) ON DELETE CASCADE;
ALTER TABLE EsportesAtletica ADD FOREIGN KEY(id_atletica) REFERENCES Atletica(id) ON DELETE CASCADE;
ALTER TABLE EsporteEdicao ADD FOREIGN KEY(id_esporte) REFERENCES Esportes(id) ON DELETE CASCADE;
ALTER TABLE EsporteEdicao ADD FOREIGN KEY(id_edicao) REFERENCES Edicao(id) ON DELETE CASCADE;
ALTER TABLE RelacionadosEdicao ADD FOREIGN KEY(id_relacionado) REFERENCES Relacionados(id) ON DELETE CASCADE;
ALTER TABLE RelacionadosEdicao ADD FOREIGN KEY(id_edicao) REFERENCES Edicao(id) ON DELETE CASCADE;

CREATE OR REPLACE VIEW ranking_atletas AS
SELECT
    c.matricula AS atleta_id,
    c.nome AS atleta_nome,
    a.nome AS atletica_nome,
    p.id_edicao AS edicao_id,
    SUM((ac.pontuacao * e.qtd_acoes) / 10.0) AS ranking
FROM Estatisticas e
JOIN Acao ac ON ac.id = e.id_acao
JOIN Competidor c ON c.matricula = e.id_competidor
JOIN Atletica a ON a.id = c.id_atletica
JOIN Partidas p ON p.id = e.id_partida
GROUP BY c.matricula, c.nome, a.nome, p.id_edicao
ORDER BY p.id_edicao, ranking DESC;

CREATE OR REPLACE PROCEDURE get_standings_by_edition(
    IN p_edicao_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DROP TABLE IF EXISTS temp_standings;
    CREATE TABLE temp_standings AS
    SELECT
        a.id AS team_id,
        a.nome AS team_name,
        a.logo AS team_logo,
        COUNT(p.id) AS games_played,
        SUM(
            CASE
                WHEN (a.id = p.id_time_1 AND p.placar_time_1 > p.placar_time_2)
                  OR (a.id = p.id_time_2 AND p.placar_time_2 > p.placar_time_1)
                THEN 1 ELSE 0 END
        ) AS wins,
        SUM(
            CASE WHEN p.placar_time_1 = p.placar_time_2 THEN 1 ELSE 0 END
        ) AS draws,
        SUM(
            CASE
                WHEN (a.id = p.id_time_1 AND p.placar_time_1 < p.placar_time_2)
                  OR (a.id = p.id_time_2 AND p.placar_time_2 < p.placar_time_1)
                THEN 1 ELSE 0 END
        ) AS losses,
        SUM(
            CASE
                WHEN a.id = p.id_time_1 THEN p.placar_time_1
                WHEN a.id = p.id_time_2 THEN p.placar_time_2
                ELSE 0 END
        ) AS scored,
        SUM(
            CASE
                WHEN a.id = p.id_time_1 THEN p.placar_time_2
                WHEN a.id = p.id_time_2 THEN p.placar_time_1
                ELSE 0 END
        ) AS conceded
    FROM
        atletica a
        INNER JOIN partidas p ON (a.id = p.id_time_1 OR a.id = p.id_time_2)
    WHERE
        p.id_edicao = p_edicao_id
        AND p.id_fase IN (SELECT id FROM fase WHERE nome_grupo IS NOT NULL)
    GROUP BY
        a.id, a.nome, a.logo;

    ALTER TABLE temp_standings ADD COLUMN saldo INT;
    ALTER TABLE temp_standings ADD COLUMN points INT;
    ALTER TABLE temp_standings ADD COLUMN rank INT;
   
    UPDATE temp_standings
    SET
        saldo = scored - conceded,
        points = wins * 3 + draws;

    WITH ranked AS (
        SELECT
            team_id,
            ROW_NUMBER() OVER (
                ORDER BY points DESC, saldo DESC, scored DESC
            ) AS rk
        FROM temp_standings
    )
    UPDATE temp_standings t
    SET rank = r.rk
    FROM ranked r
    WHERE t.team_id = r.team_id;
END;
$$;