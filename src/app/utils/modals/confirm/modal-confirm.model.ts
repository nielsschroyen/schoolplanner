export interface ModalConfirmModel {
  title:String
  description:String
  confirmButton:String
}

export function createModalConfirmModel(title:String, description:String,  confirmButton?:String) :ModalConfirmModel{
  return {
    title:title,
    description:description,
    confirmButton: confirmButton ? confirmButton : "Ok"
  };
}

