import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<'button'> {
    transparent?: boolean;
};

const chevronIconStyle = "bg-white/10 border border-white/10 rounded-md p-1.5";
const moreHorizontalStyle = "bg-black/20 border border-white/10 rounded-md p-1.5";

export const IconButton = ({ transparent, ...props }: IconButtonProps) => {
    return (
        <button
            {...props}
            className={twMerge(
                'border border-white/10 rounded-md p-1.5',
                transparent ? 'bg-white/10' : 'bg-black/20',
                props.disabled && 'opacity-50'
            )
            } children={props.children} />
    )
};