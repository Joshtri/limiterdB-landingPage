import {cn} from '@/lib/cn'

/** Short yellow tick plus label: the limit line, used as a section marker. */
export function Label({children, className}) {
  return (
    <p className={cn('title-4 flex items-center gap-2 text-dim', className)}>
      <span className="h-0.5 w-4 rounded-full bg-limit" aria-hidden />
      {children}
    </p>
  )
}

export function SectionHead({label, title, children, className}) {
  return (
    <div className={cn('reveal flex max-w-2xl flex-col gap-4', className)}>
      <Label>{label}</Label>
      <h2 className="heading-4 sm:heading-3">{title}</h2>
      {children && <p className="body-7 text-dim">{children}</p>}
    </div>
  )
}
