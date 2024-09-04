import React, { FunctionComponent } from 'react'
import './Radar.css'

type RadarType = {
  showDropLighting: boolean
}

const Radar:FunctionComponent<RadarType> = ({showDropLighting}) => {
    return (
        <div className="radar-outline">
            <div className="radar-body">
                <ul className="radar">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    {showDropLighting && <><li></li><li></li><li></li><li></li></>}
                </ul>
            </div>
        </div>
    )
}

export default Radar
