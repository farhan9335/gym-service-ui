import { ImageData } from "./imagedata.model"

export class Person{
    personId!:string
    firstName!:string
    lastName!:string
    email!:string
    mobile!:string
    weight!:number
    height!:number
    bmi!:number
    bmiResult!:string
    gender!:string
    isTrainerRequire!:string
    trainingPackage!:string
    motivations!:string[]
    hasBeenToGym!:string
    enquiryDate!:string
    age!:number
    imageData!:ImageData
    referFrom!:string
}