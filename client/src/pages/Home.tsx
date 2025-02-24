import { Rocket } from 'lucide-react';

export function Home() {
  return (
    <div className="dots min-h-[calc(100vh-45px)] w-full">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden col-span-2">
          <img
            src="/ulap.webp"
            alt="Image 1"
            width={300}
            height={300}
            className="w-full h-full object-cover aspect-[1.85/1]"
          />
        </div>
        <div className="bg-rose-300 rounded-lg border overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <Rocket size={50} className="text-red-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex flex-col items-center justify-center h-full aspect-[3/2]">
            <span className="text-2xl font-bold line-through">$199</span>
            <span className="text-2xl font-bold">Free</span>
          </div>
        </div>
        <div className="bg-blue-400 text-white rounded-lg border overflow-hidden col-span-2">
          <div className="flex flex-col items-center justify-center h-full aspect-[1.85/1] text-center">
            <p className="text-2xl font-bold p-4">
              A Dropbox / Google Drive lite for your personal use!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
