import React, { useState, useEffect, useRef } from 'react'

export const useFetch = ( url ) => {

    const isMounted = useRef(true)

    const [state, setState] = useState( { data: null, loading:true, error: null })

    console.log('entrando....')

    useEffect(() => {
        
        return () => {
            // al desmontar
            isMounted.current = false //esto no dispara una renderización del componente
        }
    }, [])

    useEffect(() => {

        setState({data: null, loading: true, error: null}) // al cambiar el estado el hook se vuelve a llamar

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {

                if (isMounted.current){
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }
                else {
                    console.log('Ya no hay referencia al componente')
                }
            })
            .catch( () => {
                setState({
                            data:null, 
                            loading:false, 
                            error: 'No se pudo cargar la info'
                        })
            })

    }, [url])

    return state
}
