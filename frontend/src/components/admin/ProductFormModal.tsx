import{X}from'lucide-react';
import{useState,type FormEvent}from'react';
import type{ProductInput}from'../../types/admin';
import type{Product,ProductCategory}from'../../types/product';

const categories:ProductCategory[]=['Periféricos','Audio','Streaming','Setup','Componentes','Sillas','Conectividad','Almacenamiento'];
const blank:ProductInput={name:'',sku:'',category:'Periféricos',price:0,rating:4.5,image:'',spec:'',stock:0,inStock:true};

export function ProductFormModal({product,onClose,onSave}:{product?:Product;onClose:()=>void;onSave:(data:ProductInput)=>Promise<void>}){
 const[data,setData]=useState<ProductInput>(product?{...product}:blank),[saving,setSaving]=useState(false),[error,setError]=useState('');
 const set=<K extends keyof ProductInput>(key:K,value:ProductInput[K])=>setData(current=>({...current,[key]:value}));
 const submit=async(event:FormEvent)=>{event.preventDefault();setSaving(true);setError('');try{await onSave(data);onClose()}catch(cause){setError(cause instanceof Error?cause.message:'No se pudo guardar')}finally{setSaving(false)}};
 return <div className="admin-modal-overlay"><form className="product-modal" onSubmit={submit}>
  <header><div><small>{product?'EDITAR':'NUEVO'} PRODUCTO</small><h2>{product?'Actualizar producto':'Agregar al catálogo'}</h2></div><button type="button" onClick={onClose} aria-label="Cerrar"><X/></button></header>
  {error&&<div className="error-state" role="alert">{error}</div>}
  <div className="admin-form-grid">
   <label className="wide">Nombre<input required value={data.name} onChange={event=>set('name',event.target.value)}/></label>
   <label>SKU<input required value={data.sku??''} onChange={event=>set('sku',event.target.value)}/></label>
   <label>Categoría<select value={data.category} onChange={event=>set('category',event.target.value as ProductCategory)}>{categories.map(category=><option key={category}>{category}</option>)}</select></label>
   <label>Precio<input required min="0.01" step="0.01" type="number" value={data.price} onChange={event=>set('price',Number(event.target.value))}/></label>
   <label>Precio anterior<input min="0" step="0.01" type="number" value={data.originalPrice??''} onChange={event=>set('originalPrice',event.target.value?Number(event.target.value):undefined)}/></label>
   <label>Stock<input required min="0" type="number" value={data.stock??0} onChange={event=>set('stock',Number(event.target.value))}/></label>
   <label>Valoración<input min="0" max="5" step="0.1" type="number" value={data.rating} onChange={event=>set('rating',Number(event.target.value))}/></label>
   <label className="wide">Especificaciones<input required value={data.spec} onChange={event=>set('spec',event.target.value)}/></label>
   <label className="wide">URL o ruta de imagen<input required value={data.image} placeholder="/products/producto.jpg o https://..." onChange={event=>set('image',event.target.value)}/></label>
   <label className="switch-row"><input type="checkbox" checked={data.inStock} onChange={event=>set('inStock',event.target.checked)}/>Producto disponible</label>
  </div>
  <footer><button type="button" onClick={onClose}>Cancelar</button><button className="admin-primary" disabled={saving}>{saving?'Guardando...':'Guardar producto'}</button></footer>
 </form></div>;
}

