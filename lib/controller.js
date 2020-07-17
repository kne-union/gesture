export default ( props, data ) => {
    const { onTap, onPress, onTouchStart, onTouchMove, onZoom } = props
    
    const handleTouchStart = e => {
        e.persist()
    
        data = {}
    
        let { length } = e.touches
    
        for ( let i = 0; i < length; i++ ) {
            const pointer = e.touches[i]
    
            data[pointer.identifier] = {
                startX: pointer.screenX,
                startY: pointer.screenY,
                pageX: pointer.pageX,
                pageY: pointer.pageY,
                race: []
            }
        }
        data.pointLength = length
        data.initSign = Date.now()
        data.initStart = e
    
        onTouchStart && onTouchStart( e )
        
        if ( length === 2 ) {
            // const distance = 
            const pointer0 = e.touches[0]
            const pointer1 = e.touches[1]
    
            const relativeX = pointer0.pageX - pointer1.pageX
            const relativeY = pointer0.pageY - pointer1.pageY
    
            const distance = relativeX * relativeX + relativeY * relativeY
    
            data.distance = distance
            data.startDistance = distance
        }
    
    }
    
    const handleTouchMove = e => {
            console.log(data)

        let { length } = e.touches
        for ( let i = 0; i < length; i++ ) {
            const pointer = e.touches[i]
            let { clientX, clientY, force, identifier, pageX, pageY, radiusX, radiusY, rotationAngle, screenX, screenY } = pointer
            data[identifier] && data[identifier].race.push(
                { clientX, clientY, rotationAngle, pageX, pageY, initSign: Date.now(), }
            )
        }
    
        if ( length === 2 ) {
            const pointer0 = e.touches[0]
            const pointer1 = e.touches[1]
    
            const relativeX = pointer0.pageX - pointer1.pageX
            const relativeY = pointer0.pageY - pointer1.pageY
    
            const distance = relativeX * relativeX + relativeY * relativeY
    
            // const min = Math.min( distance, data.distance )
            // const max = Math.max( distance, data.distance )
    
            const dis = Math.sqrt( distance / data.distance )
            data.distance = distance
            onZoom && onZoom( dis, Math.sqrt( distance ), data.startDistance )
    
    
    
        } else if ( length === 1 ) {
            const pointer = e.touches[0]
    
            const { pageX, pageY } = pointer
            
            const { race } = data[pointer.identifier]
    
            const length = race.length
    
            const prevPointer = race[length - 2] || data[pointer.identifier]
    
            const translateWithStart = {
                x: pageX - data[pointer.identifier].pageX,
                y: pageY - data[pointer.identifier].pageY
            }
    
            const translate = {
                x: pageX - prevPointer.pageX,
                y: pageY - prevPointer.pageY
            }
    
            onTouchMove && onTouchMove( translate, translateWithStart )
        }
    }
    
    const handleTouchEnd = e => {
        if ( data.pointLength === 2 ) {
    
        } else if ( data.pointLength === 1 ) {
            const now = Date.now()
            
            now - data.initSign > 300 ? onPress && onPress( data.initStart ) : onTap && onTap( data.initStart )
        }
    
        let { changedTouches } = e
        
        for ( let i = 0; i < changedTouches.length; i++ ){
            delete data[changedTouches[i].identifier]
        }
        
    }


    return {
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd
    }
};