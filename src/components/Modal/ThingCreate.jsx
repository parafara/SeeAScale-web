import Modal from '@components/Modal';
import { useState } from 'react';
import api from '@api/axios.jsx';
import { prefixs } from '@utils/constant';
import { useNavigate } from 'react-router-dom';
import sty from '@styles/ThingCreate.module.css';


export default () => {
  const [formData, setFormData] = useState({
    title: '',
    explanation: '',
    prefix: 0,
    quantity: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 텍스트 입력 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 이미지 파일 선택 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // 폼 제출 (multipart/form-data로 전송)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      setError('이미지를 선택해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // FormData 객체 생성
      const form = new FormData();
      
      // 텍스트 데이터 추가
      form.append('title', formData.title);
      form.append('explanation', formData.explanation);
      form.append('prefix', formData.prefix);
      form.append('quantity', formData.quantity);
      
      // 이미지 파일 추가
      form.append('imageFile', image);

      // multipart/form-data로 POST 요청
      // Content-Type은 자동으로 multipart/form-data로 설정됨
      const response = await api.post('/thing', form);
      
      console.log('성공:', response.data);
      
      // 성공 후 폼 초기화
      setFormData({
        title: '',
        explanation: '',
        prefix: 0,
        quantity: ''
      });
      setImage(null);
      
      // 모달 닫기 (필요시 부모 컴포넌트에서 처리)
    } catch (err) {
      setError(err.response?.data?.message || '업로드 실패');
      console.error('에러:', err);
    } finally {
      navigate('/')
      setLoading(false);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit} className={sty.form}>
          <input
            className={sty.input}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="물체이름"
            required
          />

          <input
            className={sty.input}
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="물리량"
            required
          />

          <select className={sty.input} name="prefix" value={formData.prefix} onChange={handleInputChange}>
            {prefixs.map((v, i)=>(<option key={i} value={i - 10}>{v.prefix}m</option>))}
          </select>

          <textarea
            className={sty.input}
            name="explanation"
            value={formData.explanation}
            onChange={handleInputChange}
            placeholder="설명"
            required
          />

          <input
            className={sty.input}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button className={sty.submitButton} type="submit" disabled={loading}>
          {loading ? '업로드 중...' : '등록'}
        </button>
      </form>
    </Modal>
  );
}