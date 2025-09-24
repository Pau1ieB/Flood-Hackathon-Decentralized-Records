import { containerButtonTemplate, containerButtonTickTemplate } from "./templateComponents.js"

export const updateFamilyTemplate=()=>[
    {
        type:'section',
        content:[
            containerButtonTickTemplate('Source Code','source',{size:'l'},{left:'1',col:'blue',bold:'1',hidden:'1'}),
            containerButtonTickTemplate('Destination Code','dest',{size:'l'},{left:'1',col:'blue',bold:'1',hidden:'1'}),
            containerButtonTemplate('Update','',{size:'l'}),
            containerButtonTemplate('Exit','',{size:'l'})
        ]
    }
]