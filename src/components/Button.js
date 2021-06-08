import React from 'react'
import '../css/Button.css'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router'

const STYLES = ['btn--primary', 'btn--calltoaction', 'btn--secondary', 'btn--tertiary']

const SIZES = [ 'btn--medium', 'btn--large', 'btn--small'];

export const Button = ({children, type, onClick, buttonStyle,
buttonSize}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        //<Link to='/' className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
            </button>
        //</Link>
    )
}

