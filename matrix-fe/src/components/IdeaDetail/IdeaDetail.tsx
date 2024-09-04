import React from 'react'
import './IdeaDetail.css'
import { IdeaData } from '../common.interface'

const IdeaDetail = (props: { ideaData: IdeaData }) => {
    const IdeaHeaders = [
        'Problem Statement',
        'Business Proposition',
        'Category',
        'Participants',
    ]
    const childRenderer = (header: string, statements: string[]) => {
        return (
            <div className="idea-details__child">
                <div className="idea-details__child-header">{header}</div>
                <div className="idea-details__child-statement">
                    {statements.map((statement) => (
                        <div>{statement}</div>
                    ))}
                </div>
            </div>
        )
    }
    return (
        <div className="idea-details">
            {childRenderer(IdeaHeaders[0], [props.ideaData.problem])}
            {childRenderer(IdeaHeaders[1], [props.ideaData.solution])}
            {childRenderer(IdeaHeaders[2], [props.ideaData.category?.label])}
            {childRenderer(
                IdeaHeaders[3],
                props.ideaData.members.map(
                    (member, index) =>
                        `${index + 1}. ${member.name} <${member.email}>`
                )
            )}
        </div>
    )
}

export default IdeaDetail
