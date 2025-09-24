import { createPage } from "./page.js";
import { lobbyTemplate } from "../templates/lobby.js";
import { openRecordPage } from "./record.js";
import { decodeRecord } from "../decodeRecord.js";
import { openQRScanPage } from "./qrScanPage.js";
import { openUpdateFamilyPage } from "./updateFamily.js";

export const openLobbyPage=()=>{
    const buttonsData=['New Record','Update Record','Update Family','Read Record'];
    createPage('Lobby','lobby',lobbyTemplate(buttonsData));
    const buttons = document.querySelectorAll('button');
    buttons[0].addEventListener('click',newRecord);
    buttons[1].addEventListener('click',updateRecordScanPage);
    buttons[2].addEventListener('click',openUpdateFamilyPage);
    buttons[3].addEventListener('click',readRecordScanPage);
}

export const newRecord=()=>openRecordPage();

const updateRecordScanPage=()=>openQRScanPage(updateRecord,openLobbyPage);

const updateRecord=result=>{
    openRecordPage(decodeRecord(result));
    return true;
}

const readRecordScanPage=()=>openQRScanPage(readRecord,openLobbyPage);

const readRecord=result=>{
    openRecordPage(decodeRecord(result),true);
    return true;
}