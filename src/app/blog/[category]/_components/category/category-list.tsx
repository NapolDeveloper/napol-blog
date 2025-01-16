'use client';

import { useRouter, usePathname } from 'next/navigation';
import { CategoryDetail } from '@/models/category';
import CategoryItem from './category-item';

interface Props {
  categoryList: CategoryDetail[];
}

export default function CategoryList({ categoryList }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeCategory = (path: string) => {
    const targetPath = path === 'all' ? '/blog' : `/blog/${path}`;
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
  };

  const renderCategoryItem = (path: string, label: string, isActive: boolean) => (
    <li key={path} onClick={() => handleChangeCategory(path)}>
      <CategoryItem isActive={isActive}>{label}</CategoryItem>
    </li>
  );

  return (
    <ul className="flex items-center gap-2">
      {renderCategoryItem('all', 'All', pathname === '/blog')}
      {categoryList.map(category =>
        renderCategoryItem(category.category, category.parsedCategoryName, pathname === `/blog/${category.category}`)
      )}
    </ul>
  );
}
