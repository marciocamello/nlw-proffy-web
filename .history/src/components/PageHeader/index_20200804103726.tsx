import React from 'react';

function PageHeader(){
  return (
    <header className="page-header">
    <div className="top-bar-container">
      <Link to="/">
        <img src={backIcon} alt="Voltar"/>
      </Link>
        <img src={logoImg} alt="Proffy"/>
    </div>

    <div className="header-content">
      <strong>Estes são os proffys disponíveis.</strong>
    </div>
  </header>
  );
}

export default PageHeader;