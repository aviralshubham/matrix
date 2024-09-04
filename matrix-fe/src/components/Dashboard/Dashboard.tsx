import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { AlertColor } from '@mui/material/Alert'
import Button from '../Button/Button'
import FlyoutModal from '../FlyoutModal/FlyoutModal'
import './Dashboard.css'
import Radar from '../Radar/Radar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from '../Search/Search'
import Bubbles from '../Bubble/Bubble'
import {
    useGetIdeasQuery,
    useLazyGetIdeasQuery,
    useSubmitIdeaMutation,
} from '../../redux/services/ideasApi'
import IdeaForm from '../IdeaForm/IdeaForm'
import { Category, IdeaData, IdeaFormData } from '../common.interface'
import Toast from '../Toast/Toast'

export interface DashboardInterface {
    eventName: string
    categories: Array<Category>
    tshirtSizes: Array<string>
    teamMinSize: number
    teamMaxSize: number
    allowViewDetails: boolean
}
const Dashboard: FunctionComponent<DashboardInterface> = ({
    eventName,
    categories,
    tshirtSizes,
    teamMinSize,
    teamMaxSize,
    allowViewDetails,
}) => {
    const { data: ideasList } = useGetIdeasQuery()
    const [getIdeas, results] = useLazyGetIdeasQuery()
    const [submitNewIdea] = useSubmitIdeaMutation()
    const [openModal, setOpenModal] = useState(false)
    const containerStyle = {
        backgroundColor: 'transparent',
        color: 'white',
    }

    const [searchString, setSearchString] = useState('')
    const [localIdeaList, setLocalIdeaList] = useState(ideasList)
    const [toastNotification, setToastNotification] = useState(false)
    const [toastType, setToastType] = useState<AlertColor>('success')
    const searchIdeaListKeys = (
        array: Array<IdeaData>,
        searchString: string
    ): Array<IdeaData> => {
        return array.filter((idea) => {
            const includesSearchString: any = (keyType: any) => {
                if (typeof keyType === 'object') {
                    return Object.values(keyType).some((value) =>
                        includesSearchString(value, searchString)
                    )
                } else if (Array.isArray(keyType)) {
                    return keyType.some((item: any) =>
                        includesSearchString(item, searchString)
                    )
                } else if (typeof keyType === 'string') {
                    return keyType
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                }
                return false
            }

            return includesSearchString(idea, searchString)
        })
    }

    useMemo(() => {
        if (ideasList) {
            if (searchString.trim() === '') {
                setLocalIdeaList(ideasList)
            } else {
                const filteredIdeas: Array<IdeaData> = searchIdeaListKeys(
                    ideasList,
                    searchString
                )
                setLocalIdeaList(filteredIdeas)
            }
        }
    }, [ideasList, searchString])

    useEffect(() => {
        if (results && results.data) {
            setLocalIdeaList(results.data)
        }
    }, [results])

    const submitIdea = (newIdea: IdeaFormData) => {
        submitNewIdea(newIdea)
            .unwrap()
            .then(() => {
                getIdeas()
                setToastType('success')
                setToastNotification(true)
            })
            .catch((error) => {
                if (error.status === 400) {
                    setToastType('error')
                    setToastNotification(true)
                }
            })
        setOpenModal(false)
    }

    return (
        <Container fluid style={containerStyle} className="dashboard">
            <Row>
                <Col sm={12} md={5} lg={5} xs={12}>
                    <div className="dashboard-container">
                        <div className="dashboard-container__left">
                            <div className="dashboard-container__left-feature">
                                <div className="dashboard-container__left-feature-title">
                                    <p className="dashboard-container__left-feature-title--top">{`Ignite Your `}</p>
                                    <p className="dashboard-container__left-feature-title--bottom">
                                        Creativity
                                    </p>
                                </div>
                                <Button
                                    buttonPosition="relative"
                                    onClickToggle={() => {
                                        setToastNotification(false)
                                        setOpenModal(true)
                                    }}
                                    label="SUBMIT IDEA"
                                />
                            </div>
                            <div className="dashboard-container__left-search">
                                <div className="dashboard-container__left-search-title">
                                    Get Inspired
                                </div>
                                <div className="dashboard-container__left-search-subtitle">
                                    Search for an idea that can fuel yours
                                </div>
                                <SearchBar setSearchString={setSearchString} />
                            </div>
                        </div>
                    </div>
                    {openModal && (
                        <FlyoutModal
                            eventName={eventName}
                            setOpenModal={setOpenModal}
                            children={
                                <IdeaForm
                                    categories={categories}
                                    tshirtSizes={tshirtSizes}
                                    teamMinSize={teamMinSize}
                                    teamMaxSize={teamMaxSize}
                                    eventName={eventName}
                                    submitIdea={submitIdea}
                                />
                            }
                        />
                    )}
                </Col>

                <Col sm={12} md={7} lg={7} xs={12}>
                    <div className="dashboard-container__right">
                        <Radar
                            showDropLighting={
                                ideasList && ideasList?.length > 0
                                    ? false
                                    : true
                            }
                        />
                        {localIdeaList && (
                            <Bubbles
                                ideaList={localIdeaList}
                                categories={categories}
                                allowViewDetails={allowViewDetails}
                            />
                        )}
                    </div>
                </Col>
                {toastNotification && (
                    <Toast
                        shouldOpen={toastNotification}
                        onCloseHandler={setToastNotification}
                        toastMessage={
                            toastType === 'success'
                                ? 'Idea submitted successfully'
                                : 'Error in submission. Team Name already exists'
                        }
                        toastType={toastType}
                        isSubmitTypeToast={true}
                        width="30%"
                        top="100px"
                    />
                )}
            </Row>
        </Container>
    )
}

export default Dashboard
