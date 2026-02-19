import { useState, useEffect } from 'react'
import { useIsDesktop } from './useMediaQuery'

export function useSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isDesktop = useIsDesktop()

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(false)
    }
  }, [isDesktop])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen && !isDesktop) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen, isDesktop])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar
  }
}
