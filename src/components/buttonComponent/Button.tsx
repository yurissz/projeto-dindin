import React, { ButtonHTMLAttributes } from 'react';
import './button.css'

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({ onClick, children, style, type }) => {
  return (
    <button className="customButton" onClick={onClick} style={style} type={type}>
      {children}
    </button>
  )
}

export default Button;
