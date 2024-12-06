import React from 'react'


interface IHeadingProps {
    title: string
}

export const Heading = ({ title }: IHeadingProps): React.JSX.Element | null => {
    return title ? (
        <h2 className="text-2xl font-bold text-abu_primary">
            {title}
        </h2>
    ) : null
}
