"use client";
import { Link } from "react-router-dom";
import { Palette, Users, Coins } from "lucide-react";
import AuthButtons from "../components/AuthButtons";
import { useActiveAccount } from "thirdweb/react";

const Home = () => {
  const account = useActiveAccount();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          Collaborative Pixel Art NFT Platform
        </h1>
        <p className="text-xl text-gray-400 mb-12">
          Create, collaborate, and earn with the community-driven pixel artgi
          platform
        </p>
        <div className="flex justify-center space-x-6">
          {!account?.address ? (
            <AuthButtons />
          ) : (
            <Link
              to="/canvas"
              className="px-8 py-3 bg-gray-700 rounded-lg font-semibold hover:bg-gray-600 transition"
            >
              View Canvas
            </Link>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20">
        <div className="feature-card">
          <Palette className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Create Together</h3>
          <p className="text-gray-400">
            Join forces with artists worldwide to create unique pixel art
            masterpieces
          </p>
        </div>
        <div className="feature-card">
          <Users className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Community Owned</h3>
          <p className="text-gray-400">
            Every contribution is recorded on-chain, ensuring fair ownership
            distribution
          </p>
        </div>
        <div className="feature-card">
          <Coins className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
          <p className="text-gray-400">
            Get rewarded for your contributions through NFT royalties and token
            rewards
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
