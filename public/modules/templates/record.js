import { conditions } from "../../data/conditions.js";
import { doses } from "../../data/doses.js";
import { medicines } from "../../data/medicines.js";
import { preferences } from "../../data/preferences.js";
import { checkboxTemplate, containerButtonTemplate, containerInputTemplate, noCheckbox, containerLabelTemplate } from "./templateComponents.js";

export const recordPageTemplate=(record,fixed)=>{
    const buttons = (!fixed)?[containerButtonTemplate('Export Record','',{size:'l'}),containerButtonTemplate('Exit','',{size:'l'})]:[containerButtonTemplate('Exit','',{size:'l'})];
    return [
        {
            type:'section',
            content:[
                ...Object.keys(record).map(key=>createFieldset(key,record[key])),
                ...buttons
            ]
        }
    ]
}

const createFieldset=(id,record)=>{
    const data = (id=='details')?addDetailsCategory(record.values):addCategory(id,record)
    return {
        type:'fieldset',
        data:{id},
        content:[
            {
                type:'legend',
                text:record.title
            },
            ...data
        ]
    }
}

const addDetailsCategory=data=>[
    (data[0].fixed)?containerLabelTemplate(`${data[0].placeholder}: ${data[0].value}`,{size:'s'}):containerInputTemplate(data[0].type,data[0].placeholder,data[0].name,data[0].value,{size:'s'}),
    containerLabelTemplate(`Family: ${data[1].value}`)
]

const addCategory=(id,record)=>{
    const list = (id=='medication')?medicines:(id=='medicalHistory')?conditions:preferences;
    const list2 = (id=='medication')?doses:null;
    return[
        {
            type:'div',
            classes:['record-list'],
            attr:{id:`${id}-list`},
            content:record.values.map(item=>{
                item = decodeRecordData(list,list2,item);
                return addSelectableTemplate(item.id,item.labels,record.fixed)
            }).flat()
        },
        (!record.fixed)?containerButtonTemplate('Add',id,{size:'s'}):[]
    ]
}

export const decodeRecordData=(list,list2,item)=>{
    const obj = {id:item.code,labels:[list.find(l=>l.code==item.code).name]}
    if(item.dose)obj.labels.push(list2[item.dose])
    return obj;
}

export const addSelectableTemplate=(id,labels,fixed)=>{
    return [{
        type:'div',
        data:{id},
        content:labels.map((label,i)=>(i==0 && !fixed)?checkboxTemplate(true,label):noCheckbox(label))
    }]
}