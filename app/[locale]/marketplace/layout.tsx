
export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
 return (
 <>
 
 <main className="min-h-screen bg-background-light dark:bg-secondary-dark">
 {children}
 </main>
 
 </>
 );
}
