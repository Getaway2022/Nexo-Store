# Nexo Store

Tienda full-stack con Next.js, Spring Boot y PostgreSQL. Incluye catálogo, carrito, favoritos, pedidos y panel administrativo.

## Aplicación desplegada

- Tienda: [https://nexo-store-roan.vercel.app](https://nexo-store-roan.vercel.app)
- API: [https://nexo-store-gfqu.onrender.com/api](https://nexo-store-gfqu.onrender.com/api)
- Panel administrativo: [https://nexo-store-roan.vercel.app/admin/login](https://nexo-store-roan.vercel.app/admin/login)

El frontend Next.js está desplegado en Vercel. El backend Spring Boot y la base de datos PostgreSQL están desplegados en Render. Las credenciales administrativas se configuran como variables privadas en Render y no deben almacenarse en el repositorio.

### Variables de producción

Vercel requiere esta variable de tipo `Config`:

```env
NEXT_PUBLIC_API_URL=https://nexo-store-gfqu.onrender.com/api
```

El servicio del backend en Render requiere:

```env
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}
SPRING_DATASOURCE_USERNAME=${{Postgres.PGUSER}}
SPRING_DATASOURCE_PASSWORD=${{Postgres.PGPASSWORD}}
APP_JWT_SECRET=<secreto-aleatorio-de-al-menos-64-caracteres>
APP_ADMIN_EMAIL=<correo-del-administrador>
APP_ADMIN_PASSWORD=<contraseña-segura>
APP_CORS_ALLOWED_ORIGINS=https://nexo-store-roan.vercel.app
```

El servicio PostgreSQL debe permanecer en la red privada de Render. Después de modificar una variable `NEXT_PUBLIC_*`, es necesario volver a desplegar el frontend porque su valor se incorpora durante la compilación.

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

