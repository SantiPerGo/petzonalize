package org.petzonalize.backend.entity.messages;

public interface ProductPropertyMessages {
    int PRODUCT_COLOR_MAX = 50;
    int PRODUCT_SIZE_MAX = 50;
    int PRODUCT_PATTERN_MAX = 20;
    int PRODUCT_MATERIAL_MAX = 20;
    int PRODUCT_PETNAME_MAX = 100;
    int PRODUCT_PETPHONE_MIN = 8;
    int PRODUCT_PETPHONE_MAX = 15;
    int PRODUCT_SHAPE_MAX = 20;
    int PRODUCT_BODY_MAX = 50;
    int PRODUCT_HEAD_MAX = 50;

    String PRODUCT_COLOR_MESSAGE = "Product property color cannot be longer than 50 characters";
    String PRODUCT_SIZE_MESSAGE = "Product property size cannot be longer than 50 characters";
    String PRODUCT_PATTERN_MESSAGE = "Product property pattern cannot be longer than 20 characters";
    String PRODUCT_MATERIAL_MESSAGE = "Product property material cannot be longer than 20 characters";
    String PRODUCT_PETNAME_MESSAGE = "Product property petname cannot be longer than 100 characters";
    String PRODUCT_PETPHONE_MESSAGE = "Product property petphone cannot be less than 8 or longer than 20 characters";
    String PRODUCT_SHAPE_MESSAGE = "Product property shape cannot be longer than 20 characters";
    String PRODUCT_BODY_MESSAGE = "Product property body cannot be longer than 50 characters";
    String PRODUCT_HEAD_MESSAGE = "Product property head cannot be longer than 50 characters";





}
