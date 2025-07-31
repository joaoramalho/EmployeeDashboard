# Employee Dashboard - For S4

A full-stack employee management application built with Angular and .NET 9, featuring a modern web interface for viewing and managing employee data.

## Architecture

This project follows a clean architecture pattern with clear separation of concerns:

### Backend (.NET 9)
- **EmployeeDashboard.Api** - Web API layer with controllers
- **EmployeeDashboard.Services** - Business logic and service implementations
- **EmployeeDashboard.Data** - Data models, DTOs, and static data
- **EmployeeDashboard.Tests** - Unit tests for controllers and services

### Frontend (Angular 20)
- **Angular 20** - Modern Angular framework with standalone components
- **Angular Material** - UI component library
- **SCSS** - Styling with Sass preprocessor
- **TypeScript** - Type-safe JavaScript development

## Features

- Employee dashboard with user listings
- User profile management
- Favorites system
- Notes functionality for employees
- Error handling and retry mechanisms
- Responsive design with skeleton loading states
- Navigation between different views

## Prerequisites

- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) (for Angular client)
- [Angular CLI](https://angular.io/cli)

## Getting Started

### Backend Setup

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run --project EmployeeDashboard.Api
   ```

The API will be available at `https://localhost:5294` (or the port specified in launchSettings.json).

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The Angular application will be available at `http://localhost:4200`.

## Development

### Running Tests

**Backend Tests:**
```bash
cd api
dotnet test
```

**Frontend Tests:**
```bash
cd client
npm test
```

## Project Structure

```
EmployeeDashboard/
├── api/
│   ├── EmployeeDashboard.Api/          # Web API controllers and configuration
│   ├── EmployeeDashboard.Services/     # Business logic layer
│   ├── EmployeeDashboard.Data/         # Data models and DTOs
│   ├── EmployeeDashboard.Tests/        # Unit tests
│   └── EmployeeDashboard.sln           # Solution file
└── client/
    ├── src/
    │   ├── app/
    │   │   ├── dashboard/              # Dashboard component
    │   │   ├── favourites/             # Favourites management
    │   │   ├── user-profile/           # User profile view
    │   │   ├── user-notes-card/        # Notes functionality
    │   │   ├── services/               # Angular services
    │   │   └── model/                  # TypeScript models
    │   └── styles.scss                 # Global styles
    ├── package.json                    # NPM dependencies
    └── angular.json                    # Angular configuration
```

## API Endpoints

- `GET /api/employees` - Retrieve paginated employee list

## Technology Stack

### Backend
- .NET 9
- ASP.NET Core Web API
- Dependency Injection
- Unit Testing with xUnit/NUnit

### Frontend
- Angular 20
- Angular Material
- RxJS for reactive programming
- TypeScript
- SCSS for styling
- Jasmine & Karma for testing

## Performance
In a real world scenario (in production), loading 10,000 records in one sitting would be unwise.
Strategies like pagination and lazy loading would be a much better approach.
As an example, each page has a size, like 10 records, so we request those 10 records for that page. If we need to go the the next page, we request the next 10 records. This way we avoid overload the DB with such gigantic data.
Also, as a performance bonus, if we had a system intensive operation that would require heavy loading, we could introduce an event-driven system that could defer that load to a different process or schedule it at a later time. This way we maintain the performance of the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.