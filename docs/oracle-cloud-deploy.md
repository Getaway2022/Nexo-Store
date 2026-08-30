# Despliegue en Oracle Cloud Infrastructure

Esta guía utiliza una VM Ubuntu y recursos aptos para el nivel gratuito. La cuenta general de Oracle no sustituye una cuenta de Oracle Cloud Infrastructure.

## 1. Crear la VM

- Crea una instancia Ubuntu dentro de la región principal de tu cuenta.
- Elige únicamente una máquina marcada como apta para Always Free.
- Guarda la clave SSH privada en un lugar seguro; nunca la subas al repositorio.
- En la lista de seguridad de la red abre solamente TCP `22`, `80` y `443`.
- Reserva una IP pública si deseas evitar que cambie.

## 2. Preparar el servidor

Conéctate por SSH e instala Git, Docker Engine y el complemento Docker Compose siguiendo la documentación oficial de Docker para Ubuntu. Agrega tu usuario al grupo `docker` y vuelve a iniciar sesión.

No instales PostgreSQL directamente: el proyecto lo ejecuta en una red privada de Docker y solo Nginx publica el puerto web.

## 3. Descargar y configurar

```bash
git clone URL_DEL_REPOSITORIO.git nexo-store
cd nexo-store
cp .env.example .env
nano .env
```

Genera secretos independientes. Un ejemplo para generar texto aleatorio es:

```bash
openssl rand -base64 48
```

Configura `APP_CORS_ALLOWED_ORIGINS` y `NEXT_PUBLIC_API_URL` con el dominio final. No uses las contraseñas incluidas en la documentación de desarrollo.

## 4. Iniciar

```bash
docker compose up -d --build
docker compose ps
docker compose logs --tail=100 backend
curl http://localhost/api/health
```

## 5. Dominio y HTTPS

- Crea un registro DNS `A` que apunte a la IP pública de la VM.
- Configura el nombre del servidor en Nginx.
- Instala Certbot y emite un certificado Let's Encrypt.
- Activa la renovación automática y compruébala con `certbot renew --dry-run`.

No habilites el panel administrativo hasta que HTTPS esté activo.

## 6. Copias de seguridad

Realiza diariamente un volcado cifrado y conserva copias fuera de la VM:

```bash
docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc > nexostore.dump
```

Prueba periódicamente la restauración en una base separada. Una copia que nunca se ha restaurado no es una estrategia de respaldo verificada.

## 7. Actualizaciones

```bash
git pull --ff-only
docker compose up -d --build
docker image prune -f
```

Antes de actualizar en producción, crea una copia de seguridad y confirma que GitHub Actions esté en verde.

