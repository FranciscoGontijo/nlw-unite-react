import { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<'th'> { }

export const TableHeader = (props: TableHeaderProps) => {
    return (
        <th className="text-left py-3 px-4 text-sm font-semibold" {...props} />
    )
};