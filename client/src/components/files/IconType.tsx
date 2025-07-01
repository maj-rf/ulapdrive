import { Image, ImagePlay, FileText, FileIcon, Package } from 'lucide-react';

export const IconType = ({ fileType }: { fileType: string }) => {
  if (['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(fileType)) {
    return <Image className="text-green-500" />;
  } else if (fileType === 'image/gif') {
    return <ImagePlay className="text-purple-500" />;
  } else if (fileType === 'text/plain') {
    return <FileText className="text-blue-500" />;
  } else if (fileType === 'application/pdf' || fileType === 'application/msword') {
    return <FileIcon className="text-yellow-500" />;
  } else if (fileType === 'application/zip') {
    return <Package className="text-pink-400" />;
  }
  return null;
};
