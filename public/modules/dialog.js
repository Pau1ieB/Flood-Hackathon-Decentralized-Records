import { replaceElementsOnPage } from "./pages/page.js";

let acceptFunction;
let closeFunction;
let acceptOptions;

export const setupDialog=()=>{
    document.querySelector('#accept-dialog').addEventListener('click',accept);
    document.querySelector('#close-dialog').addEventListener('click',closeDialog);
}

export const openDialog=(title,template,aFunc=null,cFunc=null,options={})=>{
    document.querySelector('#dialog-title').textContent=title;
    replaceElementsOnPage(document.querySelector('#dialog-content'),template);
    (aFunc)?acceptFunction=aFunc:document.querySelector('#accept-dialog').dataset.hidden='1';
    acceptOptions=options;
    closeFunction=cFunc;
    document.querySelector('#dialog-overlay').dataset.hidden='2';
}

const accept=event=>{
    if(acceptFunction && acceptFunction(acceptOptions))closeDialog();
}

const closeDialog=()=>{
    document.querySelector('#dialog-title').textContent='';
    acceptFunction=null;
    document.querySelector('#accept-dialog').dataset.hidden='0';
    document.querySelector('#dialog-overlay').dataset.hidden='1';
    if(closeFunction)closeFunction();
}