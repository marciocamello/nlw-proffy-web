import React, {TextareaHTMLAttributes} from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({label, name, ...rest}) => {
  return(
    <div className="textarea-block">
      <label htmlFor={name}> {rest.required ? '*' : ''} {label}</label>
      <textarea id={name} {...rest}></textarea>
    </div>
  );
}

export default Textarea;