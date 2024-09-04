import {
    Container,
    InputAdornment,
    TextField,
    ThemeProvider,
    createTheme,
} from '@mui/material'
import React, { SetStateAction, useState } from 'react'
import './Search.css'

const theme = createTheme({ palette: { mode: 'dark' } })

export default function SearchBar(props: {
    setSearchString: (value: React.SetStateAction<string>) => void
}) {
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (event: {
        target: { value: SetStateAction<string> }
    }) => {
        setSearchTerm(event.target.value)
        props.setSearchString(event.target.value)
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 0, ml: -3 }}>
            <ThemeProvider theme={theme}>
                <TextField
                    id="search"
                    type="search"
                    color="secondary"
                    variant="standard"
                    value={searchTerm}
                    onChange={handleChange}
                    sx={{ background: 'transparent' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img
                                    src="./search.svg"
                                    alt="Search Logo"
                                    className="search_logo"
                                    style={{
                                        width: '3.14vh',
                                        height: '3.14vh',
                                    }}
                                />
                            </InputAdornment>
                        ),
                    }}
                    style={{ width: '50.25vh', height: '4vh' }}
                />
            </ThemeProvider>
        </Container>
    )
}
