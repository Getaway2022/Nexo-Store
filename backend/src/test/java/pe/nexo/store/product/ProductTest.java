package pe.nexo.store.product;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.math.BigDecimal;
import java.util.Map;
import org.junit.jupiter.api.Test;

class ProductTest {
 @Test void reservesAvailableStock() {
  Product product = product(5);
  product.reserve(2);
  assertThat(product.getStock()).isEqualTo(3);
  assertThat(product.isInStock()).isTrue();
 }

 @Test void marksProductUnavailableAtZeroStock() {
  Product product = product(2);
  product.reserve(2);
  assertThat(product.getStock()).isZero();
  assertThat(product.isInStock()).isFalse();
 }

 @Test void rejectsReservationAboveStock() {
  Product product = product(1);
  assertThatThrownBy(() -> product.reserve(2))
   .isInstanceOf(IllegalStateException.class)
   .hasMessageContaining("stock suficiente");
 }

 private Product product(int stock) {
  return new Product(null, "TEST-1", "Producto", "Setup", new BigDecimal("10.00"), null,
   4.5, "/products/monitor.jpg", null, "Demo", Map.of(), stock, true);
 }
}

