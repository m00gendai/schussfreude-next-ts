export interface isFocus {
  name: boolean;
  mail: boolean;
  subject: boolean;
  message: boolean;
}

export interface isFormValue {
  name: string;
  mail: string;
  subject: string;
  message: string;
}

export interface isFormValid {
  name: boolean;
  mail: boolean;
  subject: boolean
  message: boolean;
}

export interface isFeedback {
  color: string;
  content: string;
}