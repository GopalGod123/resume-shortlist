# AI Resume Shortlister

A beautiful, modern web application that uses Google's Gemini AI to analyze and shortlist resumes based on job descriptions. Built with React, TypeScript, and Vite.

## ✨ Features

- **AI-Powered Analysis**: Uses Google Gemini AI to intelligently match resumes to job descriptions
- **Batch Processing**: Upload and analyze multiple resumes at once
- **Modern UI**: Beautiful, responsive design with glassmorphism effects and smooth animations
- **Smart Scoring**: Get detailed match scores with skill analysis
- **PDF Support**: Extract text from PDF resumes automatically
- **Real-time Results**: See instant analysis and rankings

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-shortlister
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
   
   Open the `.env` file and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

### 🔑 Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Paste it into your `.env` file

### 🏃‍♂️ Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🎯 How to Use

1. **Enter Job Description**: Paste the job description in the left panel
2. **Upload Resumes**: Drag and drop PDF resumes or click to browse
3. **Analyze**: Click "Shortlist Resumes" to start the AI analysis
4. **Review Results**: See candidates ranked by match score with detailed insights

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite
- **AI**: Google Gemini API
- **PDF Processing**: PDF.js
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
ai-resume-shortlister/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── MobileHeader.tsx
│   │   └── Sidebar.tsx
│   ├── ui/
│   │   ├── Alert.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Dialog.tsx
│   │   ├── Progress.tsx
│   │   └── Textarea.tsx
│   ├── Header.tsx
│   ├── JobDescriptionInput.tsx
│   ├── ResumeCard.tsx
│   ├── Spinner.tsx
│   └── UploadBox.tsx
├── services/
│   ├── geminiService.ts
│   └── pdfParser.ts
├── App.tsx
├── index.tsx
├── types.ts
└── vite.config.ts
```

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like effects with backdrop blur
- **Gradient Themes**: Purple-to-blue gradient color scheme
- **Smooth Animations**: Floating elements and smooth transitions
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern Typography**: Inter and Poppins fonts for clean readability

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Google Gemini API key | Yes |

### Gemini AI Settings

The application uses the `gemini-2.5-flash` model for fast and accurate resume analysis. You can modify the model settings in `services/geminiService.ts`.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

- **API Key Error**: Make sure your `VITE_GEMINI_API_KEY` is set correctly in the `.env` file
- **PDF Processing**: Ensure PDFs contain searchable text (not just images)
- **CORS Issues**: The application runs on localhost:3000 by default

### Support

If you encounter any issues, please check the console for error messages and ensure your API key is valid.

---

Built with ❤️ using Google Gemini AI
