import React, { FormEvent, useState } from 'react';
import Input from '../../components/Input';

import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import TeacherItem, {Teacher} from '../../components/TeacherItem';

import searchIcon from '../../assets/images/icons/search.svg';

import { searchClasses } from '../../services/classes';

import './styles.css';

function TeacherList() {

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacherList, setTeacherList] = useState({
    subject: '',
    week_day: '',
    time: ''
  });

  // change value on teacher form state
  const handleOnChangeTeacherList = (key: any, value: any) => {
    setTeacherList({ ...teacherList, [key]: value });
  };

  // search teachers 
  function searchTeachers(e: FormEvent){
    e.preventDefault();

    setLoading(true);

    searchClasses(teacherList).then(response => {
      
      setLoading(false);
      setTeachers(response.data.data)
    }).catch(error => {

      setLoading(false);
      alert('Algum erro ocorreu')
    })
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
            name="subject" 
            label="Matéria"
            defaultValue={teacherList.subject} 
            onChange={e => handleOnChangeTeacherList('subject', e.target.value)}
            options={[
              { value: 'Artes', label: 'Artes'},
              { value: 'Biologia', label: 'Biologia'},
              { value: 'Ciências', label: 'Ciências'},
              { value: 'Educação física', label: 'Educação física'},
              { value: 'Física', label: 'Física'},
              { value: 'Geografia', label: 'Geografia'},
              { value: 'História', label: 'História'},
              { value: 'Matemática', label: 'Matemática'},
              { value: 'Português', label: 'Português'},
              { value: 'Química', label: 'Química'},
            ]}
          />
          
          <Select 
            name="week_day" 
            label="Dia da semana"
            defaultValue={teacherList.week_day} 
            onChange={e => handleOnChangeTeacherList('week_day', e.target.value)}
            options={[
              { value: '0', label: 'Domingo'},
              { value: '1', label: 'Segunda-feira'},
              { value: '2', label: 'Terça-feira'},
              { value: '3', label: 'Quarta-feira'},
              { value: '4', label: 'Quinta-feira'},
              { value: '5', label: 'Sexta-feira'},
              { value: '6', label: 'Sábado'},
            ]}
          />

          <Input 
            name="time" 
            label="Hora" 
            type="time"
            defaultValue={teacherList.time} 
            onChange={e => handleOnChangeTeacherList('time', e.target.value)}
          />

          <button type="submit" disabled={loading}>
            <img src={searchIcon} alt="Buscar"/>
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (<TeacherItem key={teacher.id} teacher={teacher}/> ))} 
      </main>
    </div>
  )
}

export default TeacherList;