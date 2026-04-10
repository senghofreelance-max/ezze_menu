### Ezze Menu

Telegram mini app for browsing menus and placing orders.

### Installation

```sh
bench get-app $URL_OF_THIS_REPO --branch develop
bench install-app ezze_menu
```

### Purpose

`ezze_menu` is intended to provide the Frappe-side backend and app structure for a Telegram bot mini app where users can:

- browse menu items
- add items to an order
- submit orders from Telegram
- connect the ordering flow to future payment and fulfillment features

### Frontend Apps

Two Vue 3 applications now live inside this Frappe app:

- `ezze_menu_order_app`: customer-facing ordering flow
- `ezze_menu_admin`: admin dashboard

Shared frontend code lives in `frontend/shared` and provides:

- design tokens and Tailwind preset
- PrimeVue unstyled configuration
- Frappe JS SDK integration
- reusable form, dialog, toast, and layout primitives

### Build Notes

Each app has its own `package.json`, `vite.config.js`, and Tailwind config.

- build order app: `cd ezze_menu_order_app && npm install && npm run build`
- build admin app: `cd ezze_menu_admin && npm install && npm run build`

The build copies each generated `index.html` into `ezze_menu/www` so Frappe can serve:

- `/order`
- `/menu_admin`

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```sh
pre-commit install
```
