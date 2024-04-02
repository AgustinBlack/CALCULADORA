import clases from './Calculator.module.css'
import Buttons from '../Buttons/Buttons'
import backspace from '../../assets/backspace.png'
import { useState } from 'react'

const Calculator = () => {
    const [data, setData] = useState({ operacion:'', resultado: '' })

    const escritura = (e) => {
        const valor = e.target.innerText
        const esOperacion = valor === '+' || valor === '-' || valor === '*' || valor === '/' || valor === '%'

        // if (data.operacion.length >= 8) return

        if (valor === '+/-' && data.operacion === '') return

        if (valor === '%' && data.operacion.includes('%')) return

        if(data.operacion.includes('Error')) {
            setData({...data, operacion: valor})
        } else if (data.resultado !== '' && data.operacion === '' && esOperacion) {
            setData({...data, operacion: `${data.resultado}` + valor})
        } else if (valor === '+/-' && data.operacion !== '') {
            if (data.operacion.slice(0, 1) === '-') {
                setData({...data, operacion: `${data.operacion.slice(1, data.operacion.length)}`})
            } else {
                setData({...data, operacion: `-${data.operacion}`})
            }
        } else {
            setData({...data, operacion: `${data.operacion}` + valor})
        }
    }

    const handleClear = () => {
        setData({operacion: '', resultado: ''})
    }

    const handleBack = (i) => {
        const { operacion } = data
        const uodatedOperation = operacion.slice(0, -1)
        setData({ operacion: uodatedOperation })
    }

    const resultado = () => {
        try {
            let resultado = ''
            if (data.operacion.includes('%')) {
                const valores = data.operacion.split('%')
                resultado = eval(`${valores[1]}*(${valores[0]}/100)`)
            } else {
                resultado = eval(data.operacion)
            }
            setData({...data, resultado, operacion: ''})
        } catch {
            setData({...data, operacion: 'Error'})
        }
    }

    return (
        <main className={clases.main}>
            <span className={clases.result}>{data.resultado}</span>
            <span className={clases.display}>{data.operacion}</span>

            <Buttons texto='C' clase='gris' handleClick={handleClear}/>
            <Buttons texto='+/-' clase='gris' handleClick={escritura} />
            <Buttons texto='%' clase='gris' handleClick={escritura} />
            <Buttons texto='/' clase='simbolo' handleClick={escritura}/>
            <Buttons texto='7' clase='num' handleClick={escritura}/>
            <Buttons texto='8' clase='num' handleClick={escritura}/>
            <Buttons texto='9' clase='num' handleClick={escritura}/>
            <Buttons texto='*' clase='simbolo' handleClick={escritura}/>
            <Buttons texto='4' clase='num' handleClick={escritura}/>
            <Buttons texto='5' clase='num' handleClick={escritura}/>
            <Buttons texto='6' clase='num' handleClick={escritura}/>
            <Buttons texto='-' clase='simbolo' handleClick={escritura}/>
            <Buttons texto='1' clase='num' handleClick={escritura}/>
            <Buttons texto='2' clase='num' handleClick={escritura}/>
            <Buttons texto='3' clase='num' handleClick={escritura}/>
            <Buttons texto='+' clase='simbolo' handleClick={escritura}/>
            <Buttons texto='.' clase='gris' handleClick={escritura} />
            <Buttons texto='0' clase='num' handleClick={escritura}/>
            <Buttons texto='<' clase='gris' handleClick={handleBack} />
            <Buttons texto='=' clase='simbolo' handleClick={resultado}/>
        </main>
    )
}

export default Calculator