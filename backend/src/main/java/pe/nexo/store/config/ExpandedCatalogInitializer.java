package pe.nexo.store.config;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pe.nexo.store.product.Product;
import pe.nexo.store.product.ProductRepository;

@Configuration
public class ExpandedCatalogInitializer {
 @Bean CommandLineRunner expandedCatalog(ProductRepository repository) {
  return args -> {
   List<Product> products = List.of(
    product(41,"Tarjeta Grafica Nova RTX","Componentes",2899,3299,4.9,"monitor.jpg","Potencia","12 GB GDDR6X - Ray Tracing"),
    product(42,"Procesador CoreFlux X8","Componentes",1299,null,4.8,"mouse.png","Nuevo","8 nucleos - 5.4 GHz"),
    product(43,"Placa Madre Nexus Z","Componentes",899,999,4.7,"keyboard.webp","Oferta","DDR5 - Wi-Fi 6E"),
    product(44,"Memoria Pulse RGB 32 GB","Componentes",429,null,4.8,"keyboard.webp",null,"DDR5 6000 MHz - Dual channel"),
    product(45,"Refrigeracion FrostFlow 360","Componentes",599,null,4.7,"speakers.jpg",null,"AIO 360 mm - ARGB"),
    product(46,"Fuente VoltCore 850W","Componentes",549,null,4.8,"controller.jpg",null,"80 Plus Gold - Modular"),
    product(47,"Silla Arena Elite","Sillas",1099,1299,4.8,"desk.jpg","Oferta","Ergonomica - Reclinable 165 grados"),
    product(48,"Silla Arena Air Mesh","Sillas",899,null,4.7,"desk.jpg","Nuevo","Malla transpirable - Soporte lumbar"),
    product(49,"Silla Titan XL","Sillas",1399,null,4.9,"desk.jpg","Premium","Talla XL - Base reforzada"),
    product(50,"Silla Rookie Compact","Sillas",549,null,4.5,"desk.jpg",null,"Compacta - Apoyabrazos ajustables"),
    product(51,"Silla Streamer Pro RGB","Sillas",1199,1399,4.7,"desk.jpg","-14%","Iluminacion RGB - Cojin cervical"),
    product(52,"Reposapies Arena Comfort","Sillas",149,null,4.4,"desk.jpg",null,"Altura ajustable - Antideslizante"),
    product(53,"Router Warp Wi-Fi 6","Conectividad",399,null,4.7,"streamdeck.jpg",null,"AX3000 - Mesh compatible"),
    product(54,"Router Warp Wi-Fi 7 Pro","Conectividad",999,1199,4.9,"streamdeck.jpg","Nuevo","BE9300 - Triple banda"),
    product(55,"Adaptador Link USB Wi-Fi","Conectividad",129,null,4.4,"webcam.jpg",null,"Wi-Fi 6 - USB 3.0"),
    product(56,"Switch Nexus 8 Puertos","Conectividad",189,null,4.6,"streamdeck.jpg",null,"Gigabit - Gestion inteligente"),
    product(57,"Cable Red Pro Cat 8","Conectividad",59,null,4.5,"microphone.png",null,"3 metros - 40 Gbps"),
    product(58,"Extensor Warp Mesh","Conectividad",249,299,4.6,"speakers.jpg","Oferta","Doble banda - Cobertura 120 m2"),
    product(59,"SSD Nova NVMe 1 TB","Almacenamiento",349,429,4.9,"mouse.png","Mas vendido","PCIe 4.0 - 7400 MB/s"),
    product(60,"SSD Nova NVMe 2 TB","Almacenamiento",649,null,4.8,"mouse.png",null,"PCIe 4.0 - 7000 MB/s"),
    product(61,"SSD Pocket USB-C 1 TB","Almacenamiento",499,null,4.7,"streamdeck.jpg",null,"Portatil - 1050 MB/s"),
    product(62,"Disco Vault 4 TB","Almacenamiento",459,null,4.6,"speakers.jpg",null,"HDD 7200 RPM - Cache 256 MB"),
    product(63,"Memoria Flash Titan 256 GB","Almacenamiento",119,149,4.5,"controller.jpg","-20%","USB 3.2 - Doble conector"),
    product(64,"Dock Vault Dual NVMe","Almacenamiento",279,null,4.6,"streamdeck.jpg",null,"USB-C - Clonacion offline")
   );
   repository.saveAll(products.stream().filter(product -> !repository.existsBySkuIgnoreCase(product.getSku())).toList());
  };
 }

 private Product product(long number,String name,String category,double price,Integer original,double rating,String image,String tag,String spec) {
  return new Product(null,"NEXO-"+String.format("%04d",number),name,category,BigDecimal.valueOf(price),
   original==null?null:BigDecimal.valueOf(original),rating,"/products/"+image,tag,spec,Map.of(),20,true);
 }
}

