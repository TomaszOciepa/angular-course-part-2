import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { postcodeValidator } from './postcode.validator';

export class ClientValidators {
  static postcode(): ValidatorFn {
    return postcodeValidator();
  }
}
