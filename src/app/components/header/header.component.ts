import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private contractService:ContractService) { }

  approvers:any;
  quorum:any;
  async initVariables(){
    await this.contractService.initVariables();
    this.approvers = await this.contractService.wallet.methods.getApprovers().call()
    this.quorum =  await this.contractService.wallet.methods.quorum().call()
  }
  ngOnInit(): void {
    this.initVariables()
  }


}
