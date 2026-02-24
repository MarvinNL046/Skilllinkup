export default function Loading() {
 return (
 <div className="min-h-[60vh] flex items-center justify-center">
 <div className="flex flex-col items-center gap-4">
 {/* Spinning loader */}
 <div className="relative">
 <div className="w-16 h-16 border-4 border-background-gray rounded-full"></div>
 <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
 </div>

 {/* Optional loading text */}
 <p className="text-text-secondary text-sm font-medium animate-pulse">
 Laden...
 </p>
 </div>
 </div>
 );
}
