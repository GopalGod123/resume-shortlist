# AI Resume Shortlister - Professional Project Structure

This document outlines the professional folder structure for the AI Resume Shortlister application.

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Alert.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Dialog.tsx
│   │   ├── Progress.tsx
│   │   └── Textarea.tsx
│   ├── layout/                # Layout components
│   │   ├── Layout.tsx
│   │   ├── MobileHeader.tsx
│   │   └── Sidebar.tsx
│   ├── features/              # Feature-specific components
│   │   └── ResumeAnalysis/
│   │       ├── index.ts
│   │       ├── ResumeCard.tsx
│   │       ├── ResumeUpload.tsx
│   │       ├── JobDescriptionInput.tsx
│   │       ├── AnalysisResults.tsx
│   │       └── LoadingSpinner.tsx
│   └── common/                # Common components
├── pages/                     # Page components
│   └── HomePage.tsx
├── services/                  # API services
│   ├── geminiService.ts
│   └── pdfParser.ts
├── hooks/                     # Custom hooks
├── utils/                     # Utility functions
│   └── index.ts
├── types/                     # TypeScript types
│   └── index.ts
├── constants/                 # Constants
│   └── index.ts
├── config/                    # Configuration
│   └── index.ts
├── assets/                    # Static assets
├── styles/                    # Global styles
├── lib/                       # Third-party lib configurations
├── App.tsx                    # Main App component
└── index.tsx                  # Entry point
```

## Key Principles

### 1. **Feature-Based Organization**
- Components are organized by feature (e.g., ResumeAnalysis)
- Each feature has its own folder with an index.ts for exports
- Related components are grouped together

### 2. **Separation of Concerns**
- **UI Components**: Reusable, presentational components
- **Layout Components**: Application layout and navigation
- **Feature Components**: Business logic and feature-specific UI
- **Pages**: Top-level page components
- **Services**: API calls and external integrations
- **Utils**: Pure utility functions
- **Types**: TypeScript type definitions

### 3. **Clean Import Structure**
- Use absolute imports with path aliases
- Feature components export through index.ts
- Clear separation between internal and external dependencies

### 4. **Scalability**
- Easy to add new features
- Components are modular and reusable
- Clear boundaries between different parts of the application

## Import Examples

```typescript
// Feature components
import { ResumeCard, ResumeUpload } from '@/components/features/ResumeAnalysis';

// UI components
import { Card, Button } from '@/components/ui';

// Utils and types
import { formatFileSize } from '@/utils';
import type { ResumeAnalysisResult } from '@/types';

// Configuration
import { API_CONFIG } from '@/config';
```

## Best Practices

1. **Component Naming**: Use PascalCase for components
2. **File Organization**: Group related files together
3. **Index Files**: Use index.ts for clean exports
4. **Type Safety**: Define interfaces in types directory
5. **Constants**: Keep magic numbers and strings in constants
6. **Error Handling**: Centralized error handling in services
7. **Documentation**: Document complex components and utilities

## Environment Setup

The project uses:
- React 19 with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Google Gemini API for AI analysis
- PDF.js for document processing

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check
```

This structure follows modern React and TypeScript best practices, making the codebase maintainable, scalable, and easy to understand for new developers. 