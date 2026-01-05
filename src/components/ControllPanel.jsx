import PlusSymbol from "@assets/PlusSymbol.svg?react"
import RefreshSymbol from "@assets/RefreshSymbol.svg?react"
import css from '@styles/ControllPanel.module.css';
import { prefixs } from "@utils/constant";


export default ({current}) => {
  console.log(current)
  
  return (
    <div className={css.controllPanel}>
      <div className={css.prefixList}>
        {prefixs.slice(current + 7, current + 14).map((v, i)=>(
          <button className={css.prefix} key={i}>
            <h3>{`${v.prefix}m (10^${v.exponent})`}</h3>
            <p>{`${v.name}미터`}</p>
          </button>
        ))}
      </div>
      <div className={css.buttonList}>
        <button className={css.button}><RefreshSymbol /></button>
        <button className={css.button}><PlusSymbol /></button>
      </div>
    </div>
  )
}