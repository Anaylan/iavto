export interface IMessageModel {
  message: string;
  companion: string;
  date: string;
  MeSend: boolean;
}

export interface IDialogModel {
  cid: number;
  company_img: string;
  company_name: string;
  hash: string;
  dialogId: number;
  message: string;
  new_msg?: number;
}
