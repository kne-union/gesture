import React from 'react'

export default ( { modPosition, modZoom, children } ) => {

    const touch = React.useRef( {} )

    const handleTouchStart = e => {
        let { length } = e.touches
        for ( let i = 0; i < length; i++ ) {
            const data = e.touches[i]

            touch.current[data.identifier] = {
                startX: data.screenX,
                startY: data.screenY,
                pageX: data.pageX,
                pageY: data.pageY,
                race: []
            }

        }

        touch.current.pointLength = length


        if ( length === 2 ) {
            // const distance = 
            const pointer0 = e.touches[0]
            const pointer1 = e.touches[1]

            const relativeX = pointer0.pageX - pointer1.pageX
            const relativeY = pointer0.pageY - pointer1.pageY

            const distance = relativeX * relativeX + relativeY * relativeY

            touch.current.distance = distance
            touch.current.startDistance = distance
        }

    }

    const handleTouchMove = e => {
        let { length } = e.touches
        for ( let i = 0; i < length; i++ ) {
            const data = e.touches[i]
            let { clientX, clientY, force, identifier, pageX, pageY, radiusX, radiusY, rotationAngle, screenX, screenY } = data
            touch.current[identifier] && touch.current[identifier].race.push(
                { clientX, clientY, rotationAngle, pageX, pageY }
            )
        }

        if ( length === 2 ) {
            const pointer0 = e.touches[0]
            const pointer1 = e.touches[1]

            const relativeX = pointer0.pageX - pointer1.pageX
            const relativeY = pointer0.pageY - pointer1.pageY

            const distance = relativeX * relativeX + relativeY * relativeY

            // const min = Math.min( distance, touch.current.distance )
            // const max = Math.max( distance, touch.current.distance )

            const dis = Math.sqrt( distance / touch.current.distance )
            touch.current.distance = distance
            modZoom( dis, Math.sqrt( distance ), touch.current.startDistance )



        } else if ( length === 1 ) {
            const pointer = e.touches[0]

            const { pageX, pageY } = pointer

            const { race } = touch.current[pointer.identifier]

            const length = race.length

            const prevPointer = race[length - 2] || touch.current[pointer.identifier]

            const translateWithStart = {
                x: pageX - touch.current[pointer.identifier].pageX,
                y: pageY - touch.current[pointer.identifier].pageY
            }

            const translate = {
                x: pageX - prevPointer.pageX,
                y: pageY - prevPointer.pageY
            }

            modPosition && modPosition( translate, translateWithStart )
        }


    }

    const handleTouchEnd = e => {
        if ( touch.current.pointLength === 2 ) {
        } else if ( touch.current.pointLength === 1 ) {
        }
    }
    return <div
        onTouchEnd={ handleTouchEnd }
        onTouchStart={ handleTouchStart }
        onTouchMove={ handleTouchMove }
        style={ {
            touchAction: 'none'
        } }>
        { children }
    </div>

}