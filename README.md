Listen React APP
Listen - React Music Streaming App
A modern, fully-featured React music streaming application template built with the latest web technologies.
📋 Template Information

Version: 1.0.0
Created: March 8, 2025
Last Update: April 5, 2025
Author: Kri8thm
License: ThemeForest Regular License

✨ Features

React + Vite.js with TypeScript
Bootstrap latest version
SASS/SCSS support
CSS3 Animations
10 Color Skin Options for Header, Sidebar & Player
Light & Dark Mode support
Internationalization (i18n) support
RTL Support for right-to-left languages
Analytical Dashboard
Working Audio Player with browser media API
Fully Responsive design
SEO Optimized
Cross-browser Compatible
Mobile-first CSS
Form Validation
Google Fonts Integration

📋 Requirements
Before getting started, ensure you have:

Node.js (Recommended: Node 20 latest version) - Download here
Code Editor (VS Code, Sublime Text, or similar)
Web Browser (Chrome, Firefox, etc.)
FTP Client (FileZilla or similar) for deployment

🚀 Quick Start
1. Installation
Clone or extract the template files to your desired directory.
2. Navigate to Project Directory
Open your terminal and navigate to the project root:
bashcd your-project-directory
3. Install Dependencies
Install all required packages:
bashnpm install
4. Start Development Server
Launch the development server:
bashnpm run dev
The application will be available at http://localhost:5173 by default.
📁 Project Structure
├── src/
│   ├── view/
│   │   ├── pages/          # Route components
│   │   ├── forms/          # Form components
│   │   └── layouts/        # Layout components
│   ├── core/
│   │   ├── hooks/          # Custom React hooks
│   │   ├── constants/      # App constants
│   │   ├── utils/          # Utility functions
│   │   └── components/     # Core components
│   ├── components/         # Reusable UI components
│   ├── assets/            # Static assets
│   ├── styles/            # SCSS files
│   └── locale/            # i18n language files
🎨 Customization
Changing Colors & Themes
Navigate to src/styles/_variables.scss to modify Bootstrap variables and custom theme colors.
Menu/Navigation Changes
Edit the navigation structure in the component located at the path shown in the template structure.
Language Support (i18n)

Language files are in the locale/ directory
To add a new language, create a new JSON file named after the language
Update the default language in the configuration file
Reference: React i18next Documentation

Dark Mode
Toggle dark mode by modifying the theme setting in the constants file or through the settings component.
RTL Support
Enable right-to-left text direction by updating the RTL flag in the settings.
Component Skins
Customize Header, Sidebar, and Player appearances through the settings component with 10 available color options.
🚀 Deployment
Vercel Deployment

Create a Vercel Account at vercel.com
Connect your Git repository
Import your project
Deploy - Vercel will automatically detect it's a React/Vite project

For detailed deployment steps, refer to the Vercel documentation.
⚠️ Important Notes

Data Source: The template uses Mock JSON files for demo data - no backend connection included
Customization Warning: Exercise caution when modifying files. Incorrect editing could break the layout
Support: Basic HTML, CSS, and JavaScript knowledge is recommended for customization

🔧 Available Scripts
bash# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
📚 Technologies Used

Frontend: React, TypeScript, Vite.js
Styling: Bootstrap, SASS/SCSS
Audio: Amplitude.js, Browser Media API
Charts: Chart.js
Icons: Remix Icons
UI Components: Swiper.js, React Dropzone
Utilities: Moment.js, Notistack

🆘 Support
Need help? Contact the author:

Email: kri8thm@gmail.com
WhatsApp: Support Channel
Telegram: Support Group

📄 License
This template is licensed under the ThemeForest Regular License.
🔄 Changelog
v1.1.0

Fixed volume change issue

v1.0.0

Initial release
