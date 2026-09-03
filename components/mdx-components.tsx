import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { SiteLink as Link } from '@/components/site-link';

function SmartLink({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) {
  if (href.startsWith('/')) {
    return <Link href={href} {...props}>{children}</Link>;
  }
  return <a href={href} rel="noreferrer" target="_blank" {...props}>{children}</a>;
}

function ResponsiveTable({ children, ...props }: ComponentPropsWithoutRef<'table'>) {
  return <div className="table-scroll"><table {...props}>{children}</table></div>;
}

export const mdxComponents: Record<string, (props: never) => ReactNode> = {
  a: SmartLink as never,
  table: ResponsiveTable as never,
};
