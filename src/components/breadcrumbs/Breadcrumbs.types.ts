export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export interface BreadcrumbsProps {
  breadcrumbItens: BreadcrumbItem[];
}
