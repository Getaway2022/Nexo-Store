export const formatCurrency=(value:number)=>new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN',minimumFractionDigits:0}).format(value);
