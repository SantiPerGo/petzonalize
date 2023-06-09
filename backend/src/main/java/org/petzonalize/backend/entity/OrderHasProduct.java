package org.petzonalize.backend.entity;


import org.petzonalize.backend.entity.messages.OrderMessages;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="orders_has_products")
public class OrderHasProduct implements OrderMessages {
	@Id
	@Column(name = "orders_has_products_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
	
	@ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
	
	@NotNull(message = ORDER_AMOUNT_NULL)
    private int amount;
}
