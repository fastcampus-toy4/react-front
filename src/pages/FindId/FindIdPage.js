import React from 'react';
import FindIdForm from './FindIdForm';
import './FindIdPage.css';

function FindIdPage() {
  return (
    // 이 컨테이너 덕분에 아이디 찾기 폼이 화면 중앙에 위치하게 됩니다.
    <div className="find-id-page-container">
      <FindIdForm />
    </div>
  );
}

export default FindIdPage;
