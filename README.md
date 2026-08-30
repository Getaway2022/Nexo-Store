# Nexo Store

Tienda full-stack con Next.js, Spring Boot y PostgreSQL. Incluye catálogo, carrito, favoritos, pedidos y panel administrativo.

## Desarrollo local

Requisitos: Node.js 22 y Java 17.

```powershell
Copy-Item frontend/.env.example frontend/.env.local
cd frontend
npm.cmd ci
npm.cmd run dev
```

En otra terminal:

```powershell
cd backend
mvn spring-boot:run
```

Frontend: `http://localhost:3000`. API: `http://localhost:8080/api`.

## Producción con Docker

1. Copia `.env.example` como `.env`.
2. Sustituye todos los valores de ejemplo por secretos aleatorios y el dominio real.
3. No confirmes `.env` en Git.
4. Ejecuta `docker compose up -d --build`.
5. Comprueba `docker compose ps` y `curl http://localhost/api/health`.

La base de datos no está expuesta a Internet. Los datos persisten en el volumen `postgres_data`.

## Catálogo

La primera ejecución sobre una base vacía carga 40 productos de demostración. Después se administran desde `/admin/products`; no se deben editar directamente en PostgreSQL ni en Oracle Cloud.

El cargador inicial no modifica una base que ya contiene productos.

## Verificación

```powershell
cd frontend
npm.cmd run lint
npm.cmd run build

cd ../backend
mvn test
```

GitHub Actions repite estas comprobaciones en cada push y pull request.

## Documentación

- [Despliegue en Oracle Cloud](docs/oracle-cloud-deploy.md)
- [Contrato del backend](frontend/BACKEND_CONTRACT.md)
- [Créditos de imágenes](frontend/CREDITS.md)

