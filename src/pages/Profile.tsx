import React from 'react';
import { Wallet, Image as ImageIcon, Award } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="flex items-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-bold">CryptoArtist</h2>
            <div className="flex items-center mt-2 text-gray-400">
              <Wallet className="h-4 w-4 mr-2" />
              <span>0x1234...5678</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-purple-500" />
              My NFTs
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-700 rounded-lg p-2">
                  <div className="aspect-square bg-gray-600 rounded-lg mb-2"></div>
                  <p className="text-sm font-medium">Pixel Art #{i}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-purple-500" />
              Achievements
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="font-medium">First Contribution</p>
                <p className="text-sm text-gray-400">Placed your first pixel on the canvas</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="font-medium">Collaboration Master</p>
                <p className="text-sm text-gray-400">Participated in 5 completed artworks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;