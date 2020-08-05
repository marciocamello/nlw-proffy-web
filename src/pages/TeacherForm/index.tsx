import React, {FormEvent, useState} from 'react';
import Input from '../../components/Input';

import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Select from '../../components/Select';
import { createClasses } from '../../services/classes';
import { useHistory } from 'react-router-dom';

function TeacherForm() {

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    email: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    embed: '',
    cost: ''
  });

  const [scheduleItems, setScheduleItems] = useState([
    {week_day: 0, from: '', to: ''}
  ]);

  // add new schedule item
  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {week_day: 0, from: '', to: ''}
    ])
  }

  // change value on teacher form state
  const handleOnChangeTeacherForm = (key: any, value: any) => {
    setTeacherForm({ ...teacherForm, [key]: value });
  };

  // create class on API
  function handleCreateClass(e: FormEvent){
    e.preventDefault();

    setLoading(true);

    createClasses({
      ...teacherForm,
      schedule: scheduleItems
    }).then(({data}) => {

      setLoading(false);
      alert(data.message);

      history.push('/');
      
    }).catch(({data}) => {

      setLoading(false);
      alert(data.message);
    });
  }

  // set schedule item
  function setScheduleItemValue(position: number, field: string, value: string){
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value};
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  // remove schedule item
  function removeScheduleItemValue(position: number) {
    const updatedScheduleItems = scheduleItems.filter((scheduleItem, index) => index !== position);

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que voce quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input 
              name="name" 
              label="Nome completo" 
              value={teacherForm.name} 
              required
              onChange={e => handleOnChangeTeacherForm('name', e.target.value)}
            />

            <Input 
              name="email" 
              label="Email" 
              value={teacherForm.email} 
              type="email"
              required
              onChange={e => handleOnChangeTeacherForm('email', e.target.value)}
            />

            <Input 
              name="avatar" 
              label="Avatar" 
              required
              value={teacherForm.avatar} 
              onChange={e => handleOnChangeTeacherForm('avatar', e.target.value)}
            />

            <Input 
              name="whatsapp" 
              label="WhatsApp" 
              required
              value={teacherForm.whatsapp} 
              onChange={e => handleOnChangeTeacherForm('whatsapp', e.target.value)}
            />

            <Textarea 
              name="bio" 
              label="Biografia" 
              required
              value={teacherForm.bio} 
              onChange={e => handleOnChangeTeacherForm('bio', e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            
            <Select 
              name="subject" 
              label="Matéria"
              required
              defaultValue={teacherForm.subject} 
              onChange={e => handleOnChangeTeacherForm('subject', e.target.value)}
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

            <Textarea 
              name="embed" 
              label="Video da sua aula" 
              value={teacherForm.embed} 
              onChange={e => handleOnChangeTeacherForm('embed', e.target.value)}
            />

            <Input 
              name="cost" 
              label="Custo da sua hora por aula" 
              required
              value={teacherForm.cost} 
              type="number"
              min="1"
              onChange={e => handleOnChangeTeacherForm('cost', e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

              {scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={index} className="schedule-item">
                    <Select 
                      name="week_day" 
                      label="Dia da semana"
                      required
                      defaultValue={scheduleItem.week_day}
                      onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                      name="from" 
                      label="Das" 
                      type="time"
                      required
                      value={scheduleItem.from}
                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                    />

                    <Input 
                      name="to" 
                      label="Até" 
                      type="time"
                      required
                      value={scheduleItem.to}
                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                    />

                    {index > 0 && (
                      <button type="button" onClick={e => removeScheduleItemValue(index)}>
                        x
                      </button>
                    )}
                  </div>
                )
              })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit" disabled={loading}>
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;