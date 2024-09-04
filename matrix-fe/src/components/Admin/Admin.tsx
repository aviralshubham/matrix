import React, { FunctionComponent, useEffect, useState } from 'react'
// import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'
import { useLazyGetIdeasQuery } from '../../redux/services/ideasApi'
import { constants } from '../../redux/services/constants'
import { useValidateMutation } from '../../redux/services/configApi'
import { Box } from '@mui/system'
import './Admin.css'
import { IdeaData, Member } from '../common.interface'
import { Typography } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}))

const Admin: FunctionComponent = () => {
    const [getIdeas, results] = useLazyGetIdeasQuery()
    const [validate] = useValidateMutation()

    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [authenticated, setAuthenticated] = useState(false)
    const [openAuth, setOpenAuth] = useState(false)
    const [adminPin, setAdminPin] = useState('')
    const [error, setError] = useState('')
    const [ideas, setIdeas] = useState<IdeaData[]>([])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const downloadExcel = () => {
        window.open(
            `${constants.BASE_URL}/download-excel?pin=${adminPin}`,
            '_self'
        )
    }

    const onAuth = () => {
        validate({ adminPin })
            .unwrap()
            .then(() => {
                getIdeas()
                setAuthenticated(true)
                setOpenAuth(false)
            })
            .catch((err) => {
                setError(err.data?.error)
                console.error(err.data?.error)
            })
    }

    useEffect(() => {
        if (!authenticated) {
            setAdminPin('')
            setError('')
            setOpenAuth(true)
        }
    }, [authenticated])

    useEffect(() => {
        if (results && results.data) {
            setIdeas(results.data)
        }
    }, [results])

    const getAuthPrompt = () => {
        return (
            <div>
                <Dialog
                    open={openAuth}
                    onClose={() => {
                        setOpenAuth(false)
                    }}
                    maxWidth="md"
                >
                    <DialogTitle>Kindly enter admin pin</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="pin"
                            label="Admin Pin"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={adminPin}
                            onChange={(e) => {
                                setAdminPin(e.target.value)
                                setError('')
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    // Cancel the default action, if needed
                                    event.preventDefault()
                                    // Trigger the button element with a click
                                    onAuth()
                                }
                            }}
                        />
                        {error ? <Alert severity="error">{error}</Alert> : ''}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setOpenAuth(false)
                            }}
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        <Button onClick={onAuth} color="primary">
                            Authenticate
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    return authenticated ? (
        <div className="admin-table">
            <div className="admin-table-container">
                {ideas && ideas.length ? (
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <div
                            className="admin-download-container"
                            onClick={downloadExcel}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    // Cancel the default action, if needed
                                    event.preventDefault()
                                    // Trigger the button element with a click
                                    downloadExcel()
                                }
                            }}
                        >
                            <img
                                className="admin-download"
                                alt="Download Data"
                                src="/download-icon.svg"
                            />
                        </div>

                        <TableContainer sx={{ maxHeight: '84vh' }}>
                            <Table aria-label="Admin table" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>
                                            Team Name
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            Members
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            Category
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            Problem Statement
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            Solution
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            Benefits
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            Mode
                                        </StyledTableCell>
                                        <StyledTableCell align="left">
                                            Time Stamp
                                        </StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ideas
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((row: IdeaData) => (
                                            <StyledTableRow key={row.teamId}>
                                                <StyledTableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.teamName}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.members &&
                                                        row.members.length &&
                                                        row.members.map(
                                                            (
                                                                member: Member,
                                                                index: number
                                                            ) => (
                                                                <div>
                                                                    {index + 1}
                                                                    .&nbsp;
                                                                    {
                                                                        member?.name
                                                                    }
                                                                    &nbsp;&lt;
                                                                    {
                                                                        member?.email
                                                                    }
                                                                    &gt;&nbsp;(
                                                                    {
                                                                        member?.tshirt
                                                                    }
                                                                    )
                                                                    <br />
                                                                    <br />
                                                                </div>
                                                            )
                                                        )}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.category?.label}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.problem}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.solution}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.benefits}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.mode}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {row.timeStamp}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box
                            className="pagination"
                            display="flex"
                            justifyContent="right"
                        >
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={ideas.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>
                    </Paper>
                ) : (
                    <Typography
                        sx={{
                            textAlign: 'center',
                            mt: 4,
                            color: 'white',
                            fontSize: '24',
                        }}
                    >
                        No records available
                    </Typography>
                )}
            </div>
        </div>
    ) : (
        getAuthPrompt()
    )
}

export default Admin
