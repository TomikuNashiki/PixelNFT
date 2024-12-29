import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import { useActiveAccount } from "thirdweb/react";
import { Palette, TrendingUp, UserCircle } from "lucide-react";

const Navbar = () => {
  const account = useActiveAccount();
  
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-purple-500" />
              <span className="text-xl font-bold">PixelNFT</span>
            </Link>
          </div>
          {account?.address && (
            <>
              <div className="flex items-center space-x-4">
                <Link to="/canvas" className="nav-link">
                  Canvas
                </Link>
                <Link to="/trending" className="nav-link flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Trending
                </Link>
                <Link to="/profile" className="nav-link flex items-center">
                  <UserCircle className="h-4 w-4 mr-1" />
                  Profile
                </Link>
                <AuthButtons />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
