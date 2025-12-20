import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Modal from '@components/Modal';
import sty from '@styles/Preregister.module.css';

export default function Preregister() {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const nameRegex = /^[가-힣A-Za-z0-9_]{1,32}$/;
  const passwordRegex = /^[A-Za-z0-9!@#$_.?-]{8,}$/;
  const {fetchPreregister} = useOutletContext();
  const [isFetching, setIsFetching] = useState(false);
  const [isPreregistered, setIsPreregistered] = useState(false);
  
  const [emailValue, setEmailValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [recheckValue, setRecheckValue] = useState('');

  const isEmailValid = () => emailRegex.test(emailValue);
  const isNameValid = () => nameRegex.test(nameValue);
  const isPasswordValid = () => passwordRegex.test(passwordValue);
  const isRecheckValid = () => passwordValue === recheckValue;

  const [leftTime, setLeftTime] = useState(60 * 10);

  const submitForm = (e) => {
    e.preventDefault();
    const emailTemp = emailValue;
    if (!isEmailValid() || !isNameValid() || !isPasswordValid() || !isRecheckValid()) return;
    if (isFetching) return;
    setIsFetching(true);
    fetchPreregister(emailValue, nameValue, recheckValue)
    .then((response)=>{
      const status = response.status;
      const detail = response.detail;
      if (status === 200) {
        setIsPreregistered(true);
        setEmailValue(emailTemp);
      }
      else if (status === 409 && detail) {
        alert('이미 등록된 이메일입니다.');
      }
      else {
        alert('회원가입 요청 중 문제가 발생하였습니다.');
      }
    })
    .finally(() => setIsFetching(false));
  }

  return (
    <Modal>
      <form className={sty.form} onSubmit={submitForm}>
        <h1 className={sty.title}>회원가입</h1>
        {
          (isPreregistered)
          ?
          <Timer email={emailValue} />
          :
          (
            <>
              <input
                className={`${sty.input} ${emailValue && (isEmailValid() ? sty.validInput : sty.invalidInput)}`}
                type="email" value={emailValue} onChange={e => setEmailValue(e.target.value)} placeholder='이메일'
              />
              <input
                className={`${sty.input} ${nameValue && (isNameValid() ? sty.validInput : sty.invalidInput)}`}
                type="text" value={nameValue} onChange={e => setNameValue(e.target.value)} placeholder='사용자명'
              />
              <input
                className={`${sty.input} ${passwordValue && (isPasswordValid() ? sty.validInput : sty.invalidInput)}`}
                type="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)} placeholder='비밀번호'
              />
              <input
                className={`${sty.input} ${recheckValue && (isRecheckValid() ? sty.validInput : sty.invalidInput)}`}
                type="password" value={recheckValue} onChange={e => setRecheckValue(e.target.value)} placeholder='비밀번호 확인'
              />
              <button 
                className={
                  `${sty.submitButton} ${
                    (emailValue || passwordValue) && (
                      (isEmailValid() && isNameValid() && isPasswordValid() && isRecheckValid()) ?
                      sty.validsubmitButton : sty.invalidsubmitButton
                    )
                  }`
                }
                type="submit"
              >
                {isFetching ? "회원가입 중..." : "회원가입"}
              </button>
            </>
          )
        }
      </form>
    </Modal>
  )
}

const Timer = ({email}) => {
  const INITIAL_SECONDS = 10 * 60; // 10분
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;

    const intervalId = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  return (
    <>
      <p className={sty.timerContent}>{`'${email}’ (으)로 회원가입용 이메일을 발송했습니다.`}</p>
      <p className={sty.timer}>
        <span className={seconds > 0 ? sty.timerHighlight : sty.timerExpired}>
          {seconds > 0 ? formatTime(seconds) : '만료됨'}
        </span>
        {seconds > 0 ? ' 후 만료' : null}
      </p>
    </>
  );
};
