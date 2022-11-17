import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import { Mask } from 'react-text-mask';

export interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
  className?: string | undefined;
  mask?: Mask | ((value: string) => Mask);
  props?: InputHTMLAttributes<HTMLInputElement>;
}

export interface IForm extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode | undefined;
  props?: FormHTMLAttributes<HTMLFormElement>;
}

export interface IFormBody {
  children?: React.ReactNode | undefined;
  props?: FormHTMLAttributes<FormData>;
}

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | undefined;
  children: ReactNode;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface ITextArea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: ReactNode;
  className?: string | undefined;
  props?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export interface IFormInputCheckbox
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  children: ReactNode;
  props?: InputHTMLAttributes<HTMLInputElement>;
}
