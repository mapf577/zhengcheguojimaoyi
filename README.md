# Vehicle Export Platform Prototype

This repository contains the first design and static prototype for an overseas vehicle export and auto parts sales platform.

## Open The Prototype

Start the lightweight backend:

```text
npm start
```

Website served by the backend:

```text
http://localhost:3000/
```

Real admin console:

```text
http://localhost:3000/admin/
```

Default development login:

```text
admin / admin123
```

Static prototype file:

```text
prototype/index.html
```

Legacy static import prototype:

```text
prototype/admin.html
```

## Documents

- `docs/vehicle-export-platform-design.md`: Product and technical design.
- `docs/data-upload-guide.md`: Data upload and import guide.

## Prototype Features

- Vehicle and auto parts landing page.
- Product filters.
- Inquiry drawer.
- Lightweight backend API with JSON persistence.
- Admin login.
- Vehicle and auto parts CRUD.
- Image upload to `backend/uploads`.
- Inquiry management.
- CSV import for vehicles and auto parts.
- Manual data entry.
- Saved data list.
- CSV export.
- Local static prototype data stored in browser `localStorage`.

## Security Note

Credential files such as `*.pem`, `*.key`, and `.env` are ignored and should not be committed.
