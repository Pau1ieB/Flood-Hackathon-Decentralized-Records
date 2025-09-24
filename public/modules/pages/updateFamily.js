import { createPage } from "./page.js";
import { updateFamilyTemplate } from "../templates/updateFamily.js";
import { openLobbyPage } from './lobby.js';
import { openQRScanPage } from "./qrScanPage.js";
import { changeFamilyQRCode } from "../dbFunctions.js";
import { openDialog } from "../dialog.js";
import { qrDisplayTemplate } from "../templates/qrDisplay.js";
import { printQRCode } from "./record.js";

let source='';
let dest='';

// This allows two QR codes to be linked together via the 'family' code.
// The source provides the 'link'.
// The dest is updated and a new dest QR code is generated.

export const openUpdateFamilyPage=()=>{
    createPage('Update family','lobby',updateFamilyTemplate());
    const buttons = document.querySelectorAll('button');

// On return from the 'qrScanPage', if a code has been scanned a tick is shown on the button
    if(source.length>0)buttons[0].firstElementChild.firstElementChild.dataset.hidden='0';
    if(dest.length>0)buttons[1].firstElementChild.firstElementChild.dataset.hidden='0';

    buttons[0].addEventListener('click',getSourceCode);
    buttons[1].addEventListener('click',getDestinationCode);
    buttons[2].addEventListener('click',updateFamily);
    buttons[3].addEventListener('click',exitPage);
}


//provides callbacks for success and cancel functions

const getSourceCode=()=>openQRScanPage(updateSourceCode,openUpdateFamilyPage)

const getDestinationCode=()=>openQRScanPage(updateDestinationCode,openUpdateFamilyPage)


//success callbacks

const updateSourceCode=result=>{
    source=result;
    openUpdateFamilyPage();
    return true;
}

const updateDestinationCode=result=>{
    dest=result;
    openUpdateFamilyPage();
    return true;
}


//generates a new dest QR code, if both source and dest have been provided

const updateFamily=async ()=>{
    if(source.length==0 || dest.length==0)return alert('You need both source and a destination qrcode');
    const response = await changeFamilyQRCode({source,dest});
    if(response.ok)openDialog('New Record',qrDisplayTemplate(response.data),printQRCode);
    else alert(response.data)
}


// return to lobby

const exitPage=()=>{
    source='';
    dest='';
    openLobbyPage();
}