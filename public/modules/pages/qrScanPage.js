import { qrScanPagetemplate } from "../templates/qrScanPage.js";
import { createPage } from "./page.js";

let scanner;
let successFunction;
let closeFunction;

export const openQRScanPage=(sFunc,cFunc)=>{
    createPage('QR Scanner','qr-scan',qrScanPagetemplate())
    document.querySelector('button').addEventListener('click',exitPage);
     // font-size:1.8rem;
    // padding:0.25em 0.5em;
    // margin-bottom: 1em;
    successFunction=sFunc;
    closeFunction=cFunc;
    openQRScanner(success);
}

const openQRScanner=(success)=>{
    scanner = new Html5QrcodeScanner('qr-scan',{
        qrbox:{
            width:280,
            height:280,            
        },        
        fps:20
    });
    scanner.render(success,error)
}

const success=result=>{
    if(scanner && scanner.getState()==2)scanner.pause();
    if(successFunction(result)){
        scanner.clear();
        scanner=null;
        successFunction=null;
        closeFunction=null;
    }
    else if(scanner.getState()==2) scanner.resume();
}

const error=err=>console.log(err);

const exitPage=()=>{
    scanner=null;
    successFunction=null;
    if(closeFunction){
        closeFunction();
        closeFunction=null;
    }
}