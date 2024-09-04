import { IdeaFormData, Member } from '../common.interface'

export const validateIdea = (idea: IdeaFormData) => {
    if (idea) {
        if (!idea.teamName) {
            return {
                invalid: true,
                page: 0,
            }
        }
        if (idea.members) {
            let invalidMember = false
            idea.members.forEach((member: Member) => {
                if (!member.name || !member.email || !member.tshirt) {
                    invalidMember = true
                    return
                }
            })
            if (invalidMember) {
                return {
                    invalid: true,
                    page: 1,
                }
            }
        }
        if (!idea.problem) {
            return {
                invalid: true,
                page: 2,
            }
        }
        if (!idea.solution) {
            return {
                invalid: true,
                page: 3,
            }
        }
        if (!idea.benefits) {
            return {
                invalid: true,
                page: 4,
            }
        }
        if (
            !idea.category?.id ||
            !idea.category?.label ||
            idea.category?.label === 'Other-'
        ) {
            return {
                invalid: true,
                page: 5,
            }
        }
        if (!idea.mode) {
            return {
                invalid: true,
                page: 6,
            }
        }
    }
    return null
}

export const getTrimValue = (val: string) => {
    if (val) {
        return val.trim()
    }
    return ''
}

export const getTrimMembers = (members: Member[]) => {
    if (members && members.length) {
        return members.map((member: Member) => {
            return {
                name: getTrimValue(member.name),
                email: getTrimValue(member.email),
                tshirt: member.tshirt,
            }
        })
    }
    return members
}
