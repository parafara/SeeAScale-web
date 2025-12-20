import { useEffect } from 'react';
import { useNavigate, useOutletContext, useSearchParams } from 'react-router-dom';
import Modal from '@components/Modal';

export default () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {fetchSignUp} = useOutletContext();
  const pretoken = searchParams.get('pretoken');
  
  useEffect(() => {
    fetchSignUp(pretoken)
    .then((response) => {
      const status = response.status;
      const detail = response?.detail;
      const name = response?.name;
      if (status === 201) {
        alert(`회원가입 되었습니다.\n환영합니다, ${name}님`);
        navigate('/');
      }
      else if (status === 401 && detail === 'EXPIRED_TOKEN') {
        alert('토큰이 만료되었습니다. 다시 시도해주세요');
        navigate('/prergister');
      }
      else if (status === 401 && detail === 'INVALID_TOKEN') {
        alert('유효하지 않은 회원가입 토큰입니다.');
        navigate('/');
      }
      else if (status === 409 && detail === 'ALREADY_REGISTERED') {
        alert('이미 회원가입 된 상태입니다. 로그인해주세요.');
        navigate('/login');
      }
      else {
        alert('회원가입 시도 중 문제가 발생했습니다.');
        navigate('/preregister');
      }
    })
  }, [])
  

  return (
    <Modal>
      <div style={{padding: '1rem 2rem'}}>
        <h1 style={{fontWeight: 600}}>회원가입 중...</h1>
      </div>
    </Modal>
  )
}