'use client';

interface ReviewAvatarProps {
 userAvatar?: string | null;
 userName: string;
}

export function ReviewAvatar({ userAvatar, userName }: ReviewAvatarProps) {
 return (
 <>
 {userAvatar ? (
 <img
 src={userAvatar}
 alt={userName}
 className="w-12 h-12 rounded-full object-cover"
 onError={(e) =>{
 e.currentTarget.style.display = 'none';
 const initialsDiv = e.currentTarget.nextElementSibling;
 if (initialsDiv instanceof HTMLElement) {
 initialsDiv.style.display = 'flex';
 }
 }}
 />
 ) : null}
 <div className="w-12 h-12 rounded-full bg-primary/10 hidden items-center justify-center">
 <span className="text-primary font-heading font-bold text-lg">
 {userName.charAt(0).toUpperCase()}
 </span>
 </div>
 </>
 );
}
