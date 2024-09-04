import React, { FunctionComponent, type CSSProperties } from 'react'
import './Button.css'

type ButtonType = {
    onClickToggle: React.MouseEventHandler<HTMLElement>
    buttonPosition?: CSSProperties['position']
    label: string
    size?: string
}

const Button: FunctionComponent<ButtonType> = ({
    // buttonPosition,
    onClickToggle,
    label,
    size,
}) => {
    return (
        <button
            className={`glow-on-hover ${size === 'small' ? 'small-btn' : ''}`}
            type="button"
            onClick={onClickToggle}
        >
            {label}
        </button>
    )
}

export default Button
