import PlusSymbol from "@assets/symbols/PlusSymbol.svg?react"
import RefreshSymbol from "@assets/symbols/RefreshSymbol.svg?react"
import styles from "@components/ControllBox/ControllBox.module.css"

function ControllBox() {
    const prefixs = [
        {title: "mm (10³)", name: '미리미터'},
        {title: "cm (10⁻²)", name: '센티미터'},
        {title: "dm (10⁻¹)", name: '데시미터'},
        {title: "m (10⁰)", name: '미터'},
        {title: "dam (10¹)", name: '데카미터'},
        {title: "hm (10²)", name: '헥토미터'},
        {title: "km (10³)", name: '킬로미터'},
    ]
    
    return (
        <section className={styles.controllBox}>
            <nav className={styles.prefixWrap}>
                {prefixs.map((v, i)=>(
                    <button className={styles.prefix} key={i}>
                        <h6 className={styles.prefixTitle}>{v.title}</h6>
                        <p>{v.name}</p>
                    </button>
                ))}
            </nav>
            <div className={styles.buttonsWrap}>
                <button className={styles.button}>
                    <RefreshSymbol />
                </button>
                <button className={styles.button}>
                    <PlusSymbol />
                </button>
            </div>
        </section>
    )
}

export default ControllBox;