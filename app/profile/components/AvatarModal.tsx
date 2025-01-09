import Image from 'next/image';

interface Avatar {
  id: number;
  src: string;
  alt: string;
}

interface AvatarModalProps {
  avatars: Avatar[];
  selectedAvatar: Avatar;
  onSelect: (avatar: Avatar) => void;
  onClose: () => void;
}

export default function AvatarModal({ avatars, selectedAvatar, onSelect, onClose }: AvatarModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">选择头像</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => onSelect(avatar)}
              className={`relative aspect-square rounded-xl cursor-pointer overflow-hidden border-2 transition-all ${
                selectedAvatar.id === avatar.id ? 'border-[#4285F4]' : 'border-transparent hover:border-gray-200'
              }`}
            >
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 