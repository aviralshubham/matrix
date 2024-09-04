import { Snackbar } from '@mui/material'
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert'
import React from 'react'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    }
)

const Toast = (props: {
    shouldOpen: boolean
    isSubmitTypeToast?: boolean
    onCloseHandler: (value: React.SetStateAction<boolean>) => void
    toastMessage: string
    toastType: AlertColor
    width: string
    top: string
}) => {
    return (
        <Snackbar
            open={props.shouldOpen}
            autoHideDuration={5000}
            onClose={() => {
                props.isSubmitTypeToast && props.onCloseHandler(false)
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ top: `${props.top} !important` }}
        >
            <Alert
                elevation={6}
                onClose={() => {
                    props.isSubmitTypeToast
                        ? props.onCloseHandler(false)
                        : props.shouldOpen && props.onCloseHandler(true)
                }}
                severity={props.toastType}
                sx={{ width: props.width }}
            >
                {props.toastMessage}
            </Alert>
        </Snackbar>
    )
}

export default Toast
