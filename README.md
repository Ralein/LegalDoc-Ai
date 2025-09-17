# LegalDoc AI - Professional Legal Document Assistant

A comprehensive AI-powered legal document creation and editing platform designed for legal professionals, law enforcement, and government agencies.

## Features

### 🤖 AI-Powered Document Generation
- Intelligent document templates for various legal scenarios
- AI-assisted content generation and suggestions
- Real-time document validation and completeness checking
- Multi-language support (English, Tamil, Hindi)

### 📄 Document Management
- Create, edit, and manage legal documents
- Template library with customizable forms
- Document version control and history
- Export documents in multiple formats (PDF, Word, etc.)

### 🎨 Modern Interface
- Clean, professional dashboard design
- Dark/Light theme support with system preference detection
- Responsive design for desktop and mobile devices
- Intuitive navigation and user experience

### 🔐 Security & Privacy
- Secure document storage and encryption
- Two-factor authentication support
- Session management and timeout controls
- Role-based access control

### 🌐 Multi-Language Support
- English and Tamil language interfaces
- Localized content and templates
- Easy language switching

## Technology Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Theme**: next-themes for dark/light mode
- **Typography**: Geist Sans and Geist Mono fonts
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd legaldoc-ai
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── documents/         # Document management
│   ├── settings/          # User settings
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard-header.tsx
│   ├── sidebar.tsx
│   └── theme-provider.tsx
├── lib/                   # Utility functions
│   ├── language-context.tsx
│   └── utils.ts
└── public/               # Static assets
\`\`\`

## Key Features

### Dashboard
- Overview of recent documents and activities
- Quick access to document templates
- Statistics and analytics

### Document Editor
- Rich text editing with AI assistance
- Template-based document creation
- Real-time validation and suggestions
- Multi-format export capabilities

### Settings
- Profile management
- Theme and language preferences
- Security settings
- Data export/import

## Theme System

The application supports three theme modes:
- **Light**: Clean, professional light theme
- **Dark**: Modern dark theme for reduced eye strain
- **System**: Automatically matches your system preference

Theme switching is available in:
- Dashboard header (quick toggle)
- Settings page (detailed preferences)

## Language Support

Currently supported languages:
- English (default)
- தமிழ் (Tamil)

Language can be changed via:
- Dashboard header dropdown
- Settings page preferences

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.
# LegalDoc-Ai
