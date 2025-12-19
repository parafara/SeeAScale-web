import { useState, useRef } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Modal from '@components/Modal';
import sty from '@styles/LogIn.module.css';

export default function LogIn() {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordRegex = /^[A-Za-z0-9!@#$_.?-]{8,}$/;
  const navigate = useNavigate();
  const {fetchLogIn} = useOutletContext();
  const [isFetching, setIsFetching] = useState(false);
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const [emailInput, passwordInput] = [useRef(), useRef()];
  
  const emailInputHandler = (e) => setEmailValue(e.target.value);
  const passwordInputHandler = (e) => setPasswordValue(e.target.value);

  const isEmailValid = () => emailRegex.test(emailValue);
  const isPasswordValid = () => passwordRegex.test(passwordValue);
  
  const submitForm = (e) => {
    e.preventDefault();
    
    if (!isEmailValid() || !isPasswordValid()) return;
    if (isFetching) return;
    setIsFetching(true);
    
    fetchLogIn(emailValue, passwordValue)
    .then((response) => {
      const status = response.status;
      const name = response?.name;
      const detail = response?.detail;
      if (status === 200) {
        alert(`환영합니다, ${name}님`);
        navigate('/');
      }
      else if (status === 401 && detail === 'UNREGISTERED') {
        emailInput.current.focus();
        alert('등록된 사용자가 아닙니다. 이메일 주소를 다시 입력하시거나, 회원가입 후 이용하여 주세요.');
      }
      else if (status === 401 && detail === 'INCORRECT_PASSWORD') {
        setPasswordValue('');
        passwordInput.current.focus();
        alert('올바르지 않은 비밀번호입니다. 다시 입력해주세요.');
      }
      else {
        alert('로그인 요청 중 문제가 발생하였습니다.');
      }
    })
    .finally(() => setIsFetching(false));
  };

  return (
    <Modal>
      <form className={sty.form} onSubmit={submitForm}>
        <h1 className={sty.title}>로그인</h1>
        <input 
          className={`${sty.input} ${emailValue && (isEmailValid() ? sty.validInput : sty.invalidInput)}`}
          ref={emailInput}
          type="email" value={emailValue ?? ''} onChange={emailInputHandler} placeholder="이메일"
          autoFocus required 
        />
        <input 
          className={`${sty.input} ${passwordValue && (isPasswordValid() ? sty.validInput : sty.invalidInput)}`}
          ref={passwordInput}
          type="password" value={passwordValue ?? ''} onChange={passwordInputHandler} placeholder="비밀번호"
          required 
        />
        <button className={
          `${sty.submitButton} ${(emailValue || passwordValue) && (isEmailValid() && isPasswordValid() ? sty.validsubmitButton : sty.invalidsubmitButton)}`
        } 
        type="submit">
          {isFetching ? "로그인 중..." : "로그인"}
        </button>
        <Link className={sty.signUpButton} to='/preregister'>회원가입</Link>
      </form>
    </Modal>
  )
}