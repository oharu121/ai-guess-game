# AI Pictionary Game

A fun web application where you draw on a canvas and Google's Gemini AI tries to guess what you've drawn!

## Features

- **Interactive Canvas**: Draw with mouse or touch
- **AI-Powered Guessing**: Uses Google Gemini AI for image recognition
- **Real-time Feedback**: Get instant guesses from the AI
- **Game Statistics**: Track your drawing session
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API (direct REST calls)
- **Canvas**: HTML5 Canvas with custom drawing utilities

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your Gemini API key
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 3. Get a Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key and paste it in your `.env.local` file

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## How to Play

1. **Start**: Click "Start Playing" on the home page
2. **Draw**: Use your mouse or finger to draw on the white canvas
3. **Guess**: Click "Get AI Guess" to see what the AI thinks you drew
4. **Continue**: Clear the canvas and draw something new!

## Project Structure

```
src/
├── app/
│   ├── api/guess/          # AI guessing API endpoint
│   ├── game/               # Main game page
│   └── page.tsx           # Home page
├── components/
│   ├── Canvas.tsx         # Drawing canvas component
│   ├── GuessDisplay.tsx   # AI guess results display
│   ├── GameControls.tsx   # Game control buttons
│   └── GameStats.tsx      # Game statistics
├── hooks/
│   └── useCanvas.ts       # Canvas state management hook
└── lib/
    ├── canvas-utils.ts    # Canvas utility functions
    ├── gemini-client.ts   # Gemini API client
    └── types.ts           # TypeScript type definitions
```

## API Usage

The app uses Google's Gemini API directly without SDKs:

```typescript
// Example API call structure
const response = await fetch('/api/guess', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    imageData: canvas.toDataURL('image/png') 
  })
});
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Features

- **Canvas Drawing**: Smooth drawing with mouse and touch support
- **Image Processing**: Automatic canvas resizing and optimization
- **Error Handling**: Comprehensive error handling for API calls
- **Loading States**: Visual feedback during AI processing
- **Session Tracking**: Game statistics and history

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | ✅ |

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Credits

- **AI**: Google Gemini API
- **Framework**: Next.js
- **Styling**: Tailwind CSS
