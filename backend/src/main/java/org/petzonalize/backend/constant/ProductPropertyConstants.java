package org.petzonalize.backend.constant;

public interface ProductPropertyConstants {
    int PRODUCT_COLOR_MAX = 50;
    String PRODUCT_COLOR_MESSAGE = "Product property color (string) cannot be longer than 50 characters";
    
    int PRODUCT_SIZE_MAX = 50;
    String PRODUCT_SIZE_MESSAGE = "Product property size (string) cannot be longer than 50 characters";
    
    int PRODUCT_PATTERN_MAX = 20;
    String PRODUCT_PATTERN_MESSAGE = "Product property pattern (string) cannot be longer than 20 characters";
    
    int PRODUCT_MATERIAL_MAX = 20;
    String PRODUCT_MATERIAL_MESSAGE = "Product property material (string) cannot be longer than 20 characters";
    
    int PRODUCT_PETNAME_MAX = 100;
    String PRODUCT_PETNAME_MESSAGE = "Product property petname (string) cannot be longer than 100 characters";
    
    int PRODUCT_PETPHONE_MIN = 8;
    int PRODUCT_PETPHONE_MAX = 15;
    String PRODUCT_PETPHONE_MESSAGE = "Product property petphone (string) cannot be less than 8 or longer than 20 characters";
    
    int PRODUCT_SHAPE_MAX = 20;
    String PRODUCT_SHAPE_MESSAGE = "Product property shape (string) cannot be longer than 20 characters";
    
    int PRODUCT_BODY_MAX = 50;
    String PRODUCT_BODY_MESSAGE = "Product property body (string) cannot be longer than 50 characters";

    int PRODUCT_HEAD_MAX = 50;
    String PRODUCT_HEAD_MESSAGE = "Product property head (string) cannot be longer than 50 characters";
}
