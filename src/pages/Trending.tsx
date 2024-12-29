import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import NFTCard from '../components/nft/NFTCard';
import { getRandomPlaceholderImage } from '../utils/imageUtils';

interface NFT {
  id: number;
  title: string;
  contributors: number;
  price: string;
  image: string;
  timestamp: Date;
}

const Trending = () => {
  const [trendingNFTs] = useState<NFT[]>([
    {
      id: 1,
      title: "Pixel Paradise",
      contributors: 156,
      price: "0.5 ETH",
      image: getRandomPlaceholderImage(),
      timestamp: new Date()
    },
    {
      id: 2,
      title: "Crypto Landscape",
      contributors: 89,
      price: "0.3 ETH",
      image: getRandomPlaceholderImage(),
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);

  const [filter, setFilter] = useState<'trending' | 'recent'>('trending');

  const sortedNFTs = [...trendingNFTs].sort((a, b) => {
    if (filter === 'recent') {
      return b.timestamp.getTime() - a.timestamp.getTime();
    }
    return b.contributors - a.contributors;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <TrendingUp className="h-8 w-8 text-purple-500 mr-3" />
          <h2 className="text-3xl font-bold">NFT Gallery</h2>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('trending')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'trending'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setFilter('recent')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === 'recent'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Recent
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedNFTs.map((nft) => (
          <NFTCard key={nft.id} {...nft} />
        ))}
      </div>
    </div>
  );
};

export default Trending;