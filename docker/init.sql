SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

USE `epicTimer` ;

-- -----------------------------------------------------
-- Table `epicTimer`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `epicTimer`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `username` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `epicTimer`.`times`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `epicTimer`.`times` (
  `users_id` INT UNSIGNED NOT NULL,
  `uuid` VARCHAR(11) NOT NULL,
  `category` VARCHAR(45) NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `time` FLOAT UNSIGNED NULL DEFAULT NULL,
  `scramble` VARCHAR(78) NULL DEFAULT NULL,
  `penalty` VARCHAR(3) NULL DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  INDEX `fk_times_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_times_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `epicTimer`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;