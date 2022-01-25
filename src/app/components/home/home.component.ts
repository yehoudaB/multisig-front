import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  name:any
  name2:any
  constructor(
    private formBuilder:FormBuilder,
    private contractService:ContractService
  ) { }
  
  ngOnInit(): void {
  }
  transferForm = this.formBuilder.group({
    amount: [''],
    sendTo: ['']
  });

  onSubmit(){
    console.log(parseInt(this.transferForm.value['amount']))
    this.contractService.createTransfer(this.transferForm.value['amount'], this.transferForm.value['sendTo'])
  }


  

}
