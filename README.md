# Job Board Application

A web application to list and search job offers, built with React, TypeScript and Vite.

## 🚀 Features

- 📱 Responsive design (mobile, tablet and desktop)
- 🔍 Job search and filtering
- 🌙 Dark mode
- ♾️ Infinite scroll
- 📝 Application form
- ✨ Modern UI with Ant Design
- 🧪 Unit testing with Vitest

## 🛠️ Tech Stack

- React 19
- TypeScript
- Vite
- Ant Design
- TailwindCSS
- React Query
- React Router
- Zustand
- Vitest

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm (included with Node.js)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/job-positions.git
cd job-positions
```

2. Install dependencies:
```bash
npm install
```

3. Enjoy

## 🚀 Usage

### Development
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Production
```bash
npm run build
npm run preview
```

### Testing
```bash
# Run tests
npm test

# View test coverage
npm run test:coverage
```

## 📁 Project Structure

```
src/
  ├── common/         # Shared components
  ├── hooks/          # Custom hooks
  ├── modules/        # Main features/modules
  │   ├── Jobs/       # Jobs module
  │   └── Navbar/     # Navigation bar
  ├── store/         # Global state (Zustand)
  └── test/          # Test setup
```

## 🧪 Testing

The project includes unit and integration tests using Vitest and React Testing Library:

- UI component tests
- Custom hooks tests
- API integration tests
- Test coverage

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
