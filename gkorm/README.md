# development directory

This directory contains the core services that make up the GKORM application. Each service can be run individually or together with Docker Compose.

## structure

- `api/` – FastAPI backend that exposes mission and user endpoints.
- `database/` – database container and schema notes.
- `frontend/` – Next.js user interface.
- `docker-compose.yml` – orchestrates the services for local development.

## development

First, install Docker. Then use Docker Compose to get started:

```bash
docker compose up --build
```
