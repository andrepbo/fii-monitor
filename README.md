# FII Monitor

![CI](https://github.com/andrepbo/fii-monitor/actions/workflows/ci.yml/badge.svg)

A system for monitoring Real Estate Investment Funds (FIIs), with real-time price fetching, indicator analysis, and alert notifications.

## **Technologies**

- **Backend:** [NestJS](https://nestjs.com/)
- **Language:** TypeScript
- **Testing:** Jest + Supertest
- **CI/CD:** GitHub Actions
- **Integrations:** [Brapi](https://brapi.dev/)

## **Getting Started**

### **1. Clone the repository**

```bash
git clone https://github.com/andrepbo/fii-monitor.git
cd fii-monitor
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Configure environment variables**

Create a `.env` file in the root directory:

```
BRAPI_TOKEN=your_brapi_token
```

### **4. Run in development mode**

```bash
npm run start:dev
```

The server will be available at `http://localhost:3000`.

## **Running Tests**

- **Unit tests:**
  ```bash
  npm run test
  ```
- **End-to-end tests:**
  ```bash
  npm run test:e2e
  ```
- **Test coverage:**
  ```bash
  npm run test:cov
  ```

## **CI/CD**

This project includes continuous integration with **GitHub Actions**, running **lint, build, and test** on every `push` or `pull request`.

## **🏗 Architecture Overview**

![Architecture Overview](./docs/architecture-overview.png)

- **Frontend:** React / Next.js (web interface)
- **Backend:** NestJS (API + business logic)
- **Scheduler/Jobs:** BullMQ (automatic data updates)
- **External APIs:** Brapi (financial data)
- **Database:** PostgreSQL (storage for quotes and indicators)

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
