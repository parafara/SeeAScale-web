import { useState, useRef } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import Modal from '@components/Modal';
import sty from '@components/LogIn/LogIn.module.css';

export default function LogIn() {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^[A-Za-z0-9!@#$_.?-]{8,}$/;
    const navigate = useNavigate();
    const {fetchLogIn} = useOutletContext();
    const [isFetching, setIsFetching] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [validEmail, setValidEmail, validPassword, setValidPassword] = [...useState(null), ...useState(null)];
    const [emailInput, passwordInput, submitButton] = [useRef(), useRef(), useRef()];
    
    const emailInputHandler = (e) => {
        const value = e.target.value;
        setValidEmail(emailRegex.test(value));
        setEmailValue(value);
    }

    const passwordInputHandler = (e) => {
        const value = e.target.value;
        setValidPassword(passwordRegex.test(value));
        setPasswordValue(value);
    }
    
    const submitForm = (e) => {
        e.preventDefault();
        console.log(validEmail);
        
        if (!validEmail || !validPassword ) {
            alert('이메일 주소나 비밀번호 양식이 올바르지 않습니다. 다시 입력해주세요.\n(비밀번호: 영어 대소문자, 숫자, 특수문자 !@#$_.?-, 8자리 이상');
            return;
        }
        if (isFetching) return;
        setIsFetching(true);
        
        fetchLogIn(emailValue, passwordValue)
        .then((response) => {
            const status = response?.status;
            const name = response?.data.name;
            if (status === 200) {
                alert(`환영합니다, ${name}님`);
                navigate('/');
            }
            else if (status === 401 && response.data.detail === 'UNREGISTERED') {
                emailInput.current.focus();
                alert('등록된 사용자가 아닙니다. 이메일 주소를 다시 입력하시거나, 회원가입 후 이용하여 주세요.');
            }
            else if (status === 401 && response.data.detail === 'INCORRECT_PASSWORD') {
                setPasswordValue('');
                passwordInput.current.focus();
                alert('올바르지 않은 비밀번호입니다. 다시 입력해주세요.');
            }
            else {
                alert('로그인 요청 중 문제가 발생하였습니다.');
            }
        })
        .finally(() => {
            setIsFetching(false);
        });
    };

    return (
        <Modal>
            <form className={sty.form} onSubmit={submitForm}>
                <h1 className={sty.title}>로그인</h1>
                <input 
                    className={`${
                        sty.input
                    } ${
                        validEmail === null ? null : (validEmail ? sty.validInput : sty.invalidInput)
                    }`}
                    ref={emailInput}
                    type="email"
                    value={emailValue}
                    placeholder="이메일"
                    onChange={emailInputHandler}
                    autoFocus
                    required 
                />
                <input 
                    className={`${
                        sty.input
                    } ${
                        validPassword === null ? null : (validPassword ? sty.validInput : sty.invalidInput)
                    }`}
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