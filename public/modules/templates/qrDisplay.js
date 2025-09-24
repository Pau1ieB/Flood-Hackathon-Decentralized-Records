import { containerButtonTemplate } from "./templateComponents.js";

export const qrDisplayTemplate=src=>[
    {
        type:'div',
        classes:['qrcode-display'],
        content:[
            {
                type:'img',
                attr:{src}
            }
        ]
    }
]