import React from 'react';

export default () => {
    const touch = React.useRef( {} )

    return React.useMemo( () => {

        const target = new Proxy( touch, {
            get ( _touch, key ) {
                return _touch.current[key]
            },
            set ( _touch, key, val ) {
                return _touch.current[key] = val
            }
        } )

        return target;
    }, [] );
};