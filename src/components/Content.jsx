

import { useState } from 'react';
import ArrowSymbol from '@assets/ArrowSymbol.svg?react'
import useThing from '@hooks/useThing';
import css from '@styles/Content.module.css';
import ControllPanel from '@components/ControllPanel';
import { API_SERVER_URL } from '@utils/constant.jsx';

export default () => {
  const {prefix, things} = useThing();

  const dumy = [
    {title: "이규민", prefix: 0, quantity: 1.69, thingId: "RYrML4x7ybMBXG3DKOav"},
    {title: "이재준", prefix: 0, quantity: 1.78, thingId: "pbn7X1Ady5ZmloK3jvW0"},
    {title: "나무", prefix: 1, quantity: 1, thingId: "zpYx8le0B7YmqJ9a41Xo"},
  ]
  
  return (
    <>
      <main className={css.main}>
        <button className={css.button}>
          <ArrowSymbol />
        </button>
        <div className={css.thingList}>
          {dumy.map((v)=>(<Thing thing={v} />))}
        </div>
        <button className={css.button}>
          <ArrowSymbol style={{transform: 'scaleX(-1)'}} />
        </button>
      </main>
      <ControllPanel />
    </>
  )
}

const Thing = ({thing}) => {
  const grad = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  return (
    <div className={css.thing}>
      <img className={css.thingImage} src={`${API_SERVER_URL}/thing/${thing.thingId}/image`} />
      <h3>{thing.title}</h3>
      <p>{`${thing.quantity} ${thing.prefix}`}</p>
      <div className={css.grads}>
        {grad.map(()=>(<div className={css.grad}></div>))}
      </div>
    </div>
  )
}