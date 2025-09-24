import { generateRandom } from "../modules/utils/random.js"

export const getRecordData=(data,fixed=false)=>{
    return{
        details:{
            title:'Details',
            type:'input',
            values:[
                {type:'text',placeholder:'Name',name:'name',value:(!data)?'':data.name,fixed:(fixed)?true:(!data || data.name.length==0)?false:true},
                {type:'label',value:(!data)?generateRandom(10):data.family}
            ]
        },
        medication:{
            fixed,
            type:'check',
            title:'Medication',
            values:(!data)?[]:data.medication
        },
        medicalHistory:{
            fixed,
            type:'check',
            title:'Medical History',
            values:(!data)?[]:data.medicalHistory
        },
        preferences:{
            fixed,
            type:'check',
            title:'Preferences',
            values:(!data)?[]:data.preferences
        }
    }
}