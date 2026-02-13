import { ReactNode } from 'react'
import ResponsiveSidebar from './ResponsiveSidebar'
import MobileHeader from './MobileHeader'
import DesktopHeader from './DesktopHeader'
import { useSidebar } from '../../hooks/useSidebar'

interface ResponsiveLayoutProps {
  children: ReactNode
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      {/* Responsive Sidebar */}
      <ResponsiveSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Mobile Header - only shown on mobile/tablet */}
        <div className="lg:hidden">
          <MobileHeader 
            isSidebarOpen={isSidebarOpen} 
            onToggleSidebar={toggleSidebar} 
          />
        </div>
        
        {/* Desktop Header - only shown on desktop */}
        <div className="hidden lg:block">
          <DesktopHeader />
        </div>
        
        {/* Main content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
