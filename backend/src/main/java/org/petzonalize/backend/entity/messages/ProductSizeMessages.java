package org.petzonalize.backend.entity.messages;

public interface ProductSizeMessages {
    int PRODUCT_SIZE_CATEGORY_MAX = 20;
    String PRODUCT_SIZE_CATEGORY_NULL = "Size category (string) cannot be null or empty ";
    String PRODUCT_SIZE_CATEGORY_LENGTH = "Product size category cannot be longer than 20 characters";

    int PRODUCT_SIZE_LENGTH = 100;
    String PRODUCT_SIZE_SMALL_NULL = "Size small (string) cannot be null or empty";
    String PRODUCT_SIZE_SMALL_LENGTH = "Product size small cannot be longer than 100 characters";

    String PRODUCT_SIZE_MEDIUM_NULL = "Size medium (string) cannot be null or empty";
    String PRODUCT_SIZE_MEDIUM_LENGTH = "Product size medium cannot be longer than 100 characters";

    String PRODUCT_SIZE_BIG_NULL = "Size big (string) cannot be null or empty";
    String PRODUCT_SIZE_BIG_LENGTH = "Product size big cannot be longer than 100 characters";

}