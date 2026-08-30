# Contrato REST requerido por el frontend

Base: `NEXT_PUBLIC_API_URL` (por ejemplo, `http://localhost:8080/api`). Las rutas administrativas requieren `Authorization: Bearer <JWT>` y deben devolver `401` cuando el token no sea válido.

## Tienda

- `GET /products` → `Product[]`
- `GET /products/{id}` → `Product`
- `GET /products/{id}/related` → `Product[]`
- `GET /products/offers` → `Product[]`
- `POST /orders` con `CreateOrderRequest` → `OrderResponse`

`Product`: `{ id, name, sku, category, price, originalPrice?, rating, image, tag?, spec, specifications?, stock, inStock }`.

`CreateOrderRequest`: `{ customerName, email, phone, address, city, paymentMethod, couponCode, items: [{ productId, quantity }] }`.

`OrderResponse`: `{ id, orderNumber, status, total, createdAt }`.

## Autenticación y administración

- `POST /auth/login` con `{ email, password }` → `{ token, user: { name, email, role: "ADMIN" } }`
- `GET /auth/me` → `{ name, email, role: "ADMIN" }`
- `GET /admin/dashboard` → `{ revenue, orders, customers, lowStock, monthlySales: [{ month, total }], recentOrders: [{ id, orderNumber, customerName, total, status, createdAt }] }`
- `GET /admin/products` → `Product[]`
- `POST /admin/products` → `Product`
- `PUT /admin/products/{id}` → `Product`
- `DELETE /admin/products/{id}` → `204`
- `GET /admin/orders` → `AdminOrder[]`
- `GET /admin/orders/{id}` → `AdminOrder`
- `PATCH /admin/orders/{id}/status` con `{ status }` → `AdminOrder`
- `GET /admin/customers` → `Customer[]`
- `GET /admin/customers/{id}` → `Customer` con su historial `orders`
- `GET /admin/settings` → `StoreSettings`
- `PUT /admin/settings` con `StoreSettings` → `StoreSettings`

Los errores JSON deberían usar `{ "message": "Descripción útil" }`, además del estado HTTP correspondiente (`400`, `401`, `403`, `404` o `500`). El frontend no simula respuestas exitosas ni reemplaza errores con datos ficticios.
