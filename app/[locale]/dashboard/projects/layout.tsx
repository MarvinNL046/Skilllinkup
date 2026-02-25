
interface ProjectsLayoutProps {
 children: React.ReactNode;
}

export default function ClientProjectsLayout({ children }: ProjectsLayoutProps) {
 return (
 <>
 
 <main className="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950">
 {children}
 </main>
 
 </>
 );
}
