package org.petzonalize.backend.entity.messages;

public interface CustomizableMessages {
	int CUSTOMIZABLE_NAME_MAX = 200;
	String CUSTOMIZABLE_NAME_NULL = "Customizable name (string) cannot be null or empty";
    String CUSTOMIZABLE_NAME_SIZE = "Customizable name (string) cannot be longer than 200 characters";

    int CUSTOMIZABLE_CATEGORY_MAX = 20;
    String CUSTOMIZABLE_CATEGORY_NULL = "Customizable category (string) cannot be null or empty";
    String CUSTOMIZABLE_CATEGORY_SIZE = "Customizable category (string) cannot be longer than 20 characters";
    
    int CUSTOMIZABLE_TYPE_MAX = 20;
    String CUSTOMIZABLE_TYPE_NULL = "Customizable type (string) cannot be null or empty";
    String CUSTOMIZABLE_TYPE_SIZE = "Customizable type (string) cannot be longer than 20 characters";
    
    String CUSTOMIZABLE_PRICE_NULL = "Customizable price (double) cannot be null or empty";
    
	int CUSTOMIZABLE_IMG_MAX = 150;
	String CUSTOMIZABLE_IMG_NULL = "Customizable name url (string) cannot be null or empty";
    String CUSTOMIZABLE_IMG_SIZE = "Customizable name url (string) cannot be longer than 150 characters";
    
}

