import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    this.transfers  = await this.contractService.wallet.methods.getTransfers().call();
    console.log(this.transfers)
    console.log("aaa")
  }
  ngOnInit(): void {
    this.initVariables()

  }
  transferForm = this.formBuilder.group({
    amount: [''],
    sendTo: ['']
  });


   async onSubmit(){
   // console.log(parseInt(this.transferForm.value['amount']))
    await this.contractService.createTransfer(this.transferForm.value['amount'], this.transferForm.value['sendTo'])
    const length = this.transfers.length
    const myInterval = setInterval(async ()=> {
      this.transfers  = await this.contractService.wallet.methods.getTransfers().call();
      console.log('create')
      if(this.transfers.length > length)
        clearInterval(myInterval);
    }, 1000);
    
  }

  async approveTransfer(id:string ){
    await this.contractService.approveTransfer(id)
    const myInterval = setInterval(async ()=> {
      const nbApprovals = this.transfers[id].approvals
      this.transfers  = await this.contractService.wallet.methods.getTransfers().call();
      console.log('approve ')
      if(this.transfers[id].approvals  > nbApprovals)
      clearInterval(myInterval);

    }, 1000);
    
  }
 
}


