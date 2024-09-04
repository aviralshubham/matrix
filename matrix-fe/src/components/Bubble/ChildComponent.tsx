import React, { lazy, Suspense } from 'react'
import { Typography } from '@mui/material'

const LazyPopover = lazy(() => import('./PopOverComponent'))

export default function ChildComponent(props: {
    count: number
    data: string
    className: string
    setClick: (value: React.SetStateAction<Boolean>) => void
    hexCode: string
}) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handlePopoverClose = () => {
        setAnchorEl(null)
    }

    const openPopover = Boolean(anchorEl)

    return (
        <div
            className={`childComponent `}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onClick={() => {
                props.setClick(true)
            }}
            style={{
                backgroundColor: props.hexCode.replace(/\d{2}$/, 'AF'),
                border: `1px solid ${props.hexCode.replace(/\d{2}$/, 'FF')}`,
            }}
        >
            <Typography
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                }}
            >
                {props.data}
            </Typography>
            <Suspense fallback={<></>}>
                {openPopover && (
                    <LazyPopover data={props.data} anchorEl={anchorEl} />
                )}
            </Suspense>
        </div>
    )
}
