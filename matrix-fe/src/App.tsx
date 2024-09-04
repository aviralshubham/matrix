import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Dashboard from './components/Dashboard/Dashboard'
import Admin from './components/Admin/Admin'
import { useGetConfigQuery } from './redux/services/configApi'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    const { data, isLoading } = useGetConfigQuery()

    useEffect(() => {
        if (!isLoading && data && data.eventName) {
            document.title = `EPAM | ${data?.eventName}`
        }
    }, [isLoading, data])

    function renderLoader() {
        return (
            <div className="loader">
                <CircularProgress />
            </div>
        )
    }

    function renderContent() {
        if (isLoading) {
            return renderLoader()
        }

        if (data?.isPortalActive) {
            return (
                <>
                    <header className="header">
                        <div className="header__frame">
                            <img
                                className="header__frame-vectorIcon"
                                alt="Search"
                                src="/epam.png"
                            />
                        </div>

                        <div className="header-title">{data?.eventName}</div>
                    </header>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Dashboard
                                        eventName={data?.eventName || ''}
                                        categories={data?.categories || []}
                                        tshirtSizes={data?.tshirtSizes || []}
                                        teamMinSize={data?.teamMinSize || 3}
                                        teamMaxSize={data?.teamMaxSize || 5}
                                        allowViewDetails={
                                            data?.allowViewDetails || false
                                        }
                                    />
                                }
                            />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </Router>
                </>
            )
        }

        return (
            <div className="notAvailable">
                {`Sorry, currently not accepting registrations for event ${
                    data?.eventName || ''
                }`}
            </div>
        )
    }

    return <div className="App">{renderContent()}</div>
}

export default App
