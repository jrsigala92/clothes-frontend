import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormErrorsService {

  errors = {
    required: 'Este campo es requerido',
    email : 'No es un correo valido',
    password : 'La contrase;a debe tener minimo 8 caracteres',
    minLength: 'El texto debe tener minimo 6 caracteres'
  }

  constructor() { }
  getErrorMessage(controlName){
    return this.errors[controlName];
  }
}
