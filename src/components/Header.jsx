import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@assets/VerticalLogo.svg?react';
import sty from '@styles/Header.module.css';

export default function Header({props: {username, fetchMyName}}) {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetchMyName().then(() => setLoading(false));
  }, [])
  
  return (
    <header className={sty.header}>
      <Link className={sty.logo} to='/'>
        <Logo />
      </Link>
      <Link className={sty.accountButton} to={loading ? null : (username === null ? '/login' : '/logout')}>
        {loading ? '로딩중...' : (username ?? '로그인')}
      </Link>
    </header>
  )
};
