import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '@hooks/useUser';
import Modal from '@components/Modal';
import sty from '@components/LogIn/LogIn.module.css';

const ERROR_MESSAGES = {
    INVALID_INPUT: '잘못된 이메일 혹은 비밀번호 양식입니다.',
    UNREGISTERED: '등록되지 않은 메일 주소입니다.',
    INCORRECT_PASSWORD: '비밀번호가 잘못되었습니다.',
    UNKNOWN_ERROR: '로그인 중 오류가 발생했습니다.'
};

export default function LogIn() {
    const navigate = useNavigate();
    const { logIn } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const handleInputChange = useCallback((setter) => (e) => setter(e.target.value), []);
    
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await logIn(email, password);
            
            if (result.success) {
                navigate('/');
                return;
            }

            const { errorCode } = result;
            const message = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.UNKNOWN_ERROR;
            alert(message);

            // 에러 타입별 입력 필드 초기화 및 포커스
            if (errorCode === 'UNREGISTERED') {
                setEmail('');
                setPassword('');
                emailInputRef.current?.focus();
            } else if (errorCode === 'INCORRECT_PASSWORD') {
                setPassword('');
                passwordInputRef.current?.focus();
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <Modal onClose={() => navigate('/')}>
            <form onSubmit={handleSubmit}>
                <h1 className={sty.title}>로그인</h1>
                <div className={sty.inputList}>
                    <input 
                        ref={emailInputRef}
                        className={sty.input} 
                        type="email" 
                        value={email} 
                        onChange={handleInputChange(setEmail)} 
                        placeholder="이메일" 
                        disabled={isLoading}
                        required
                    />
                    <input 
                        ref={passwordInputRef}
                        className={sty.input} 
                        type="password" 
                        value={password} 
                        onChange={handleInputChange(setPassword)} 
                        placeholder="비밀번호" 
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className={sty.buttonBox}>
                    <button 
                        className={sty.signup} 
                        tabIndex={-1} 
                        onClick={() => navigate('/preregister')}
                        disabled={isLoading}
                        type="button"
                    >
                        회원가입
                    </button>
                    <button 
                        className={sty.login} 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? '로그인 중...' : '로그인'}
                    </button>
                </div>
            </form>
        </Modal>
    )
}