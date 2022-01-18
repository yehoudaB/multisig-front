import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {getWeb3, getWallet} from '../../utils'
@Injectable({
  providedIn: 'root'
})
export class ContractService {
  web3:Web3 | undefined;
  account:any;
  wallet:any;
  constructor() { 
   
  }

  async initVariables(){
    this.web3 =  getWeb3(),
    this.account = await this.web3.eth.getAccounts(),
    this.wallet = await getWallet(this.web3)

  }

  

}
