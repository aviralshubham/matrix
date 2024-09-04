export interface IdeaFormData {
    teamName: string
    members: Array<Member>
    problem: string
    solution: string
    benefits: string
    category: {
        id: string
        label: string
    }
    mode: string
}

export interface IdeaData extends IdeaFormData {
    _id: string
    teamId: string
    timeStamp: string
    status: string
}

export interface Member {
    name: string
    email: string
    tshirt: string
}

export interface Category {
    id: string
    label: string
    hexCode: string
}

export interface Config {
    _id: string
    eventName: string
    categories: Category[]
    adminPin: string
    fromDate: string
    toDate: string
    tshirtSizes: string[]
    teamMinSize: number
    teamMaxSize: number
    isPortalActive: boolean
    allowViewDetails: boolean
}
