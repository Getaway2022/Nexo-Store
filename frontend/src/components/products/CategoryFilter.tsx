const categories=['Todos','Periféricos','Audio','Streaming','Setup','Componentes','Sillas','Conectividad','Almacenamiento'];
export function CategoryFilter({value,onChange}:{value:string;onChange:(value:string)=>void}) {return <div className="chips" role="group" aria-label="Categorías">{categories.map(category=><button key={category} className={value===category?'active':''} aria-pressed={value===category} onClick={()=>onChange(category)}>{category}</button>)}</div>}

