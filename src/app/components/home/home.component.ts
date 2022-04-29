import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 
  transfers: any
  constructor(
    private formBuilder:FormBuilder,
    private contractService:ContractService
  ) { }
  
 
  async initVariables(){
    await this.contractService.initVariables();
    this.transfers =  await this.contractService.wallet.methods.getTransfers().call()
    console.log( this.transfers)
  }
  ngOnInit(): void {
    this.initVariables()

  }
  transferForm = this.formBuilder.group({
    amount: [''],
    sendTo: ['']
  });

  onSubmit(){
    console.log(parseInt(this.transferForm.value['amount']))
    this.contractService
    .createTransfer(this.transferForm.value['amount'], this.transferForm.value['sendTo'])
    
  }


  

}
