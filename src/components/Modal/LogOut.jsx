import { useState, useRef } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Modal from '@components/Modal';
import sty from '@styles/LogOut.module.css';

export default function LogIn() {
  const navigate = useNavigate();
  const {fetchLogOut} = useOutletContext();
  const [isFetching, setIsFetching] = useState(false);

  const submit = () => {
    setIsFetching(true);
    fetchLogOut()
    .then((response) => {
      const status = response.status;
      if (status === 204) {
        alert('로그아웃 되었습니다.');
        navigate('/');
      }
      else {
        alert("로그아웃 요청 중 문제가 발생하였습니다.");
      }
    })
    .finally(() => {
      setIsFetching(false);
    });
  }

  return (
    <Modal>
      <div className={sty.contentWrapper}>
        <h1>{isFetching ? '로그아웃하는 중...' : '로그아웃하겠습니까?'}</h1>
        {
          isFetching ? null : (
            <div className={sty.buttonWrapper}>
              <button className={`${sty.button} ${sty.confirmButton}`} onClick={submit}>확인</button>
              <button className={`${sty.button} ${sty.cancelButton}`} onClick={() => navigate('/')}>취소</button>
            </div>
          )
        }
      </div>
    </Modal>
  )
}