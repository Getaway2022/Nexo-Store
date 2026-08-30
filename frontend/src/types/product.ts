export type ProductCategory =
  | 'Periféricos' | 'Audio' | 'Streaming' | 'Setup'
  | 'Componentes' | 'Sillas' | 'Conectividad' | 'Almacenamiento';
export interface Product {id:number;name:string;sku?:string;category:ProductCategory;price:number;originalPrice?:number;rating:number;image:string;tag?:string;spec:string;specifications?:Record<string,string>;stock?:number;inStock:boolean}
export interface CartItem {product:Product;quantity:number}
export type SortOption='featured'|'price-asc'|'price-desc'|'rating';

