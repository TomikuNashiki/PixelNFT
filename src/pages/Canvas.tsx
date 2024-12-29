import React, { useEffect, useRef, useState } from 'react';
import { Timer, Users, Save } from 'lucide-react';
import ColorPalette from '../components/ColorPalette';
import PixelReplenish from '../components/PixelReplenish';

const GRID_SIZE = 32;
const PIXEL_SIZE = 20;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [remainingPixels, setRemainingPixels] = useState(40);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize grid
    ctx.fillStyle = '#1F2937';
    ctx.fillRect(0, 0, GRID_SIZE * PIXEL_SIZE, GRID_SIZE * PIXEL_SIZE);

    // Draw grid lines
    ctx.strokeStyle = '#374151';
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * PIXEL_SIZE, 0);
      ctx.lineTo(i * PIXEL_SIZE, GRID_SIZE * PIXEL_SIZE);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * PIXEL_SIZE);
      ctx.lineTo(GRID_SIZE * PIXEL_SIZE, i * PIXEL_SIZE);
      ctx.stroke();
    }
  }, []);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (remainingPixels <= 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / PIXEL_SIZE);
    const y = Math.floor((e.clientY - rect.top) / PIXEL_SIZE);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = selectedColor;
    ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);

    setRemainingPixels(prev => prev - 1);
  };

  const handlePixelsAdded = (amount: number) => {
    setRemainingPixels(prev => prev + amount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * PIXEL_SIZE}
              height={GRID_SIZE * PIXEL_SIZE}
              onClick={handleCanvasClick}
              className="border border-gray-700 rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:w-1/4 space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Color Palette</h3>
            <ColorPalette
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
            <div className="text-sm text-gray-400 mt-4">
              Remaining pixels: {remainingPixels}
            </div>
          </div>

          <PixelReplenish onPixelsAdded={handlePixelsAdded} />

          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <div className="flex items-center">
              <Timer className="h-5 w-5 text-purple-500 mr-2" />
              <span>Time remaining: 23:45:12</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-500 mr-2" />
              <span>Active contributors: 42</span>
            </div>
            <button className="w-full py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center">
              <Save className="h-4 w-4 mr-2" />
              Mint NFT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;

// src/pages/Canvas.tsx

// import  { useEffect, useState } from 'react';
// import { contractService } from '../services/contractService';
// import { Pixel, User } from '../utils/types';
// import { GRID_SIZE, PIXEL_SIZE } from '../utils/constants';

// const Canvas = () => {
//   const [pixels, setPixels] = useState<Pixel[]>([]);
//   const [selectedColor, setSelectedColor] = useState('#000000');
//   const [userData, setUserData] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const colors = [
//     '#000000', '#FF0000', '#00FF00', '#0000FF',
//     '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'
//   ];

//   useEffect(() => {
//     loadCanvasData();
//   }, []);

//   const loadCanvasData = async () => {
//     try {
//       setIsLoading(true);
//       const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const [pixels, userData] = await Promise.all([
//         contractService.getAllPixels(),
//         contractService.getUserData(account[0])
//       ]);
//       setPixels(pixels);
//       setUserData(userData);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePixelClick = async (x: number, y: number) => {
//     try {
//       if (!userData?.isRegistered) {
//         await contractService.register();
//       }
//       const colorInt = parseInt(selectedColor.slice(1), 16);
//       await contractService.updatePixel(x, y, colorInt);
//       await loadCanvasData();
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   const handleClaimReward = async () => {
//     try {
//       await contractService.claimAdReward();
//       await loadCanvasData();
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   if (isLoading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col items-center p-4 gap-4">
//       {error && (
//         <div className="bg-red-500 text-white p-4 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <div className="flex gap-2 mb-4">
//         {colors.map((color) => (
//           <button
//             key={color}
//             className={`w-8 h-8 rounded-full border-2 ${
//               selectedColor === color ? 'border-blue-500' : 'border-gray-300'
//             }`}
//             style={{ backgroundColor: color }}
//             onClick={() => setSelectedColor(color)}
//           />
//         ))}
//       </div>

//       <div className="relative bg-gray-800 p-2 rounded">
//         <div 
//           className="grid gap-px"
//           style={{
//             gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
//             width: GRID_SIZE * PIXEL_SIZE,
//             height: GRID_SIZE * PIXEL_SIZE
//           }}
//         >
//           {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
//             const x = i % GRID_SIZE;
//             const y = Math.floor(i / GRID_SIZE);
//             const pixel = pixels[i];
//             return (
//               <div
//                 key={i}
//                 className="cursor-pointer hover:opacity-75 transition-opacity"
//                 style={{ 
//                   width: PIXEL_SIZE,
//                   height: PIXEL_SIZE,
//                   backgroundColor: pixel?.color ? 
//                     `#${pixel.color.toString(16).padStart(6, '0')}` : 
//                     '#ffffff'
//                 }}
//                 onClick={() => handlePixelClick(x, y)}
//               />
//             );
//           })}
//         </div>
//       </div>

//       <div className="mt-4 text-center">
//         <p>Available Pixels: {userData?.availablePixels || 0}</p>
//         <button
//           className="mt-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
//           onClick={handleClaimReward}
//         >
//           Claim Ad Reward
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Canvas;