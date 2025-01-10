import { Badge } from '@/components/ui/badge';

export default function PostTagBadge({ children }: React.PropsWithChildren) {
  return <Badge variant="outline">{children}</Badge>;
}
