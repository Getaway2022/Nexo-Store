package pe.nexo.store.product;public class ProductNotFoundException extends RuntimeException{public ProductNotFoundException(Long id){super("Producto no encontrado: "+id);}}
