import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUser } from 'src/app/modules/core/models/user.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { FormsService } from 'src/app/modules/core/services/forms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup(
    {
      email: new FormControl('', {
        validators: [
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
        nonNullable: true,
      }),
      username: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      // hobbies: new FormArray([new FormControl('')]),
    },
    { updateOn: 'submit' },
  );

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formsService: FormsService,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }

  // get hobbies() {
  //   return this.registerForm.get('hobbies') as FormArray;
  // }

  // addControl() {
  //   this.hobbies.push(new FormControl(''));
  // }

  // removeControl(index: number) {
  //   this.hobbies.removeAt(index);
  // }

  ngOnInit(): void {
    // this.registerForm.controls.email.valueChanges.subscribe((text) => {
    //   console.log(text);
    // });
    console.log('');
    // this.registerForm.controls.email.hasError('email');
    // this.registerForm.controls.email.disable();
    // this.controls.username.addValidators(Validators.minLength(5));
    // this.controls.username.setValidators(Validators.minLength(5)); // addValidator() jest lepszy poniewa nie nadpisuje wcześniej doodanych walidatatorów

    // this.controls.username.setValue('test1');
    // this.registerForm.setValue({
    //   email: 'test@wk.pl',
    //   username: '',
    //   password: '',
    // });

    // this.registerForm.patchValue({
    //   email: 'test@wk.pl',
    // });
  }

  getErrorMessage(control: FormControl) {
    return this.formsService.getErrorMessage(control);
  }

  onRegister() {
    const userData: PostUser = this.registerForm.getRawValue();
    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/logowanie']);
      },
      error: (err) => {
        this.errorMessage = 'Wystąpił błąd.';
      },
    });
    // console.log(this.registerForm.value);
    // console.log(this.registerForm.getRawValue());
  }
}
