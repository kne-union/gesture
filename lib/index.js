import React from 'react'
import useData from './data'
import useHandler from './controller'

export default ( pops ) => {
    const data = useData()
    const handles = useHandler(pops,data)

    return handles
}


export const Gesture = ( { children, ...props } ) => {
    const data = useData()
    const handles = useHandler( props, data )
    return <div style={ { touchAction: 'none' } } { ...handles }>
        { children }
    </div>
}