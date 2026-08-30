# Nexo Store API

Backend REST con Spring Boot 4, Java 17, Spring Security, Spring Data JPA, Validation y H2.

## Ejecutar

```powershell
mvn spring-boot:run
```

La API usa `http://localhost:8080`. El frontend Next.js usa el puerto `3000`.

## Acceso administrativo

- Usuario: `admin@nexo.pe`
- Contraseña: `Admin123`
- `POST /api/auth/login` entrega un JWT de 8 horas.

## Endpoints

- Tienda: `GET /api/products`, `GET /api/products/offers`, `POST /api/orders`
- Admin: `GET /api/admin/dashboard`
- Productos: `POST|PUT|DELETE /api/admin/products`
- Pedidos: `GET /api/admin/orders`, `PATCH /api/admin/orders/{id}/status`

Los endpoints `/api/admin/**` requieren `Authorization: Bearer <token>`. H2 persiste en `./data/nexostore`. Cupón demo: `NEXO10`.
