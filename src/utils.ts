import { rejects } from 'assert';
import { resolve } from 'dns';
import Web3 from 'web3';
const Wallet = require ('./contracts/Wallet.json');
/*  for truffle without metamask
const getWeb3 = () => {
    return new Web3('http://127.0.0.1:9545');
}; */
const getWeb3 = () => {
  return new  Promise<Web3>(async (resolve,reject) => {
    window.addEventListener('load', async() => {
 if(window.ethereum){
      try{
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        resolve(web3)
      } catch(error){
        reject(error)
      }
    } else if(window.web3){
      resolve(window.web3)
    } else {
      reject('must install Metamask')
    }
    });
  });

};

const getWallet = async (web3: { eth: { net: { getId: () => any; }; Contract: new (arg0: any, arg1: any) => any; }; }) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork =  Wallet.networks[networkId];
    return new web3.eth.Contract(
      Wallet.abi,
      deployedNetwork && deployedNetwork.address
    )
};

export {getWeb3, getWallet }