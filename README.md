# LambdaTest Playwright Suite

End-to-end tests written in Playwright + TypeScript for two LambdaTest demo sites. They run locally or on the LambdaTest cloud grid.

- **E-commerce Playground**: registration, login, search and add-to-cart, built on the Page Object Model.
- **UI interactions**: form input, validation and slider tests against LambdaTest's demo pages.

## Quick start

Requires Node.js 20.19+.

```bash
git clone https://github.com/ebezzi1/LambdaTestPlaywright.git
cd LambdaTestPlaywright
npm install
npx playwright install
npm test
```

## Commands

| Command | What it does |
|---|---|
| `npm test` | Run the suite locally in Chromium |
| `npm run test:lambdatest` | Run on the LambdaTest grid (needs `.env`, see below) |
| `npm run typecheck` | Type-check with TypeScript |
| `npm run report` | Open the last HTML report |

To run on LambdaTest, copy `.env.example` to `.env` and add your username and access key.

## Layout

```
tests/
├── ecommerce/
│   ├── pages/              # page objects (*.page.ts)
│   └── specs/              # tests (*.spec.ts)
└── ui-interactions/        # form, validation and slider tests
```

## Notes

The tests hit the live demo sites, so expect failures when those sites are down. There's no mock data, and the e-commerce tests generate fresh users with Faker. See [TEST_PLAN.md](TEST_PLAN.md) for scope and approach.
