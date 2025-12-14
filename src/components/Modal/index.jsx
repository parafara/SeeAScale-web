import CloseIcon from '@assets/CrossSymbol.svg?react';
import sty from '@components/Modal/Modal.module.css';

export default function Modal({onClose, children}) {
    return (
        <div className={sty.background}>
            <div className={sty.modal}>
                <div className={sty.closeBar}>
                    <button className={sty.closeButton} onClick={onClose}>
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