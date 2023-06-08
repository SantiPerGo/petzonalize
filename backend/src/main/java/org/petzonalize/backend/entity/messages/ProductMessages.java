package org.petzonalize.backend.entity.messages;

public interface ProductMessages {
	int PRODUCT_NAME_MAX = 200;
	String PRODUCT_NAME_NULL = "Product name (string) cannot be null or empty";
    String PRODUCT_NAME_SIZE = "Product name (string) cannot be longer than 200 characters";
    
	int PRODUCT_DESC_MAX = 1000;
    String PRODUCT_DESC_SIZE = "Product description (string) cannot be longer than 1000 characters";
    
	int PRODUCT_CATEGORY_MAX = 20;
	String PRODUCT_CATEGORY_NULL = "Product category (string) cannot be null or empty";
    String PRODUCT_CATEGORY_SIZE = "Product category (string) cannot be longer than 20 characters";
    
	String PRODUCT_CUSTOM_NULL = "Product customizable (boolean) cannot be null or empty";
    
	int PRODUCT_IMG_MAX = 150;
	String PRODUCT_IMG_NULL = "Product category (string) cannot be null or empty";
    String PRODUCT_IMG_SIZE = "Product category (string) cannot be longer than 150 characters";
    
	int PRODUCT_TYPE_MAX = 20;
    String PRODUCT_TYPE_SIZE = "Product type (string) cannot be longer than 20 characters";
}
