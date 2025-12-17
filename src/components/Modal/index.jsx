import { useNavigate } from 'react-router-dom';
import CloseIcon from '@assets/CrossSymbol.svg?react';
import sty from '@components/Modal/Modal.module.css';

export default function Modal({ onCanceled, children}) {
  const navigate = useNavigate()
  
  const CancleButtonHandler = onCanceled ?? (() => {
      navigate('/');
  });

  return (
    <div className={sty.background}>
      <div className={sty.modal}>
        <div className={sty.closeBar}>
          <button className={sty.closeButton} onClick={CancleButtonHandler}>
            <CloseIcon width={'1.25rem'} height={'1.25rem'}/>
          </button>
        </div>
        <div className={sty.content}>
          {children}
        </div>
      </div>
    </div>
  )
}