import { Popover, Typography } from '@mui/material'

export default function PopOverComponent(props: {
    data: string
    anchorEl: HTMLElement | null
}) {
    return (
        <Popover
            id="mouse-over-popover"
            sx={{
                pointerEvents: 'none',
            }}
            open={true}
            anchorEl={props.anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            disableRestoreFocus
        >
            <Typography sx={{ p: 1 }}>{props.data}</Typography>
        </Popover>
    )
}
