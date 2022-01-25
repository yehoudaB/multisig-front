import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {getWeb3, getWallet} from '../../utils'
@Injectable({
  providedIn: 'root'
})
export class ContractService {
  web3:Web3 | undefined;
  accounts:any;
  wallet:any;
  approvers: any;
  quorum: any;
  constructor() { 
   
  }

  async initVariables(){
    this.web3 =  getWeb3(),
    this.accounts = await this.web3.eth.getAccounts(),
    this.wallet = await getWallet(this.web3),
    this.approvers = await this.wallet.methods.getApprovers().call();
    this.quorum = await this.wallet.methods.quorum().call();

  }

 

  createTransfer(amount:number, sendTo:string){
    this.wallet.methods.createTransfer(amount, sendTo)
    .send({from: this.accounts[0], gas: 1000000});
  }
  

}
