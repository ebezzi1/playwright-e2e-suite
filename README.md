# LambdaTest E-commerce Playground Playwright Test Suite

This repository contains a Playwright test suite for the LambdaTest E-commerce Playground application.

## Project Selection

I selected the LambdaTest E-commerce Playground because it is a feature-rich web application with both frontend and backend components, making it an ideal candidate for demonstrating a comprehensive testing approach. It includes user authentication, product browsing, a shopping cart, and a checkout process, which are all critical user flows in an e-commerce application.

## How to Set Up and Run the Tests

### Prerequisites
- Node.js (v20.19 or higher)
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Sabo2560/LambdaTestPlaywright.git
   ```
2. Navigate to the project directory:
   ```bash
   cd LambdaTestPlaywright
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Install the Playwright browsers:
   ```bash
   npx playwright install
   ```

### Project Structure
```
tests/
├── ecommerce/              # LambdaTest E-commerce Playground (Page Object Model)
│   ├── pages/              # *.page.ts page objects
│   └── specs/              # *.spec.ts test files
└── selenium-playground/    # LambdaTest Selenium Playground demo forms
```

### Running the Tests
To run the tests locally, use the following command:
```bash
npm test
```

This will run all the tests in the `tests` directory.

To run the tests on the LambdaTest cloud grid, copy `.env.example` to `.env`, fill in your LambdaTest username and access key, then run:
```bash
npm run test:lambdatest
```

To type-check the project:
```bash
npm run typecheck
```

To view the test report, use the following command:
```bash
npm run report
```

## Assumptions and Modifications
- The tests are designed to be run against the live LambdaTest E-commerce Playground application.
- The tests do not currently use any mock data or a dedicated test database.
- The tests are designed to be run in a clean state (e.g., no items in the cart).
