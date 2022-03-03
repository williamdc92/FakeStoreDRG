import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthServiceService, SignUpFormInterface, LoginFormInterface, SuccessfulLogin } from '../../../service/AuthService/auth-service.service';
import { ToastController } from '@ionic/angular';
import { UserService} from 'src/app/service/UserService/user-service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  activatelogin: boolean = false;
  SignupForm: FormGroup;
  LoginForm: FormGroup;



  constructor(private router: Router, private storage: Storage, public formBuilder: FormBuilder, public service: AuthServiceService, public toastController: ToastController, public userService: UserService) {
    this.SignupForm = this.formBuilder.group({
      name: [, [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    })
    this.LoginForm = this.formBuilder.group({
      email: [, [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    })
  }




  async ngOnInit  () {
    await this.storage.create();
    this.Check();
  }

  SignUp = async () => {
    const Sform: SignUpFormInterface = this.SignupForm.value;
    try {
      const resultS: Response = await this.service.SignUp(Sform)
      console.log(resultS);
      const toast = await this.toastController.create({
        message: 'Success: ' + resultS,
        duration: 2000
      });
      toast.present();
      this.activatelogin = true;
    }
    catch (err) {
      console.log(err.error);
      const toast = await this.toastController.create({
        message: 'Error: ' + err.error,
        duration: 2000
      });
      toast.present();
    }
  }


  Login = async () => {
    const Lform: LoginFormInterface = this.LoginForm.value;
    try {
      const resultL: SuccessfulLogin = await this.service.LogIn(Lform) //SHOULD MAKE CONTROL BECAUSE HEROKU DELETE DATABASE EVERY DAY
      this.storage.set('email', resultL.email);
      this.storage.set('token', resultL.token);
      this.storage.set('id', resultL.id);
      const toast = await this.toastController.create({
        message: 'Welcome ' + resultL.email + "!",
        duration: 2000
      });
      this.userService.activeSessions = true;
      toast.present();

      this.SetValue(true);

    }
    catch (err) {
      const toast = await this.toastController.create({
        message: 'Error: ' + err.error,
        duration: 2000
      });
      toast.present();
    }
  }

  SetValue = async (value: boolean) => {
    await this.storage.set('logged', value);
    this.ngOnInit();
  }

  Check = async () => {
    if (await this.storage.get('logged') === true) {
      await this.router.navigate(['products'])
      console.log("logged");
    }
    else {
      console.log("starting authentication");
    }

  }


}
