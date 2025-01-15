import { PropsWithChildren } from 'react';
import { Text } from '../ui/text';

export default function DeleteText({ children }: PropsWithChildren) {
  return (
    <Text size="sm">
      <del>{children}</del>
    </Text>
  );
}
