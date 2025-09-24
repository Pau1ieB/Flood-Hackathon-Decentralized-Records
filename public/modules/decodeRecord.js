export const decodeRecord=(inputs)=>{
    //An input that begins with 'E' denotes an empty QR code,
    //returning false means it will be treated as a new QR code in the 'record.js' page when Updating Records

    if(inputs[0]=='E')return false;

    //An object is created and the data from 'inputs' is divided into categories
    //This will be used to populate 'inputData' in the 'record.js' page
    const data={name:'',family:'',medication:[],medicalHistory:[],preferences:[]}

    inputs = inputs.split(';');
    inputs.forEach(input=>{
        if(input[0]=='N')data.name=input.substring(1);
        else if(input[0]=='F')data.family=input.substring(1);
        else if(input[0]=='M'){
            const split = input.substring(1).split(',');
            data.medication.push({code:split[0],dose:split[1]});
        }
        else if(input[0]=='H')data.medicalHistory.push({code:input.substring(1)});
        else if(input[0]=='P')data.preferences.push({code:input.substring(1)});
    })
    return data;
}