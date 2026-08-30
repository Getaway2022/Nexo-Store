package pe.nexo.store.product;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/admin/products")
public class AdminProductController {
 private final ProductService service; public AdminProductController(ProductService service){this.service=service;}
 @GetMapping public List<Product> all(){return service.findAll(null);}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Product create(@Valid @RequestBody ProductInput input){return service.create(input);}
 @PutMapping("/{id}") public Product update(@PathVariable Long id,@Valid @RequestBody ProductInput input){return service.update(id,input);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){service.delete(id);}
}
