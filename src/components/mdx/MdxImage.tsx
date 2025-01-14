import { Text } from '../ui/text';

interface Props {
  src: string;
  alt: string;
}

export default function MdxImage({ src, alt }: Props) {
  return (
    <>
      <img src={src} alt={alt} className="mx-auto mb-2 mt-10 rounded-md" />

      <Text as="p" size="sm" color="muted" className="w-full text-center">
        {alt}
      </Text>
    </>
  );
}