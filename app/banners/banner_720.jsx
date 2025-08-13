'use client'
import { useEffect, useRef } from 'react'

export default function Banner_750() {
    const banner = useRef()
 
    const atOptions = {
		'key' : 'e09e17f16bdd134ff7ced0e61914e802',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
    }
    useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//www.highperformanceformat.com/${atOptions.key}/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        banner.current.append(conf)
        banner.current.append(script)
    }
}, [banner])

    return <div className="mx-2 my-5 w-fit flex justify-center items-center text-white text-center" ref={banner}></div>
}