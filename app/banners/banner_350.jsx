'use client'
import { useEffect, useRef } from 'react'

export default function Banner_350() {
    const banner = useRef()
 
    const atOptions = {
		'key' : 'a59c437c48f4df693a242422f8e20600',
		'format' : 'iframe',
		'height' : 50,
		'width' : 350,
		'params' : {}
    }
    useEffect(() => {
    if (banner.current && !banner.current.firstChild) {
        const conf = document.createElement('script')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `//highperformanceformat.com${atOptions.key}/invoke.js`
        conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`

        banner.current.append(conf)
        banner.current.append(script)
    }
}, [banner])

    return <div className="mx-2 my-5 w-fit flex justify-center items-center text-white text-center" ref={banner}></div>
}