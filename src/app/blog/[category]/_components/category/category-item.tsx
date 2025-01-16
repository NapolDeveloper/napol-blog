import { Button } from '@/components/ui/button';

interface Props extends React.PropsWithChildren {
  isActive?: boolean;
}

export default function CategoryItem({ isActive, children }: Props) {
  return <Button variant={isActive ? 'default' : 'outline'}>{children}</Button>;
}
