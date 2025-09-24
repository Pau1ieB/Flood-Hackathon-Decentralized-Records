import { containerSelectTemplate } from "./templateComponents.js";
import { doses } from "../../data/doses.js";

export const addRecordDialog=(id,list)=>[containerSelectTemplate({id},list)]

export const addMedicationDosesDialog=(id,options)=>[containerSelectTemplate({id},[{name:'Please Select A Dose',value:''},...options.map(option=>{return {name:doses[option],value:option}})])]
