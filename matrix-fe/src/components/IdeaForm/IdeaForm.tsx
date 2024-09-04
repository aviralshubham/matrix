import React, { useState } from 'react'

import {
    Box,
    FormControl,
    Typography,
    Input,
    InputLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    Select,
    MenuItem,
} from '@mui/material'

import PersonRemoveIcon from '@mui/icons-material/PersonRemove'

import IdeaStepper from '../IdeaStepper/IdeaStepper'
import Button from '../Button/Button'
import { validateIdea, getTrimValue, getTrimMembers } from './helpers'
import './IdeaForm.css'
import { Col, Container, Row } from 'react-bootstrap'
import Toast from '../Toast/Toast'
import { Category, IdeaFormData, Member } from '../common.interface'

const pageToStep = {
    0: 0,
    1: 0,
    2: 1,
    3: 1,
    4: 1,
    5: 2,
    6: 2,
    7: 3,
}

const fontSize = '3vh'
const smallFontSize = '14px'
const fontColor = '#70F2FC'

export default function IdeaForm(props: {
    submitIdea: (idea: IdeaFormData) => void
    categories: Category[]
    tshirtSizes: string[]
    teamMinSize: number
    teamMaxSize: number
    eventName: string
}) {
    const [activePage, setActivePage] = useState(0)
    const [teamName, setTeamName] = useState('')
    const [members, setMembers] = useState<Member[]>([
        { name: '', email: '', tshirt: '' },
        { name: '', email: '', tshirt: '' },
        { name: '', email: '', tshirt: '' },
    ])
    const [problem, setProblem] = useState('')
    const [solution, setSolution] = useState('')
    const [benefits, setBenefits] = useState('')
    const [category, setCategory] = useState('')
    const [mode, setMode] = useState('')
    const [errorToast, setErrorToast] = useState(false)
    const [email, setEmail] = useState('')
    const [isValidMail, setIsValidMail] = useState(true)
    const [otherCategory, setOtherCategory] = useState('') // To enable other category selection kindly add this record in config DB under categories list - { "id": "other", "label": "Other", "hexCode": "#32323240" }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

    const onSubmitIdea = () => {
        const idea = createIdea()
        const isInvalid = validateIdea(idea)
        if (isInvalid && isInvalid.invalid) {
            setActivePage(isInvalid.page)
            setErrorToast(true)
        } else {
            props.submitIdea(idea)
        }
    }

    const handleEmailBlur = () => {
        const isValid = emailRegex.test(email)
        if (!isValid && email.length > 0) {
            setIsValidMail(false)
        } else {
            setIsValidMail(true)
        }
    }

    const handleNext = () => {
        activePage === 1 && !emailRegex.test(email) && email.length > 0
            ? setIsValidMail(false)
            : setActivePage(activePage + 1)
    }

    const handlePrev = () => {
        setActivePage(activePage - 1)
    }

    const handleAddMember = () => {
        setMembers([...members, { name: '', email: '', tshirt: '' }])
    }

    const handleRemoveMember = (index: number) => {
        const updatedMembers = [...members]
        updatedMembers.splice(index, 1)
        setMembers(updatedMembers)
    }

    const createIdea = () => {
        return {
            teamName: getTrimValue(teamName),
            members: getTrimMembers(members),
            problem: getTrimValue(problem),
            solution: getTrimValue(solution),
            benefits: getTrimValue(benefits),
            category: {
                id: category,
                label:
                    category === 'other'
                        ? `Other-${getTrimValue(otherCategory)}`
                        : props.categories.filter(
                              (cat) => cat.id === category
                          )[0]?.label,
            },
            mode,
        }
    }

    const getSubForm = () => {
        if (activePage === 0) {
            return (
                <>
                    <Typography
                        sx={{ textAlign: 'left', mb: 2, fontSize: fontSize }}
                    >
                        What is your{' '}
                        <span style={{ color: fontColor }}>Team Name</span>?
                        <sup>*</sup>
                    </Typography>
                    <FormControl fullWidth variant="standard">
                        <Input
                            id="team-name"
                            placeholder="Enter your Team Name here..."
                            value={teamName}
                            onChange={(e) => {
                                setTeamName(e.target.value)
                            }}
                        />
                    </FormControl>
                </>
            )
        } else if (activePage === 1) {
            return (
                <>
                    <Typography
                        sx={{ textAlign: 'left', mb: 2, fontSize: fontSize }}
                    >
                        Who are your{' '}
                        <span style={{ color: fontColor }}>Team Members</span>?
                        <sup>*</sup>{' '}
                        <span style={{ fontSize: smallFontSize }}>
                            (Team Size: {props.teamMinSize} to{' '}
                            {props.teamMaxSize})
                        </span>
                    </Typography>

                    <div className="form-input__container">
                        {members.map((member, index) => {
                            return (
                                <Box
                                    sx={{ mb: '20px', width: '100%' }}
                                    key={index}
                                >
                                    <Container fluid>
                                        <Row
                                            style={{
                                                textAlign: 'left',
                                            }}
                                        >
                                            <Col
                                                sm={4}
                                                md={4}
                                                lg={4}
                                                style={{
                                                    paddingLeft: 0,
                                                }}
                                            >
                                                <FormControl variant="standard">
                                                    <InputLabel
                                                        htmlFor={`memberName${index}`}
                                                        sx={{
                                                            maxWidth: '100%',
                                                        }}
                                                    >
                                                        Name
                                                    </InputLabel>
                                                    <Input
                                                        id={`memberName${index}`}
                                                        // placeholder="Name"
                                                        value={member.name}
                                                        onChange={(e) => {
                                                            const updatedMember =
                                                                {
                                                                    ...member,
                                                                    name: e
                                                                        .target
                                                                        .value,
                                                                }
                                                            const updatedMembers =
                                                                [...members]
                                                            updatedMembers[
                                                                index
                                                            ] = updatedMember
                                                            setMembers(
                                                                updatedMembers
                                                            )
                                                        }}
                                                        sx={{
                                                            maxWidth: '100%',
                                                            minWidth: '15vw',
                                                        }}
                                                    />
                                                </FormControl>
                                            </Col>
                                            <Col
                                                sm={4}
                                                md={4}
                                                lg={4}
                                                style={{
                                                    textAlign: 'left',
                                                }}
                                            >
                                                <FormControl variant="standard">
                                                    <InputLabel
                                                        htmlFor={`memberEmail${index}`}
                                                    >
                                                        Email
                                                    </InputLabel>
                                                    <Input
                                                        id={`memberEmail${index}`}
                                                        // placeholder="Email"
                                                        value={member.email}
                                                        onChange={(e) => {
                                                            setEmail(
                                                                e.target.value
                                                            )

                                                            const updatedMember =
                                                                {
                                                                    ...member,
                                                                    email: e
                                                                        .target
                                                                        .value,
                                                                }
                                                            const updatedMembers =
                                                                [...members]
                                                            updatedMembers[
                                                                index
                                                            ] = updatedMember
                                                            setMembers(
                                                                updatedMembers
                                                            )
                                                        }}
                                                        onBlur={handleEmailBlur}
                                                        sx={{
                                                            maxWidth: '100%',
                                                            minWidth: '14vw',
                                                        }}
                                                    />
                                                </FormControl>
                                            </Col>
                                            <Col sm={4} md={4} lg={4}>
                                                <FormControl
                                                    sx={{
                                                        minWidth: `${
                                                            members.length >
                                                            props.teamMinSize
                                                                ? '15.5vh'
                                                                : '23vh'
                                                        }`,
                                                        mr: '3vw',
                                                        '@media(min-width: 2560px)':
                                                            {
                                                                minWidth:
                                                                    '23vh',
                                                            },
                                                    }}
                                                    variant="standard"
                                                >
                                                    <InputLabel
                                                        htmlFor={`memberTshirt${index}`}
                                                    >
                                                        T-Shirt Size
                                                    </InputLabel>
                                                    <Select
                                                        id={`memberTshirt${index}`}
                                                        value={member.tshirt}
                                                        onChange={(e) => {
                                                            const updatedMember =
                                                                {
                                                                    ...member,
                                                                    tshirt: e
                                                                        .target
                                                                        .value,
                                                                }
                                                            const updatedMembers =
                                                                [...members]
                                                            updatedMembers[
                                                                index
                                                            ] = updatedMember
                                                            setMembers(
                                                                updatedMembers
                                                            )
                                                        }}
                                                        label="T-Shirt Size"
                                                    >
                                                        {props.tshirtSizes &&
                                                            props.tshirtSizes.map(
                                                                (tsize) => {
                                                                    return (
                                                                        <MenuItem
                                                                            value={
                                                                                tsize
                                                                            }
                                                                        >
                                                                            {
                                                                                tsize
                                                                            }
                                                                        </MenuItem>
                                                                    )
                                                                }
                                                            )}
                                                    </Select>
                                                </FormControl>
                                                {members.length >
                                                    props.teamMinSize && (
                                                    <FormControl
                                                        sx={{
                                                            flexBasis: '25%',
                                                            mt: '20px',
                                                            cursor: 'pointer',
                                                        }}
                                                        variant="standard"
                                                    >
                                                        <PersonRemoveIcon
                                                            tabIndex={0}
                                                            role="button"
                                                            onClick={() => {
                                                                handleRemoveMember(
                                                                    index
                                                                )
                                                            }}
                                                            onKeyDown={(
                                                                event
                                                            ) => {
                                                                if (
                                                                    event.key ===
                                                                    'Enter'
                                                                ) {
                                                                    // Cancel the default action, if needed
                                                                    event.preventDefault()
                                                                    // Trigger the button element with a click
                                                                    handleRemoveMember(
                                                                        index
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    </FormControl>
                                                )}
                                            </Col>
                                        </Row>
                                    </Container>
                                </Box>
                            )
                        })}
                    </div>

                    {members.length < props.teamMaxSize && (
                        <Typography
                            sx={{
                                textAlign: 'left',
                                mt: 4,
                                mb: 2,
                                color: fontColor,
                                cursor: 'pointer',
                                fontSize: smallFontSize,
                                width: 'fit-content',
                            }}
                            onClick={() => {
                                handleAddMember()
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    // Cancel the default action, if needed
                                    event.preventDefault()
                                    // Trigger the button element with a click
                                    handleAddMember()
                                }
                            }}
                            tabIndex={0}
                            role="button"
                        >
                            + Add Team Member
                        </Typography>
                    )}
                </>
            )
        } else if (activePage === 2) {
            return (
                <>
                    <Typography
                        sx={{ textAlign: 'left', mb: 2, fontSize: fontSize }}
                    >
                        What <span style={{ color: fontColor }}>Problem</span>{' '}
                        are you trying to solve?<sup>*</sup>
                    </Typography>
                    <FormControl fullWidth variant="standard">
                        <Input
                            id="problem"
                            placeholder="Briefly describe your Problem Statement here..."
                            value={problem}
                            onChange={(e) => {
                                setProblem(e.target.value)
                            }}
                        />
                    </FormControl>
                </>
            )
        } else if (activePage === 3) {
            return (
                <>
                    <Typography
                        sx={{ textAlign: 'left', mb: 2, fontSize: fontSize }}
                    >
                        What is your{' '}
                        <span style={{ color: fontColor }}>Solution</span>{' '}
                        (Hackathon Idea)?
                        <sup>*</sup>
                    </Typography>
                    <FormControl fullWidth variant="standard">
                        <Input
                            id="solution"
                            placeholder="Explain your idea for solving the problem."
                            value={solution}
                            onChange={(e) => {
                                setSolution(e.target.value)
                            }}
                        />
                    </FormControl>
                </>
            )
        } else if (activePage === 4) {
            return (
                <>
                    <Typography
                        sx={{ textAlign: 'left', mb: 2, fontSize: fontSize }}
                    >
                        What <span style={{ color: fontColor }}>Benefits</span>{' '}
                        will your solution brings to customer?
                        <sup>*</sup>
                    </Typography>
                    <FormControl fullWidth variant="standard">
                        <Input
                            id="benefits"
                            placeholder="Describe how your solution will benefit users or customers."
                            value={benefits}
                            onChange={(e) => {
                                setBenefits(e.target.value)
                            }}
                        />
                    </FormControl>
                </>
            )
        } else if (activePage === 5) {
            return (
                <>
                    <Typography
                        sx={{ textAlign: 'left', mb: 2, fontSize: fontSize }}
                    >
                        In which{' '}
                        <span style={{ color: fontColor }}>Category</span> does
                        your project fit?
                        <sup>*</sup>
                    </Typography>
                    <FormControl fullWidth>
                        <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            value={category}
                            onChange={(e) => {
                                setOtherCategory('')
                                setCategory(e.target.value)
                            }}
                        >
                            {props.categories.map((cat) => {
                                return (
                                    <React.Fragment key={cat.id}>
                                        <FormControlLabel
                                            sx={{
                                                flex: 1,
                                                flexBasis: '33.333333%',
                                            }}
                                            value={cat.id}
                                            control={<Radio />}
                                            label={
                                                cat.id === 'other' ? (
                                                    <Input
                                                        id="otherCategory"
                                                        placeholder="Other? Mention Here..."
                                                        value={
                                                            category !== 'other'
                                                                ? ''
                                                                : otherCategory
                                                        }
                                                        disabled={
                                                            category !== 'other'
                                                        }
                                                        sx={{
                                                            flex: 1,
                                                            flexBasis:
                                                                '33.333333%',
                                                        }}
                                                        onChange={(e) => {
                                                            setOtherCategory(
                                                                e.target.value
                                                            )
                                                        }}
                                                    />
                                                ) : (
                                                    cat.label
                                                )
                                            }
                                        />
                                    </React.Fragment>
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                </>
            )
        } else if (activePage === 6) {
            return (
                <>
                    <Typography
                        sx={{ textAlign: 'left', mb: 2, fontSize: fontSize }}
                    >
                        How do you plan to{' '}
                        <span style={{ color: fontColor }}>Participate</span>?
                        <sup>*</sup>
                    </Typography>
                    <FormControl fullWidth>
                        <RadioGroup
                            row
                            name="row-radio-buttons-group"
                            value={mode}
                            onChange={(e) => {
                                setMode(e.target.value)
                            }}
                        >
                            <FormControlLabel
                                sx={{ flex: 1 }}
                                value="Online"
                                control={<Radio />}
                                label="Online"
                            />
                            <FormControlLabel
                                sx={{ flex: 1 }}
                                value="Offline"
                                control={<Radio />}
                                label="Offline"
                            />
                        </RadioGroup>
                    </FormControl>
                </>
            )
        } else if (activePage === 7) {
            return (
                <>
                    <Typography
                        sx={{
                            textAlign: 'left',
                            mb: 2,
                            color: fontColor,
                            fontSize: fontSize,
                        }}
                    >
                        Declaration
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: 'left',
                            mb: 4,
                            fontSize: fontSize,
                        }}
                    >
                        By submitting this form, I agree to follow the&nbsp;
                        {props.eventName} rules and regulations.
                    </Typography>
                    <Button
                        onClickToggle={() => onSubmitIdea()}
                        label="SUBMIT"
                        size="small"
                    />
                </>
            )
        }
    }

    return (
        <>
            <IdeaStepper
                activeStep={pageToStep[activePage as keyof typeof pageToStep]}
            />
            <Box sx={{ margin: '50px' }}>
                {getSubForm()}
                <div className="navigation">
                    {activePage !== 0 && (
                        <div
                            className="navigate-prev"
                            onClick={() => {
                                handlePrev()
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    // Cancel the default action, if needed
                                    event.preventDefault()
                                    // Trigger the button element with a click
                                    handlePrev()
                                }
                            }}
                        >
                            <img
                                alt="prev"
                                src="/arrow.svg"
                                tabIndex={0}
                                role="button"
                            />
                        </div>
                    )}
                    {activePage !== 7 && (
                        <div
                            className="navigate-next"
                            onClick={() => {
                                handleNext()
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    // Cancel the default action, if needed
                                    event.preventDefault()
                                    // Trigger the button element with a click
                                    handleNext()
                                }
                            }}
                        >
                            <img
                                alt="next"
                                src="/arrow.svg"
                                tabIndex={0}
                                role="button"
                            />
                        </div>
                    )}
                </div>
            </Box>
            {errorToast && (
                <Toast
                    shouldOpen={errorToast}
                    onCloseHandler={setErrorToast}
                    toastMessage={'Kindly provide all required fields'}
                    isSubmitTypeToast={true}
                    toastType="error"
                    width="100%"
                    top="24px"
                />
            )}
            {!isValidMail && (
                <Toast
                    shouldOpen={!isValidMail}
                    onCloseHandler={setIsValidMail}
                    toastMessage={'Please enter a valid email address'}
                    toastType="error"
                    width="100%"
                    top="24px"
                />
            )}
        </>
    )
}
