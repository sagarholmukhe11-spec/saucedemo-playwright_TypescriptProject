# SauceDemo Playwright Framework

Playwright + TypeScript automation framework for [saucedemo.com](https://www.saucedemo.com)

---

## Project Structure

```
saucedemo-playwright/
├── pages/
│   ├── LoginPage.ts        ← Login page actions & assertions
│   ├── InventoryPage.ts    ← Products page actions & assertions
│   ├── CartPage.ts         ← Cart page actions & assertions
│   └── CheckoutPage.ts     ← Checkout pages actions & assertions
├── fixtures/
│   └── index.ts            ← Custom fixtures (pre-logged-in sessions)
├── tests/
│   └── e2e/
│       ├── login.spec.ts       ← 6 login tests
│       ├── inventory.spec.ts   ← 8 product/sort tests
│       ├── cart.spec.ts        ← 5 cart tests
│       └── checkout.spec.ts    ← 6 checkout tests
├── test-data/
│   └── users.json          ← All test users (standard, locked, etc.)
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## Setup in VS Code

### Step 1 — Open project
```bash
cd saucedemo-playwright
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Install Playwright browsers
```bash
npx playwright install
```

### Step 4 — Run all tests
```bash
npm test
```

---

## Useful Commands

| Command | What it does |
|---|---|
| `npm test` | Run all tests headless |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:debug` | Step-by-step debug mode |
| `npm run report` | Open HTML report |
| `npm run test:smoke` | Only @smoke tests |
| `npm run test:regression` | Only @regression tests |

---

## Test Users (from saucedemo.com)

| User | Username | What to test |
|---|---|---|
| Standard | standard_user | Happy path flows |
| Locked | locked_out_user | Login error message |
| Problem | problem_user | UI issues |
| Performance | performance_glitch_user | Slow load scenarios |

Password for all: `secret_sauce`

---

## Framework Design

- **Page Object Model** — Each page is a class. Locators are private. Actions and assertions are public methods.
- **Fixtures** — `loggedInPage` fixture auto-logs in before tests that need it. No login code in test files.
- **Test data** — All users in `test-data/users.json`. Easy to update in one place.
- **Tags** — Tests tagged `@smoke` and `@regression` so you can run subsets.
