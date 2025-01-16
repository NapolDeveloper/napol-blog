import { MDXComponents } from 'mdx/types';

import MdxImage from './MdxImage';
import DeleteText from './DeleteText';
import { MdxTable, MdxTableHead, MdxTableCell } from './MdxTable';

export const MdxComponents: MDXComponents = {
  img: MdxImage,
  del: DeleteText,
  table: MdxTable,
  th: MdxTableHead,
  td: MdxTableCell,
};
