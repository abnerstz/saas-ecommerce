import { useState, useEffect } from 'react'
import { useIsDesktop } from './useMediaQuery'

const SIDEBAR_COLLAPSED_KEY = 'admin-sidebar-collapsed'

function getStoredCollapsed(): boolean {
  try {
    const v = localStorage.getItem(SIDEBAR_COLLAPSED_KEY)
    return v === 'true'
  } catch {
    return false
  }
}

export function useSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(getStoredCollapsed)
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (isDesktop) {
      setIsSidebarOpen(false)
    }
  }, [isDesktop])

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

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(isSidebarCollapsed))
    } catch {
      // ignore
    }
  }, [isSidebarCollapsed])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed((prev) => !prev)
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
    openSidebar,
    isSidebarCollapsed,
    toggleSidebarCollapsed
  }
}
