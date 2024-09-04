import React, { ReactElement } from 'react'
import { TfiClose } from 'react-icons/tfi'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './FlyoutModal.css'

const theme = createTheme({ palette: { mode: 'dark' } })

export default function FlyoutModal(props: {
    setOpenModal: (value: React.SetStateAction<boolean>) => void
    eventName: string
    children: ReactElement<any, any>
}) {
    return (
        <ThemeProvider theme={theme}>
            <div className="flyout-modal">
                <div className="flyout-modal-overlay"></div>
                <div className="flyout-modal-content">
                    <div className="flyout-modal-content__header">
                        {props.eventName}
                    </div>
                    <div className="flyout-modal-content__body">
                        {props.children}
                    </div>

                    <button
                        className="flyout-modal-close__button"
                        onClick={() => props.setOpenModal(false)}
                    >
                        <TfiClose color="white" cursor={'pointer'} size={20} />
                    </button>
                </div>
            </div>
        </ThemeProvider>
    )
}
