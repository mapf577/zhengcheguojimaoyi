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
- Chinese / English language switching for the website and admin console.
- Multilingual product fields: `title_en`, `title_zh`, `description_en`, `description_zh`.
- Product detail drawer with localized title, description, specs, image, and inquiry action.
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

## Language Switching

Website:

```text
http://localhost:3000/
```

Use the `中文 / English` button in the header.

Admin console:

```text
http://localhost:3000/admin/
```

Use the `中文 / English` button in the sidebar.

Product cards and detail drawers prefer `title_zh` / `description_zh` when Chinese is selected, and `title_en` / `description_en` when English is selected. If a localized field is empty, the website falls back to the original uploaded values.

## Security Note

Credential files such as `*.pem`, `*.key`, and `.env` are ignored and should not be committed.
