import { ComponentProps } from "react"

interface IconButtonProps extends ComponentProps<'button'> {
    transparent?: boolean;
};

const chevronIconStyle = "bg-white/10 border border-white/10 rounded-md p-1.5";
const moreHorizontalStyle = "bg-black/20 border border-white/10 rounded-md p-1.5";

export const IconButton = ({transparent, ...props}: IconButtonProps) => {
    return (
        <button 
        {...props} 
        className={transparent ? moreHorizontalStyle : chevronIconStyle} children={props.children} />
    )
};