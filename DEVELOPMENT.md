# Development Guide for Auto-Hired

This guide provides comprehensive instructions for setting up your development environment, understanding the project structure, and contributing to the Auto-Hired project.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [Project Structure](#project-structure)
4. [Development Scripts](#development-scripts)
5. [Code Standards](#code-standards)
6. [Database Development](#database-development)
7. [Testing Payment Flow](#testing-payment-flow)
8. [Git Workflow](#git-workflow)
9. [Debugging Tips](#debugging-tips)

---

## Prerequisites

Before you begin development, ensure you have the following installed:

### Required Software
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (or yarn v1.22+)
- **Git**: v2.25+
- **Database**: PostgreSQL 12+ or MongoDB 4.4+
- **Code Editor**: VS Code, WebStorm, or similar

### Recommended Tools
- **Git GUI**: GitHub Desktop, GitKraken, or Sourcetree
- **API Testing**: Postman or Insomnia
- **Database Client**: pgAdmin, MongoDB Compass, or DBeaver
- **Terminal**: iTerm2 (macOS), Windows Terminal (Windows), or Zsh (Linux)

### System Requirements
- **OS**: macOS 10.15+, Windows 10+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 8GB (16GB recommended)
- **Disk Space**: At least 5GB free

### Environment Variables
Create a `.env.local` file in the project root with the following variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/auto_hired_dev
MONGODB_URL=mongodb://localhost:27017/auto-hired

# API Keys
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx

# Authentication
JWT_SECRET=your-jwt-secret-key
SESSION_SECRET=your-session-secret

# Email
SENDGRID_API_KEY=your-sendgrid-api-key
MAIL_FROM=noreply@auto-hired.com

# AWS (if applicable)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1

# Application
NODE_ENV=development
PORT=3000
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001

# Logging
LOG_LEVEL=debug
```

---

## Local Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/SolutionsRMe/auto-hired.git
cd auto-hired
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Set Up Environment Variables

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Step 4: Set Up the Database

```bash
# For PostgreSQL
npm run db:migrate
npm run db:seed

# For MongoDB
npm run db:init:mongo
```

### Step 5: Install Pre-commit Hooks

```bash
npx husky install
```

### Step 6: Start Development Server

```bash
# Terminal 1: Start the backend server
npm run dev

# Terminal 2: Start the frontend (if separate)
npm run dev:frontend

# Or run both concurrently
npm run dev:all
```

The application should be available at:
- Backend API: `http://localhost:3000`
- Frontend: `http://localhost:3001`

### Troubleshooting Setup

| Issue | Solution |
|-------|----------|
| Port already in use | Change PORT in `.env.local` or use `lsof -i :3000` to find and kill the process |
| Database connection failed | Verify DATABASE_URL and ensure PostgreSQL/MongoDB is running |
| Node version mismatch | Use `nvm use` to switch to the correct Node version (check `.nvmrc`) |
| Permission denied on hooks | Run `chmod +x .husky/*` |

---

## Project Structure

```
auto-hired/
├── src/
│   ├── api/                    # API routes and controllers
│   │   ├── auth/              # Authentication endpoints
│   │   ├── jobs/              # Job management endpoints
│   │   ├── users/             # User management endpoints
│   │   └── payments/          # Payment processing endpoints
│   ├── models/                # Database models and schemas
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Application.js
│   │   └── Payment.js
│   ├── middleware/            # Express middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── services/              # Business logic services
│   │   ├── authService.js
│   │   ├── jobService.js
│   │   ├── paymentService.js
│   │   └── emailService.js
│   ├── utils/                 # Utility functions
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── config/                # Configuration files
│   │   ├── database.js
│   │   ├── stripe.js
│   │   └── email.js
│   └── app.js                 # Main application entry point
├── tests/                     # Test files (mirrors src structure)
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── migrations/                # Database migrations
├── seeders/                   # Database seed files
├── .env.example               # Environment variables template
├── .eslintrc.js              # ESLint configuration
├── .prettierrc.json          # Prettier configuration
├── jest.config.js            # Jest testing configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

---

## Development Scripts

### Running the Application

```bash
# Start development server with hot reload
npm run dev

# Start production build
npm run build
npm start

# Start with specific environment
NODE_ENV=development npm run dev
```

### Database Operations

```bash
# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:migrate:rollback

# Create a new migration
npm run db:migrate:create --name=add_user_fields

# Seed the database
npm run db:seed

# Reset database (warning: destructive)
npm run db:reset
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/services/authService.test.js

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check formatting
npm run format:check

# Run type checking (if TypeScript)
npm run type-check
```

### Documentation

```bash
# Generate API documentation
npm run docs:api

# Generate code documentation
npm run docs:code
```

---

## Code Standards

### Naming Conventions

**Variables and Functions**
```javascript
// camelCase for variables and functions
const userName = 'John Doe';
const calculateTotalPrice = (items) => { };

// PascalCase for classes and components
class UserService { }
function UserCard() { }

// UPPER_CASE for constants
const MAX_RETRIES = 3;
const API_TIMEOUT = 5000;
```

**File Names**
```
// Service files: camelCase
userService.js
paymentService.js

// Model files: PascalCase
User.js
Job.js

// Route files: lowercase with dash
user-routes.js
job-routes.js
```

### Code Style Guidelines

1. **Indentation**: Use 2 spaces (configured in `.prettierrc`)
2. **Line Length**: Maximum 100 characters
3. **Quotes**: Single quotes for strings (unless interpolation)
4. **Semicolons**: Always required
5. **Comments**: Use meaningful comments for complex logic

```javascript
// ✓ Good
const user = getUserById(id);
const isActive = user.status === 'active';

if (isActive) {
  // Perform active user operations
  processUserRequest(user);
}

// ✗ Bad
const u = getUserById(id);
const active = u.status === 'active';
if(active) processUserRequest(u);
```

### Error Handling

```javascript
// Use consistent error handling pattern
try {
  const result = await processPayment(data);
  return result;
} catch (error) {
  logger.error('Payment processing failed:', error);
  throw new AppError('Payment processing failed', 500);
}
```

### Async/Await Standards

```javascript
// ✓ Prefer async/await over .then()
async function fetchUserData(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw error;
  }
}

// Use await for dependent operations
const user = await getUser(id);
const profile = await getProfile(user.profileId);
```

### Documentation Standards

```javascript
/**
 * Calculates the total price for a job application
 * @param {number} basePrice - The base price of the job
 * @param {number} taxRate - The tax rate as a decimal (0.1 = 10%)
 * @returns {number} The total price including tax
 * @throws {Error} If basePrice is negative
 */
function calculateTotal(basePrice, taxRate) {
  if (basePrice < 0) {
    throw new Error('Base price cannot be negative');
  }
  return basePrice * (1 + taxRate);
}
```

---

## Database Development

### Database Setup

#### PostgreSQL Setup

```bash
# Create development database
createdb auto_hired_dev

# Create test database
createdb auto_hired_test

# Connect to database
psql auto_hired_dev
```

#### MongoDB Setup

```bash
# Start MongoDB service
brew services start mongodb-community  # macOS
mongod  # Manual start

# Create database and collections
mongo auto_hired_dev
```

### Writing Migrations

```javascript
// migrations/20260102_create_users_table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
```

### Database Seeding

```javascript
// seeders/userSeeder.js
module.exports = {
  seed: async (User) => {
    const users = [
      {
        email: 'employer@example.com',
        name: 'John Employer',
        role: 'employer',
      },
      {
        email: 'worker@example.com',
        name: 'Jane Worker',
        role: 'worker',
      },
    ];

    return User.bulkCreate(users);
  },
};
```

### Common Database Queries

```javascript
// Find operations
const user = await User.findById(userId);
const users = await User.find({ status: 'active' });

// Create operations
const newUser = await User.create({ email: 'test@example.com' });

// Update operations
await User.update({ status: 'inactive' }, { where: { id: userId } });

// Delete operations
await User.destroy({ where: { id: userId } });

// Transactions
const transaction = await sequelize.transaction();
try {
  await User.create(data, { transaction });
  await transaction.commit();
} catch (error) {
  await transaction.rollback();
  throw error;
}
```

### Database Optimization Tips

- Always index frequently queried fields
- Use pagination for large result sets
- Implement soft deletes for audit trails
- Monitor slow queries with logging
- Use database connection pooling

---

## Testing Payment Flow

### Setting Up Stripe Test Environment

1. **Get Test Credentials**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Switch to "Test mode"
   - Copy test keys to `.env.local`

2. **Test Card Numbers**

| Card Type | Number | CVC | Expiry |
|-----------|--------|-----|--------|
| Visa (Success) | 4242 4242 4242 4242 | Any 3 digits | Future date |
| Visa (Decline) | 4000 0000 0000 0002 | Any 3 digits | Future date |
| Amex (Success) | 3782 822463 10005 | Any 4 digits | Future date |
| Mastercard | 5555 5555 5555 4444 | Any 3 digits | Future date |

### Testing Payment Integration

```javascript
// tests/integration/payment.test.js
describe('Payment Processing', () => {
  test('should process successful payment', async () => {
    const paymentData = {
      amount: 10000, // $100.00 in cents
      currency: 'usd',
      stripeToken: 'tok_visa', // Stripe test token
      jobId: 1,
    };

    const result = await paymentService.processPayment(paymentData);

    expect(result).toHaveProperty('id');
    expect(result.status).toBe('succeeded');
  });

  test('should handle declined card', async () => {
    const paymentData = {
      amount: 10000,
      currency: 'usd',
      stripeToken: 'tok_visa_chargeDeclinedInsufficientFunds',
      jobId: 1,
    };

    await expect(
      paymentService.processPayment(paymentData)
    ).rejects.toThrow('Card declined');
  });

  test('should create refund', async () => {
    const chargeId = 'ch_test_charge';
    const refund = await paymentService.createRefund(chargeId);

    expect(refund.status).toBe('succeeded');
  });
});
```

### Manual Payment Testing Workflow

```bash
# 1. Start development server
npm run dev

# 2. Open payment form in browser
# http://localhost:3001/jobs/1/apply

# 3. Use test card: 4242 4242 4242 4242

# 4. Check Stripe Dashboard
# https://dashboard.stripe.com/test/payments

# 5. Verify database records
npm run db:query "SELECT * FROM payments WHERE status='succeeded';"
```

### Webhook Testing

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhook events to local server
stripe listen --forward-to localhost:3000/webhooks/stripe

# Trigger test events
stripe trigger payment_intent.succeeded
```

---

## Git Workflow

### Branch Naming Convention

```
feature/user-authentication
fix/payment-bug
docs/api-documentation
refactor/database-optimization
test/unit-tests-for-jobs
chore/dependency-update
```

### Creating a Feature Branch

```bash
# Ensure you're on main and up to date
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/user-authentication

# Work on your feature
# ... make changes ...

# Commit changes
git add .
git commit -m "feat: add user authentication system"
```

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:
```
feat(auth): add JWT token refresh mechanism
fix(payments): resolve Stripe webhook timeout issue
docs(api): update endpoint documentation
refactor(user-service): simplify user validation logic
test(jobs): add unit tests for job filtering
```

### Creating a Pull Request

```bash
# Push your branch
git push origin feature/user-authentication

# Create PR via GitHub CLI
gh pr create --title "Add user authentication" \
  --body "This PR implements JWT-based authentication"

# Or create via GitHub web interface
```

### PR Review Checklist

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Commit messages are clear
- [ ] No console.logs or debug code

### Merging and Cleanup

```bash
# After PR approval, merge
gh pr merge --squash  # Recommended for feature branches
# or
gh pr merge --rebase

# Delete branch
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

---

## Debugging Tips

### Using Console Logging

```javascript
// Structured logging
console.log('[PaymentService]', 'Processing payment for order:', orderId);

// Use different methods
console.info('Information message');
console.warn('Warning message');
console.error('Error message');

// Log objects nicely
console.table(data);
console.dir(object, { depth: null });
```

### Using the Debugger

#### VS Code Debugging

1. Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/app.js",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

2. Set breakpoints and press F5 to start debugging

#### Chrome DevTools for Node

```bash
node --inspect src/app.js
# Then open chrome://inspect in Chrome
```

### Environment-Specific Debugging

```javascript
// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('DEBUG:', variableName);
}

// Using a logger library
const logger = require('./config/logger');
logger.debug('Payment processing started', { orderId, amount });
```

### Common Debugging Scenarios

#### 1. Database Connection Issues

```javascript
// Test database connection
const sequelize = require('./config/database');
sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB error:', err));
```

#### 2. API Request Issues

```javascript
// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`, req.body);
  next();
});

// Log outgoing responses
app.use((err, req, res, next) => {
  console.error('Response Error:', err.message);
  res.status(err.status || 500).json({ error: err.message });
});
```

#### 3. Async/Await Issues

```javascript
// Use Promise.allSettled to debug multiple promises
const results = await Promise.allSettled([
  fetchUser(),
  fetchProfile(),
  fetchSettings()
]);

results.forEach((result, index) => {
  if (result.status === 'rejected') {
    console.error(`Promise ${index} failed:`, result.reason);
  }
});
```

#### 4. Memory Leaks

```bash
# Monitor memory usage
node --expose-gc src/app.js

# Then in your code
if (global.gc) {
  global.gc();
  console.log('Memory usage:', process.memoryUsage());
}
```

### Useful Debugging Tools

- **Node Inspector**: `node --inspect`
- **Morgan Middleware**: HTTP request logging
- **Winston Logger**: Comprehensive logging
- **Debug Module**: Conditional logging with namespaces
- **Clinic.js**: Performance profiling

### Getting Help

If you encounter issues:

1. **Check existing issues**: Search GitHub Issues
2. **Review logs**: Check application and database logs
3. **Run tests**: `npm test` to verify environment
4. **Ask in discussions**: Use GitHub Discussions or Slack
5. **Check documentation**: Review docs and README files

---

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [Stripe API Docs](https://stripe.com/docs/api)
- [Git Documentation](https://git-scm.com/doc)
- [Jest Testing](https://jestjs.io/)
- [ESLint Rules](https://eslint.org/docs/rules/)

---

## Support and Questions

For questions or issues:
- 📧 Email: developers@auto-hired.com
- 💬 Slack: #development channel
- 🐙 GitHub: Use Issues and Discussions
- 📖 Wiki: Check the project wiki for FAQs

---

**Last Updated**: 2026-01-02  
**Version**: 1.0.0
