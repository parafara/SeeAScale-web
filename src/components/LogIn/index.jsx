import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Modal from '@components/Modal';
import sty from '@components/LogIn/LogIn.module.css';

export default function LogIn() {
    const navigate = useNavigate();
    const {logIn} = useOutletContext();
    const [isFetching, setIsFetching] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [emailInput, passwordInput, submitButton] = [useRef(), useRef(), useRef()];

    const emailInputHandler = (e) => {
        setEmailValue(e.target.value);
    }

    const passwordInputHandler = (e) => {
        setPasswordValue(e.target.value);
    }
    const submitForm = (e) => {
        e.preventDefault();
        setIsFetching(true);
        logIn(emailValue, passwordValue)
        .then((e) => {
            const status = e?.response?.status;
            const name = e?.name;
            if (status === 422) {
                setPasswordValue('');
                emailInput.current.focus();
                alert('이메일 주소나 비밀번호 양식이 올바르지 않습니다. 다시 입력해주세요.\n(비밀번호: 영어 대소문자, 숫자, 특수문자 !@#$_.?-, 8자리 이상');
            }
            else if (status === 401) {
                if (e.response.data.detail === 'UNREGISTERED') {
                    emailInput.current.focus();
                    alert('등록된 사용자가 아닙니다. 이메일 주소를 다시 입력하시거나, 회원가입 후 이용하여 주세요.');
                }
                else if (e.response.data.detail === 'INCORRECT_PASSWORD') {
                    setPasswordValue('');
                    passwordInput.current.focus();
                    alert('올바르지 않은 비밀번호입니다. 다시 입력해주세요.');
                }
            }
            else if (name !== null) {
                alert(`환영합니다, ${name}님`);
                navigate('/');
            }
        })
        .finally(() => {
            setIsFetching(false);
        });
    };

    return (
        <Modal onClose={() => navigate('/')}>
            <form className={sty.form} onSubmit={submitForm}>
                <h1 className={sty.title}>로그인</h1>
                <input 
                    className={sty.input}
                    ref={emailInput}
                    type="email"
                    value={emailValue}
                    placeholder="이메일"
                    onChange={emailInputHandler}
                    autoFocus
                    required 
                />
                <input 
                    className={sty.input}
                    ref={passwordInput}
                    type="password"
                    value={passwordValue}
                    placeholder="비밀번호"
                    onChange={passwordInputHandler}
                    required 
                />
                <button ref={submitButton} className={sty.login} type="submit">{isFetching ? "로그인 중..." : "로그인"}</button>
                <Link className={sty.signup} to='/preregister'>회원가입</Link>
            </form>
        </Modal>
    )
}