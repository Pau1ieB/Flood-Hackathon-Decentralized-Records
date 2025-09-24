import { addSelectableTemplate, recordPageTemplate } from "../templates/record.js";
import { addElementsToPage, createPage } from './page.js';
import { openLobbyPage } from "./lobby.js";
import { openDialog } from "../dialog.js";
import { addMedicationDosesDialog, addRecordDialog } from "../templates/dialog.js";
import { medicines } from "../../data/medicines.js";
import { conditions } from "../../data/conditions.js";
import { preferences } from '../../data/preferences.js';
import { getRecordData } from '../../data/recordData.js';
import { fetchQRCode } from "../dbFunctions.js";
import { qrDisplayTemplate } from "../templates/qrDisplay.js";
import { isAlphabetOnly } from "../utils/stringCharsTests.js";

let record;

export const openRecordPage=(data=false,fixed=false)=>{
//  populates and retrieves an instance of the 'record data' object
    record=getRecordData(data,fixed);
    createPage('Records','lobby',recordPageTemplate(record,fixed));

//  sets the remove function for data checkboxes

    document.querySelectorAll('input[type="checkbox"]').forEach(input=>input.addEventListener('change',removeRecord));

    const buttons = [...document.querySelectorAll('section button')];

//  handles 'add button' functions for each record section, if the button exists.
//  'New Record' and 'Update Record' only

    let button = buttons.find(button=>button.dataset.id=='medication');
    if(button)button.addEventListener('click',openRecordDialog);

    button = buttons.find(button=>button.dataset.id=='medicalHistory');
    if(button)button.addEventListener('click',openRecordDialog);

    button=buttons.find(button=>button.dataset.id=='preferences');
    if(button)button.addEventListener('click',openRecordDialog);

    buttons.at(-1).addEventListener('click',exitPage);

//  no 'Export' button is shown if we are just viewing 'Read Record'
    if(!fixed)buttons.at(-2).addEventListener('click',updateRecord);
}

const openRecordDialog=event=>{
    const id = (event.target.nodeName=='H2')?event.target.parentNode.dataset.id:event.target.dataset.id;
    const recordList = (id=='medication')?medicines:(id=='medicalHistory')?conditions:preferences;
    const list = [{name:'Please Make A Selection',value:''},...recordList.filter(item=>!record[id].values.some(obj=>obj.code==item.code)).map(item=>{return {name:item.name,value:item.code}})];
    openDialog('Add Category',addRecordDialog(id,list),addRecord);
    if(id=='medication')document.querySelector(`select`).addEventListener('change',selectMedicine);
}

const addRecord=()=>{
    const labels=[];
    const entry={};
    const select = document.querySelector(`select`);
    if(select.value.length==0){
        alert('Please select a Medicine');
        return false
    }
    entry.code=select.value;
    labels.push(select.selectedOptions[0].textContent)
    if(select.dataset.id=='medication'){
        const doseSelect = document.querySelector(`select[data-id='doses']`);
        if(!doseSelect || doseSelect.value.length==0){
            alert('Please select a Dose');
            return false;
        }
        entry.dose=doseSelect.value;
        labels.push(doseSelect.selectedOptions[0].textContent)
    }
    record[select.dataset.id].values.push(entry);
    const template = addSelectableTemplate(select.value,labels);
    addElementsToPage(document.querySelector(`#${select.dataset.id}-list`),template);
    document.querySelector(`fieldset[data-id='${select.dataset.id}'] div[data-id="${select.value}"] input`).addEventListener('change',removeRecord);
    return true;
}

const removeRecord=event=>{
    const category = event.target.parentNode.parentNode.parentNode.parentNode.dataset.id;
    const code = event.target.parentNode.parentNode.dataset.id;
    record[category].values = record[category].values.filter(item=>(item.code!=code));
    event.target.parentNode.parentNode.remove();
}

//the 'Medication' dialog has an extra step to select a dose (from applicable doses for that medicine).
const selectMedicine=event=>{
    const doseSelect = document.querySelector(`select[data-id='doses']`);
    if(doseSelect)doseSelect.parentNode.remove();
    if(event.target.value.length==0)return;
    const doseList = medicines.find(medicine=>medicine.code==event.target.value).doses;
    addElementsToPage(document.querySelector('#dialog-content'),addMedicationDosesDialog('doses',doseList));
}

const updateRecord=async event=>{
    let output='';
    if(!record.details.fixed){
        const name = document.querySelector('fieldset[data-id="details"] input[name="name"]');
        if(name && name.value.length>0){
            if(!isAlphabetOnly(name.value))return alert('Please only use letters A - Z (upper or lowercase) and the <space> character');
            record.details.values[0].value=name.value;
        }
    }
    if(record.details.values[0].value.length>0)output+=`N${record.details.values[0].value};`;
    if(record.details.values[1].value.length>0)output+=`F${record.details.values[1].value};`;
    record.medication.values.forEach(medicine=>output+=`M${medicine.code},${medicine.dose};`);
    record.medicalHistory.values.forEach(entry=>output+=`H${entry.code};`);
    record.preferences.values.forEach(entry=>output+=`P${entry.code};`);
    const response = await fetchQRCode({output});
    if(response.ok)openDialog('New Record',qrDisplayTemplate(response.data),printQRCode);
    else alert(response.data);
}

export const printQRCode=()=>{
    alert('This is where the code would be printed');
    return false;
}

const exitPage=()=>openLobbyPage();