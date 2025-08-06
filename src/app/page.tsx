import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-800">
            AI Pictionary
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Draw anything and let artificial intelligence guess what you&apos;ve created!
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              🎨 Draw on canvas
            </span>
            <span className="flex items-center">
              🤖 AI guesses
            </span>
            <span className="flex items-center">
              🎯 See results
            </span>
          </div>
          
          <Link
            href="/game"
            className="inline-block px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
          >
            Start Playing
          </Link>
        </div>

        <div className="text-xs text-gray-400 space-y-1">
          <p>Powered by Google Gemini AI</p>
          <p>Built with Next.js & TypeScript</p>
        </div>
      </div>
    </div>
  );
}
