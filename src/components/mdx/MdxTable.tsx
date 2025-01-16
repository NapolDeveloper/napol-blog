const MdxTable = ({ ...rest }: React.HTMLAttributes<HTMLTableElement>) => {
  return (
    <div className="relative w-full overflow-auto">
      <table className="min-w-full table-auto" {...rest}></table>
    </div>
  );
};

const MdxTableHead = ({ ...rest }: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <th className="border px-4 py-2" {...rest}></th>;
};

const MdxTableCell = ({ ...rest }: React.HTMLAttributes<HTMLTableCellElement>) => {
  return <td className="whitespace-nowrap border px-4 py-2" {...rest}></td>;
};

export { MdxTable, MdxTableHead, MdxTableCell };
