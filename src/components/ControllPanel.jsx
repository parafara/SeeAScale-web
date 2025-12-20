import PlusSymbol from "@assets/PlusSymbol.svg?react"
import RefreshSymbol from "@assets/RefreshSymbol.svg?react"
import css from '@styles/ControllPanel.module.css';

export default () => {
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
    <div className={css.controllPanel}>
      <div className={css.prefixList}>
        {prefixs.map((v, i)=>(
          <button className={css.prefix} key={i}>
            <h3>{v.title}</h3>
            <p>{v.name}</p>
          </button>
        ))}
      </div>
      <div className={css.buttonList}>
        <button className={css.button}><PlusSymbol /></button>
        <button className={css.button}><RefreshSymbol /></button>
      </div>
    </div>
  )
}