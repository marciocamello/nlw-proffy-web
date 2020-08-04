import React from 'react';

import PageHeader from '../../components/PageHeader';

import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject"/>
          </div>

          <div className="input-block">
            <label htmlFor="week_day">Dia da semana</label>
            <input type="text" id="week_day"/>
          </div>

          <div className="input-block">
            <label htmlFor="time">Hora</label>
            <input type="text" id="time"/>
          </div>
        </form>
      </PageHeader>

      <main>
        <article className="teacher-item">
          <header>
            <img src="https://avatars1.githubusercontent.com/u/4071580?s=460&u=a4c7ef937ff842afd94b05821fc0cd84225c99c0&v=4" alt="Marcio Camellor"/>
            <div>
              <strong>Marcio Camello</strong>
              <span>Química</span>
            </div>
          </header>
          <p>
          Entusiasta das melhores tecnologias de química avançada.
          <br/>
          Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
          </p>

          <footer>
            <p>
              Preço/hora
              <strong>R$ 80,00</strong>
            </p>
            <button type="button">
              <img src={whatsappIcon} alt="Entrar em contato"/>
            </button>
          </footer>
        </article>
      </main>
    </div>
  )
}

export default TeacherList;