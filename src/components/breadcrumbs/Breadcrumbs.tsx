import {
  BreadcrumbNav,
  BreadcrumbList,
  BreadcrumbItem as BreadcrumbItemLi,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbCurrent,
} from './Breadcrumbs.styles';
import { BreadcrumbsProps } from './Breadcrumbs.types';

export default function Breadcrumbs({ breadcrumbItens }: BreadcrumbsProps) {
  const renderBreadcrumbs = () =>
    breadcrumbItens.map((item, index) => {
      const isLast = index === breadcrumbItens.length - 1;
      return (
        <BreadcrumbItemLi key={index}>
          {isLast ? (
            <BreadcrumbCurrent aria-current="page">
              {item.name}
            </BreadcrumbCurrent>
          ) : (
            <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
          )}
          {!isLast && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
        </BreadcrumbItemLi>
      );
    });

  return (
    <BreadcrumbNav aria-label="Breadcrumb">
      <BreadcrumbList>{renderBreadcrumbs()}</BreadcrumbList>
    </BreadcrumbNav>
  );
}
