import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../models/person.model';
import { ImageData } from '../models/imagedata.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit{
  public packages = ['Monthly', 'Quaterly', 'Yearly']
  public genders = ['Male', 'Female']
  public importantList: String[] = ['Toxic Fat reduction', 'Energy and Endurance', 'Building Lean Muscle', 'Healthier Digestive System', 'Sugar Craving Body', 'Fitness']
  public hasBeenTogym: string[] = ['Yes', 'No']
  public referfrom = ['Friend', 'Social Media', 'Advertisment']
  public registerForm!: FormGroup<any>;
  public personIdToUpdate!: string;
  public isUpdateActive: boolean = false;
  public isHidden: boolean = true;
  public selectedFile!: File;
  public imageUrl!: string;
  public isImageUploaded : boolean = false;
  public personDetails!:Person
  public imageData!:ImageData
  errorObject: any = {
    attribute: 'value',
  };

  constructor(private formBuilder: FormBuilder, private api: ApiService,
    private toastService: NgToastService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.registerForm = formBuilder.group({
      personId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      bmi: ['', Validators.required],
      bmiResult: ['', Validators.required],
      gender: ['', Validators.required],
      isTrainerRequire: ['', Validators.required],
      trainingPackage: ['', Validators.required],
      motivations: ['', Validators.required],
      hasBeenToGym: ['', Validators.required],
      enquiryDate: ['', Validators.required],
      age: ['', Validators.required],
      referFrom: ['', Validators.required]
    });
    this.registerForm.controls['height'].valueChanges.subscribe(response => {
      this.calculateBmi(response);
    });
    this.activatedRoute.params.subscribe(value => {
      this.personIdToUpdate = value['personId'];
      if (this.personIdToUpdate !== undefined) {
        this.isUpdateActive = true;
        console.log('personId', this.personIdToUpdate);
        this.api.getPersonById(this.personIdToUpdate).subscribe(response => {
          this.fillFormToUpdate(response);
        });
      }

    });
  }
  ngOnInit(): void {
      if(this.personIdToUpdate!==undefined){
        this.api.getPersonById(this.personIdToUpdate).subscribe({
          next:(response:any) => {
            this.personDetails = response;
            console.log('Person',this.personDetails) 
            this.imageUrl = 'data:' + this.personDetails.imageData.type + ';base64,' + this.personDetails.imageData.imageData;
          },
          error: (error: any) => {

          }
        });
      }
  }

  submit() {
    if (this.registerForm.valid && this.selectedFile!==null) {
      this.api.savePerson(this.registerForm.value, this.selectedFile).subscribe({
        next: (response: any) => {
          this.toastService.success({ detail: "SUCCESS", summary: "Enquiery Added", duration: 3000 });
          this.registerForm.reset();
          this.router.navigate(['list']);
        },
        error: (error: any) => {
          console.log('Error', error)
          if (error.error.error === undefined) {
            this.toastService.error({ detail: "Error", summary: "Backend service down, Please Contact to Admin", duration: 3000 });
          }
          if (error.error.error !== undefined) {
            this.toastService.error({ detail: "Error", summary: "Please fill all the fields", duration: 3000 });
          }
          if (error.error.firstName !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.firstName, duration: 3000 });
          }
          if (error.error.lastName !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.lastName, duration: 3000 });
          }
          if (error.error.email !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.email, duration: 3000 });
          }
          if (error.error.mobile !== undefined) {
            this.toastService.error({ detail: "Error", summary: "Please provide mobile no +91XXXXXXXXXX to this Format", duration: 3000 });
          }
          if (error.error.age !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.age, duration: 3000 });
          }
          if (error.error.referFrom !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.referFrom, duration: 3000 });
          }
          if (error.error.weight !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.weight, duration: 3000 });
          }
          if (error.error.height !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.height, duration: 3000 });
          }
          if (error.error.bmi !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.bmi, duration: 3000 });
          }
          if (error.error.bmiResult !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.bmiResult, duration: 3000 });
          }
          if (error.error.gender !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.gender, duration: 3000 });
          }
          if (error.error.isTrainerRequire !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.isTrainerRequire, duration: 3000 });
          }
          if (error.error.trainingPackage !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.trainingPackage, duration: 3000 });
          }
          if (error.error.motivations !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.motivations, duration: 3000 });
          }
          if (error.error.hasBeenToGym !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.hasBeenToGym, duration: 3000 });
          }
          if (error.error.enquiryDate !== undefined) {
            this.toastService.error({ detail: "Error", summary: error.error.enquiryDate, duration: 3000 });
          }
        }

      });
    }
  }

  // update() {
  //   this.api.updatePerson(this.registerForm.value).subscribe(response => {
  //     this.toastService.success({ detail: "SUCCESS", summary: "Enquiery Updated", duration: 3000 });
  //     this.registerForm.reset();
  //     this.router.navigate(['list']);
  //   });
  // }

  update() {
    console.log('Select File',this.selectedFile)
    if (this.registerForm.valid && this.selectedFile !== undefined) {
      this.api.updatePerson(this.registerForm.value, this.selectedFile).subscribe({
        next: (response: any) => {
          this.toastService.success({ detail: "SUCCESS", summary: "Enquiery Updated", duration: 3000 });
          this.registerForm.reset();
          this.router.navigate(['list']);
        },
        error: (error: any) => {
          showError(error,this.toastService);
        }

      });
    }else{
      this.imageData = this.personDetails.imageData;
      this.personDetails = this.registerForm.value;
      this.personDetails.imageData = this.imageData
      console.log(this.personDetails)
      this.api.updatePersonWithImageData(this.personDetails).subscribe({
        next: (response: any) => {
          this.toastService.success({ detail: "SUCCESS", summary: "Enquiery Updated", duration: 3000 });
          this.registerForm.reset();
          this.router.navigate(['list']);
        },
        error: (error: any) => {
          showError(error,this.toastService);
        }

      });
    }
  }

  fillFormToUpdate(person: Person) {
    this.registerForm.setValue({
      personId: person.personId,
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      mobile: person.mobile,
      weight: person.weight,
      height: person.height,
      bmi: person.bmi,
      bmiResult: person.bmiResult,
      gender: person.gender,
      isTrainerRequire: person.isTrainerRequire,
      trainingPackage: person.trainingPackage,
      motivations: person.motivations,
      hasBeenToGym: person.hasBeenToGym,
      enquiryDate: person.enquiryDate,
      age:person.age,
      referFrom:person.referFrom
    });
  }

  calculateBmi(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue('Underweight');
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registerForm.controls['bmiResult'].patchValue('Normal');
        break;
      case (bmi >= 25 && bmi < 30):
        this.registerForm.controls['bmiResult'].patchValue('Overweight');
        break;
      default:
        this.registerForm.controls['bmiResult'].patchValue('Obese');
        break;
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.isImageUploaded = false;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(): void {
    console.log('Image uploaded:', this.selectedFile);
    this.isImageUploaded = true;
  }
}






function showError(error: any, toastService: NgToastService) {
  console.log('Error', error)
          if (error.error.error === undefined) {
            toastService.error({ detail: "Error", summary: "Backend service down, Please Contact to Admin", duration: 3000 });
          }
          if (error.error.error !== undefined) {
            toastService.error({ detail: "Error", summary: "Please fill all the fields", duration: 3000 });
          }
          if (error.error.firstName !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.firstName, duration: 3000 });
          }
          if (error.error.lastName !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.lastName, duration: 3000 });
          }
          if (error.error.email !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.email, duration: 3000 });
          }
          if (error.error.mobile !== undefined) {
            toastService.error({ detail: "Error", summary: "Please provide mobile no +91XXXXXXXXXX to this Format", duration: 3000 });
          }
          if (error.error.age !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.age, duration: 3000 });
          }
          if (error.error.referFrom !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.referFrom, duration: 3000 });
          }
          if (error.error.weight !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.weight, duration: 3000 });
          }
          if (error.error.height !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.height, duration: 3000 });
          }
          if (error.error.bmi !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.bmi, duration: 3000 });
          }
          if (error.error.bmiResult !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.bmiResult, duration: 3000 });
          }
          if (error.error.gender !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.gender, duration: 3000 });
          }
          if (error.error.isTrainerRequire !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.isTrainerRequire, duration: 3000 });
          }
          if (error.error.trainingPackage !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.trainingPackage, duration: 3000 });
          }
          if (error.error.motivations !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.motivations, duration: 3000 });
          }
          if (error.error.hasBeenToGym !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.hasBeenToGym, duration: 3000 });
          }
          if (error.error.enquiryDate !== undefined) {
            toastService.error({ detail: "Error", summary: error.error.enquiryDate, duration: 3000 });
          }
}

