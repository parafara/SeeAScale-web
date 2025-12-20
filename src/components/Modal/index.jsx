import { useNavigate } from 'react-router-dom';
import CloseIcon from '@assets/CrossSymbol.svg?react';
import sty from '@styles/Modal.module.css';

export default function Modal({children, onCanceled}) {
  const navigate = useNavigate();
  
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
        {children}
      </div>
    </div>
  )
}

import LogInComponent from '@components/Modal/LogIn';
import LogOutComponent from '@components/Modal/LogOut';
import PreregisterComponent from '@components/Modal/Preregister';
import SignUpComponent from '@components/Modal/SignUp';

export const LogIn = LogInComponent;
export const LogOut = LogOutComponent;
export const Preregister = PreregisterComponent;
export const SignUp = SignUpComponent;