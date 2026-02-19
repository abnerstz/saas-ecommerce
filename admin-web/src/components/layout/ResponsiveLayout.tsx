import { ReactNode } from 'react'
import { cn } from '@/components/ui'
import ResponsiveSidebar from './ResponsiveSidebar'
import MobileHeader from './MobileHeader'
import DesktopHeader from './DesktopHeader'
import { useSidebar } from '../../hooks/useSidebar'

interface ResponsiveLayoutProps {
  children: ReactNode
}

export default function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    isSidebarCollapsed,
    toggleSidebarCollapsed
  } = useSidebar()

  return (
    <div className="min-h-screen bg-background">
      <ResponsiveSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        isCollapsed={isSidebarCollapsed}
      />

      <div
        className={cn(
          'flex flex-col h-screen overflow-hidden transition-[padding-left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isSidebarCollapsed ? 'lg:pl-0' : 'lg:pl-64'
        )}
      >
        {/* Mobile Header - only shown on mobile/tablet */}
        <div className="flex-none lg:hidden shrink-0">
          <MobileHeader 
            isSidebarOpen={isSidebarOpen} 
            onToggleSidebar={toggleSidebar} 
          />
        </div>
        
        <div className="hidden flex-none shrink-0 lg:block">
          <DesktopHeader
            isSidebarCollapsed={isSidebarCollapsed}
            onToggleSidebarCollapsed={toggleSidebarCollapsed}
          />
        </div>
        
        {/* Main content - scrollable */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  )
}
