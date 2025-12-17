import { useNavigate, useOutletContext } from 'react-router-dom';
import Modal from '@components/Modal';
import sty from '@components/LogOut/LogOut.module.css';
import { useState } from 'react';

function LogOut() {
  const navigate = useNavigate();
  const {fetchLogOut} = useOutletContext();
  const [isFetching, setIsFetching] = useState(false);
  
  const confirmHandler = (e) => {
    e.preventDefault();
    if (isFetching) return;
    setIsFetching(true);

    fetchLogOut()
    .then(() => {
      alert('로그아웃 되었습니다.');
      navigate('/');
    })
    .finally(()=>{
      setIsFetching(false);
    });
  };

  const cancelHandler = () => {
    navigate('/');
  };

  return (
    <Modal>
      <h1 className={sty.title}>{isFetching ? "로그아웃 중..." : "로그아웃 하시겠습니까?"}</h1>
      {
        isFetching ? null : (<div className={sty.buttonWrapper}>
          <button onClick={confirmHandler} className={sty.button}>확인</button>
          <button onClick={cancelHandler} className={sty.button}>취소</button>
        </div>)
      }
    </Modal>
  )
}

export default LogOut;