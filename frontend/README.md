# Nexo Store — Next.js + TypeScript

E-commerce gaming con catálogo, ofertas, favoritos, carrito persistente, checkout y panel administrativo. Construido con Next.js App Router, React, TypeScript y un sistema de diseño propio.

## Ejecutar

Requisitos: Node.js 20.9 o superior.

```powershell
npm install
npm run dev
```

Abre `http://localhost:3000`. Para producción usa `npm run build` y `npm start`.

## Panel de negocio

Abre `http://localhost:3000/admin/login`.

- Usuario: `admin@nexo.pe`
- Contraseña: `Admin123`

Incluye dashboard, métricas, CRUD de productos y gestión del estado de pedidos. La URL del backend se configura en `.env.local` con `NEXT_PUBLIC_API_URL`.

Autor: Andrés Junior Gamio Patricio.
