import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const abbreviateNumber = (number: number) => {
    if (number >= 1000000) {
        return (number / 1_000_000).toFixed(1) + "M";
    } else if (number >= 1_000) {
        return (number / 1_000).toFixed(1) + "K";
    } else {
        return number.toString()
    }
}
