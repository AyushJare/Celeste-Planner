# Celeste Planner

A full-stack event management application for planning and managing 
events with guest management, timeline tracking and task checklists.

## Tech Stack
**Frontend:** Next.js, React, TypeScript, Tailwind CSS, Shadcn UI  
**Backend/Database:** Firebase (Auth + Firestore)  
**Tools:** Git, VS Code  

## Features
- User authentication via Firebase Auth
- Event creation and management
- Guest list management
- Timeline tracking
- Task checklists
- Responsive design across all devices
- Modular UI components for scalable architecture

## Project Structure
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   ├── event-form.tsx    # Event creation form
│   ├── guest-list-tab.tsx # Guest management
│   ├── timeline-tab.tsx  # Timeline tracking
│   └── checklist-tab.tsx # Task checklists
├── lib/
│   ├── firebase.ts       # Firebase configuration
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── .env.example          # Environment variable template
└── README.md

## Getting Started

### Prerequisites
- Node.js installed
- Firebase project set up

### Installation
```bash
# Clone the repo
git clone https://github.com/AyushJare/celeste-planner

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Fill in your Firebase credentials in .env.local

# Run development server
npm run dev
```

## Environment Variables
Create a `.env.local` file using `.env.example` as template.
Get your Firebase credentials from the Firebase Console.

## Author
Ayush Jare — [GitHub](https://github.com/AyushJare) | 
[LinkedIn](https://linkedin.com/in/ayushjare)
