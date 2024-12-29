import React from 'react';
import { Users, DollarSign, Clock } from 'lucide-react';
import { validateImageUrl } from '../../utils/imageUtils';
import { getRandomPlaceholderImage } from '../../utils/imageUtils';

interface NFTCardProps {
  id: number;
  title: string;
  contributors: number;
  price: string;
  image: string;
  timestamp: Date;
}

const NFTCard: React.FC<NFTCardProps> = ({
  title,
  contributors,
  price,
  image,
  timestamp
}) => {
  const imageUrl = validateImageUrl(image) ? image : getRandomPlaceholderImage();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="space-y-2 text-gray-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>{contributors} contributors</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>{price}</span>
            </div>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>{new Date(timestamp).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;