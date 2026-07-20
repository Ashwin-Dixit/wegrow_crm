import style from './Loader.module.css'
const Loader = () => {
    return (
        <div className={`${style.loader} `}>
            <div className={`${style.loaderSquare} bg-black`}></div>
            <div className={`${style.loaderSquare} bg-black`}></div>
            <div className={`${style.loaderSquare} bg-[#21467a]`}></div>
            <div className={`${style.loaderSquare} bg-black`}></div>
            <div className={`${style.loaderSquare} bg-black`}></div>
            <div className={`${style.loaderSquare} bg-black`}></div>
            <div className={`${style.loaderSquare} bg-black`}></div>
        </div>
    )
}

export default Loader