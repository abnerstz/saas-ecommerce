import { ReactNode } from 'react'
import ResponsiveLayout from './ResponsiveLayout'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <ResponsiveLayout>{children}</ResponsiveLayout>
}
