import { containerButtonTemplate } from "./templateComponents.js";

export const lobbyTemplate=buttonsData=>[
    {
        type:'section',
        content:buttonsData.map(button=>containerButtonTemplate(button,'',{size:'l'}))
    }
]