import { cn } from '@/6_shared/lib/utils'

interface MobileLayoutProps {
  children: React.ReactNode
  className?: string
}

export const MobileLayout = ({
  children,
  className = '',
}: MobileLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100">
      <div
        className={cn(
          'min-h-screen w-full max-w-[500px] bg-white shadow-xl',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
