-- Criação do Banco de Dados (Opcional, caso ainda não exista)
CREATE DATABASE IF NOT EXISTS `db_educacional` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db_educacional`;

-- -----------------------------------------------------
-- Tabela `usuario`
-- Tabela base para todos os tipos de usuários do sistema.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `dt_nasc` DATETIME NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL, -- Aumentado para senhas com hash
  PRIMARY KEY (`id_usuario`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `responsavel`
-- Especialização de 'usuario', representa um responsável.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `responsavel` (
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  CONSTRAINT `fk_responsavel_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `aluno`
-- Especialização de 'usuario', representa um aluno.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluno` (
  `id_usuario` INT NOT NULL,
  `responsavel_id_usuario` INT NOT NULL,
  `moedas` INT NULL DEFAULT 0,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_aluno_responsavel_idx` (`responsavel_id_usuario` ASC),
  CONSTRAINT `fk_aluno_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_aluno_responsavel`
    FOREIGN KEY (`responsavel_id_usuario`)
    REFERENCES `responsavel` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `escola`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `escola` (
  `id_escola` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cep` VARCHAR(45) NULL,
  `rua` VARCHAR(45) NULL,
  `cidade` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_escola`),
  INDEX `fk_escola_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_escola_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `professor`
-- Especialização de 'usuario', representa um professor.
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `professor` (
  `id_usuario` INT NOT NULL,
  `escola_id_escola` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_professor_escola_idx` (`escola_id_escola` ASC),
  CONSTRAINT `fk_professor_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `usuario` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_professor_escola`
    FOREIGN KEY (`escola_id_escola`)
    REFERENCES `escola` (`id_escola`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `nivel_ensino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nivel_ensino` (
  `id_nivel_ensino` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_nivel_ensino`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `modulo_ensino`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `modulo_ensino` (
  `id_modulo_ensino` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `nivel_ensino_id_nivel_ensino` INT NOT NULL,
  PRIMARY KEY (`id_modulo_ensino`),
  INDEX `fk_modulo_ensino_nivel_ensino_idx` (`nivel_ensino_id_nivel_ensino` ASC),
  CONSTRAINT `fk_modulo_ensino_nivel_ensino`
    FOREIGN KEY (`nivel_ensino_id_nivel_ensino`)
    REFERENCES `nivel_ensino` (`id_nivel_ensino`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `aluno_has_modulo_ensino` (Muitos para Muitos)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluno_has_modulo_ensino` (
  `aluno_id_usuario` INT NOT NULL,
  `modulo_ensino_id_modulo_ensino` INT NOT NULL,
  PRIMARY KEY (`aluno_id_usuario`, `modulo_ensino_id_modulo_ensino`),
  INDEX `fk_aluno_has_modulo_ensino_modulo_ensino_idx` (`modulo_ensino_id_modulo_ensino` ASC),
  INDEX `fk_aluno_has_modulo_ensino_aluno_idx` (`aluno_id_usuario` ASC),
  CONSTRAINT `fk_aluno_has_modulo_ensino_aluno`
    FOREIGN KEY (`aluno_id_usuario`)
    REFERENCES `aluno` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_aluno_has_modulo_ensino_modulo_ensino`
    FOREIGN KEY (`modulo_ensino_id_modulo_ensino`)
    REFERENCES `modulo_ensino` (`id_modulo_ensino`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `amigos` (Muitos para Muitos)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amigos` (
  `aluno_id_usuario1` INT NOT NULL,
  `aluno_id_usuario2` INT NOT NULL,
  PRIMARY KEY (`aluno_id_usuario1`, `aluno_id_usuario2`),
  INDEX `fk_amigos_aluno2_idx` (`aluno_id_usuario2` ASC),
  CONSTRAINT `fk_amigos_aluno1`
    FOREIGN KEY (`aluno_id_usuario1`)
    REFERENCES `aluno` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_amigos_aluno2`
    FOREIGN KEY (`aluno_id_usuario2`)
    REFERENCES `aluno` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `conteudo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `conteudo` (
  `id_conteudo` INT NOT NULL AUTO_INCREMENT,
  `id_nivel_ensino` INT NOT NULL,
  `nome_conteudo` VARCHAR(45) NOT NULL,
  `professor_id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_conteudo`),
  INDEX `fk_conteudo_nivel_ensino_idx` (`id_nivel_ensino` ASC),
  INDEX `fk_conteudo_professor_idx` (`professor_id_usuario` ASC),
  CONSTRAINT `fk_conteudo_nivel_ensino`
    FOREIGN KEY (`id_nivel_ensino`)
    REFERENCES `nivel_ensino` (`id_nivel_ensino`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_conteudo_professor`
    FOREIGN KEY (`professor_id_usuario`)
    REFERENCES `professor` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `aluno_has_conteudo` (Muitos para Muitos)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluno_has_conteudo` (
  `aluno_id_usuario` INT NOT NULL,
  `conteudo_id_conteudo` INT NOT NULL,
  `status_conteudo` TINYINT(1) NULL DEFAULT 0, -- 0: Não concluído, 1: Concluído
  PRIMARY KEY (`aluno_id_usuario`, `conteudo_id_conteudo`),
  INDEX `fk_aluno_has_conteudo_conteudo_idx` (`conteudo_id_conteudo` ASC),
  CONSTRAINT `fk_aluno_has_conteudo_aluno`
    FOREIGN KEY (`aluno_id_usuario`)
    REFERENCES `aluno` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_aluno_has_conteudo_conteudo`
    FOREIGN KEY (`conteudo_id_conteudo`)
    REFERENCES `conteudo` (`id_conteudo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `atividade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `atividade` (
  `id_atividade` INT NOT NULL AUTO_INCREMENT,
  `tipo` ENUM('MULTIPLA_ESCOLHA', 'DISSERTATIVA', 'VERDADEIRO_FALSO') NULL,
  `pergunta` VARCHAR(255) NOT NULL, -- Aumentado para perguntas mais longas
  `resposta` VARCHAR(255) NOT NULL,
  `conteudo_id_conteudo` INT NOT NULL, -- Chave estrangeira inferida da relação
  PRIMARY KEY (`id_atividade`),
  INDEX `fk_atividade_conteudo_idx` (`conteudo_id_conteudo` ASC),
  CONSTRAINT `fk_atividade_conteudo`
    FOREIGN KEY (`conteudo_id_conteudo`)
    REFERENCES `conteudo` (`id_conteudo`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `conquista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `conquista` (
  `id_conquista` INT NOT NULL AUTO_INCREMENT,
  `nome_conquista` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_conquista`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `aluno_has_conquista` (Muitos para Muitos)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluno_has_conquista` (
  `aluno_id_usuario` INT NOT NULL,
  `conquista_id_conquista` INT NOT NULL,
  PRIMARY KEY (`aluno_id_usuario`, `conquista_id_conquista`),
  INDEX `fk_aluno_has_conquista_conquista_idx` (`conquista_id_conquista` ASC),
  CONSTRAINT `fk_aluno_has_conquista_aluno`
    FOREIGN KEY (`aluno_id_usuario`)
    REFERENCES `aluno` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_aluno_has_conquista_conquista`
    FOREIGN KEY (`conquista_id_conquista`)
    REFERENCES `conquista` (`id_conquista`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `item_loja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `item_loja` (
  `id_item_loja` INT NOT NULL AUTO_INCREMENT,
  `preco` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id_item_loja`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `aluno_has_item_loja` (Muitos para Muitos)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluno_has_item_loja` (
  `aluno_id_usuario` INT NOT NULL,
  `item_loja_id_item_loja` INT NOT NULL,
  PRIMARY KEY (`aluno_id_usuario`, `item_loja_id_item_loja`),
  INDEX `fk_aluno_has_item_loja_item_loja_idx` (`item_loja_id_item_loja` ASC),
  CONSTRAINT `fk_aluno_has_item_loja_aluno`
    FOREIGN KEY (`aluno_id_usuario`)
    REFERENCES `aluno` (`id_usuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_aluno_has_item_loja_item_loja`
    FOREIGN KEY (`item_loja_id_item_loja`)
    REFERENCES `item_loja` (`id_item_loja`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;
