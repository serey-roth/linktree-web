import React from 'react'
import Image from 'next/image';

type Variant = 'small' | 'medium' | 'large';

interface AvatarProps {
    variant: Variant;
    name: string;
    imageSrc?: string;
}

const renderAvatarBoxSize = (variant: Variant) => {
    switch(variant) {
        case 'medium': return 'w-[100px]';
        case 'large': return 'w-[150px]';
        default: return 'w-[50px]';
    }
}

export const Avatar: React.FC<AvatarProps> = ({
    variant,
    name,
    imageSrc
}) => {
    return (
        <div className={`flex items-center aspect-square
        text-3xl font-bold justify-center bg-teal-400
        drop-shadow-md rounded-full
        ${renderAvatarBoxSize(variant)}`}>
            {imageSrc ? (
                <Image
                priority
                src={imageSrc}
                alt="avatar's picture"
                width={150}
                height={150}
                className={`max-h-full max-w-full aspect-square
                rounded-full object-cover ${renderAvatarBoxSize(variant)}`} />
            ) : name}
        </div>
    );
}