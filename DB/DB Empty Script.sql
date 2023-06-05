-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema petzonalize
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema petzonalize
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `petzonalize` DEFAULT CHARACTER SET utf8 ;
USE `petzonalize` ;

-- -----------------------------------------------------
-- Table `petzonalize`.`product_properties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petzonalize`.`product_properties` (
  `product_property_id` INT NOT NULL AUTO_INCREMENT,
  `color` VARCHAR(50) NULL,
  `size` VARCHAR(50) NULL,
  `pattern` VARCHAR(20) NULL,
  `material` VARCHAR(20) NULL,
  `petname` VARCHAR(100) NULL,
  `petphone` VARCHAR(15) NULL,
  `shape` VARCHAR(20) NULL,
  `body` VARCHAR(50) NULL,
  `head` VARCHAR(50) NULL,
  PRIMARY KEY (`product_property_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petzonalize`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petzonalize`.`products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` VARCHAR(1000) NULL,
  `category` VARCHAR(20) NOT NULL,
  `customizable` INT NOT NULL,
  `price` DECIMAL(10,2) NULL,
  `imgUrl` VARCHAR(150) NOT NULL,
  `stock` INT NULL,
  `type` VARCHAR(20) NULL,
  `product_property_id` INT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `fk_product_property_idx` (`product_property_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_property`
    FOREIGN KEY (`product_property_id`)
    REFERENCES `petzonalize`.`product_properties` (`product_property_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petzonalize`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petzonalize`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `privileges` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petzonalize`.`css_properties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petzonalize`.`css_properties` (
  `css_property_id` INT NOT NULL AUTO_INCREMENT,
  `dog_top` VARCHAR(10) NOT NULL,
  `dog_right` VARCHAR(10) NOT NULL,
  `cat_top` VARCHAR(10) NOT NULL,
  `cat_right` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`css_property_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petzonalize`.`customizables`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petzonalize`.`customizables` (
  `customizable_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `category` VARCHAR(20) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `imgUrl` VARCHAR(150) NOT NULL,
  `stock` INT NULL,
  `css_property_id` INT NULL,
  PRIMARY KEY (`customizable_id`),
  INDEX `fk_css_property_idx` (`css_property_id` ASC) VISIBLE,
  CONSTRAINT `fk_css_property`
    FOREIGN KEY (`css_property_id`)
    REFERENCES `petzonalize`.`css_properties` (`css_property_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petzonalize`.`sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petzonalize`.`sizes` (
  `size_id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(20) NOT NULL,
  `small` VARCHAR(100) NOT NULL,
  `medium` VARCHAR(100) NOT NULL,
  `big` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`size_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
