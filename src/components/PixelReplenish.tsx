import React, { useState } from 'react';
import { Play, Gift } from 'lucide-react';

interface PixelReplenishProps {
  onPixelsAdded: (amount: number) => void;
}

const PixelReplenish: React.FC<PixelReplenishProps> = ({ onPixelsAdded }) => {
  const [isWatching, setIsWatching] = useState(false);

  const watchAd = () => {
    setIsWatching(true);
    // Simulate ad watching
    setTimeout(() => {
      setIsWatching(false);
      onPixelsAdded(5); // Add 5 pixels after watching
    }, 3000);
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h4 className="text-lg font-semibold mb-2 flex items-center">
        <Gift className="h-5 w-5 mr-2 text-purple-500" />
        Get More Pixels
      </h4>
      <p className="text-sm text-gray-400 mb-4">
        Watch a short ad to get 5 more pixels!
      </p>
      <button
        onClick={watchAd}
        disabled={isWatching}
        className="w-full py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center"
      >
        <Play className="h-4 w-4 mr-2" />
        {isWatching ? 'Watching...' : 'Watch Ad'}
      </button>
    </div>
  );
};

export default PixelReplenish;