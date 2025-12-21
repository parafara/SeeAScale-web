import { useEffect } from 'react';
import ArrowSymbol from '@assets/ArrowSymbol.svg?react'
import useThing from '@hooks/useThing';
import css from '@styles/Content.module.css';
import ControllPanel from '@components/ControllPanel';
import { API_SERVER_URL, prefixs } from '@utils/constant.jsx';

// 1. 데이터 불러와서 물체 표시
// 2. 좌우 이동
// 3. 접두어로 이동
// 4. 물체 등록
// 5. 새로고침

export default () => {
  const {current, data, init, moveRight, moveLeft} = useThing();

  useEffect(() => {init();}, [])
  
  return (
    <>
      <main className={css.main}>
        <button className={css.button} onClick={moveLeft}>
          <ArrowSymbol />
        </button>
        <div className={css.thingList}>
          {data.slice(current.item, current.item + 3).map((v, i)=>(<Thing key={i} thing={v} root={data[current.item + 2]} />))}
        </div>
        <button className={css.button} onClick={moveRight}>
          <ArrowSymbol style={{transform: 'scaleX(-1)'}} />
        </button>
      </main>
      <ControllPanel current={current.prefix} />
    </>
  )
}

const Thing = ({thing, root}) => {
  const grad = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const scale = (10 ** thing.prefix * Number(thing.quantity)) / (10 ** root.prefix * Number(root.quantity));
  console.log(scale);

  return (
    <div className={css.thing}>
      <img className={css.thingImage} src={`${API_SERVER_URL}/thing/${thing.thingId}/image`} alt='' style={{transform: `scale(${scale})`}} />
      <h3>{thing.title}</h3>
      <p>{`${thing.quantity} ${prefixs[thing.prefix + 10].prefix}m`}</p>
      <div className={css.grads}>
        {grad.map((v, i)=>(<div key={i} className={css.grad}></div>))}
      </div>
    </div>
  )
}