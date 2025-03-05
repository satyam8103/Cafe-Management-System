import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { AuthService } from 'src/app/auth-services/auth-service/auth.service';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../auth-services/auth-service/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']  // Fixed `styleUrls`
})
export class SignupComponent implements OnInit {
  isSpinning: boolean = false;
  validateForm : FormGroup;  


  confirmationValidator =(control:FormControl):{[s:string]:boolean} =>{
    if(!control.value){
      return {required: true};
    }
    else if(control.value !== this.validateForm.controls['password'].value){
      return {confirm: true, error: true};
    }
      return {};
    }
  

  constructor(private service: AuthService, private fb: FormBuilder,
    private  notification: NzNotificationService 
    ) {}


  ngOnInit() {  // Moved outside constructor
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required,this.confirmationValidator]],
      name: [null, [Validators.required]],
    });
  }

  register() {
    console.log(this.validateForm.value);
    this.service.signup(this.validateForm.value
      
    ).subscribe((res) => {  // Fixed subscribe syntax
      console.log(res);
      if(res.id !=null){
        this.notification.success('Success', 'Account created successfully',{nzDuration: 5000});
      }
      else{
        this.notification.error('Error', 'Account creation failed',{nzDuration: 5000});
      }
    });
  }
}
