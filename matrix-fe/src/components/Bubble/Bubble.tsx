import BubbleUI from 'react-bubble-ui'
import 'react-bubble-ui/dist/index.css'
import Child from './ChildComponent'
import './Bubble.css'
import { useState } from 'react'
import FlyoutModal from '../FlyoutModal/FlyoutModal'
import IdeaDetail from '../IdeaDetail/IdeaDetail'
import { Category, IdeaData } from '../common.interface'

export interface BubbleInterface {
    ideaList: Array<IdeaData>
    categories: Array<Category>
    allowViewDetails: boolean
}

const Bubble: React.FunctionComponent<BubbleInterface> = ({
    ideaList,
    categories,
    allowViewDetails,
}) => {
    const options = {
        size: 225,
        minSize: 80,
        gutter: -25,
        provideProps: true,
        numCols: 4,
        fringeWidth: 80,
        yRadius: 50,
        xRadius: 125,
        cornerRadius: 50,
        showGuides: false,
        compact: true,
        gravitation: 0,
    }

    const [openModal, setOpenModal] = useState(false)
    const [modalEventData, setModalEventData] = useState({
        _id: '',
        teamName: '',
        members: [
            {
                name: '',
                email: '',
                tshirt: '',
            },
            {
                name: '',
                email: '',
                tshirt: '',
            },
            {
                name: '',
                email: '',
                tshirt: '',
            },
        ],
        problem: '',
        solution: '',
        benefits: '',
        category: {
            id: '',
            label: '',
        },
        mode: '',
        teamId: '',
        status: '',
        timeStamp: '',
    })

    function getHexCodeById(idToMatch: string) {
        for (const item of categories) {
            if (item.id === idToMatch) {
                return item.hexCode
            }
        }
        return '#7d55cb60'
    }

    const children = ideaList?.map((data: IdeaData, i: number) => {
        const hexCode = getHexCodeById(data.category.id)

        return (
            data && (
                <Child
                    data={data.teamName}
                    className="child"
                    key={i}
                    count={i}
                    setClick={() => {
                        if (allowViewDetails) {
                            setModalEventData(data)
                            setOpenModal(true)
                        }
                    }}
                    hexCode={hexCode}
                />
            )
        )
    })

    return (
        ideaList && (
            <>
                <BubbleUI options={options} className="myBubbleUI">
                    {children}
                </BubbleUI>
                {openModal && (
                    <FlyoutModal
                        eventName={modalEventData.teamName}
                        setOpenModal={setOpenModal}
                        children={<IdeaDetail ideaData={modalEventData} />}
                    />
                )}
            </>
        )
    )
}

export default Bubble
