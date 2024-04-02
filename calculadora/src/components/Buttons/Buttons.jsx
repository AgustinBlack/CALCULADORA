import clases from './Buttons.module.css'

const Buttons = (params) => {
    const { texto, clase, handleClick, handleClear, handleBack } = params

    return (
        <button className={clases[clase]} onClick={handleClick}>{texto}</button>
    )
}

export default Buttons