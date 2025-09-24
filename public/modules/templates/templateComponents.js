export const containerLabelTemplate=(text)=>{
    return {
        type:'div',
        classes:['container'],
        data:{size:'s'},
        content:[
            {
                type:'label',
                text
            }
        ]
    }
}

export const containerButtonTemplate=(text,id='',data={})=>{
    return {
        type:'div',
        classes:['container'],
        data,
        content:[
            {
                type:'button',
                data:{id},
                content:[
                    {
                        type:'h2',
                        text
                    }
                ]
            }
        ]
    }
}

export const containerButtonTickTemplate=(text,id='',data={},tickData={})=>{
    return {
        type:'div',
        classes:['container'],
        data,
        content:[
            {
                type:'button',
                data:{id},
                content:[
                    {
                        type:'h2',
                        text,
                        content:[
                            {
                                type:'span',
                                data:tickData,
                                text:'\u2713'
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

export const containerInputTemplate=(type,placeholder,name='',value='',data={})=>{
    return {
        type:'div',
        classes:['container'],
        data,
        content:[
            {
                type:'input',
                attr:{type,placeholder,name,value}
            }
        ]
    }
}

export const containerSelectTemplate=(data,options)=>{
    return {
        type:'div',
        classes:['container'],
        content:[
            {
                type:'select',
                data,
                content:options.map(option=>createOption(option.name,option.value))
            }
        ]
    }
}

const createOption=(text,value)=>{
    return {
        type:'option',
        attr:{value},
        text
    }
}

export const checkboxTemplate=(checked,text)=>{
    const attr = (checked)?{type:'checkbox',checked:true}:{type:'checkbox'};
    return{
        type:'div',
        content:[
            {
                type:'input',
                attr
            },
            {
                type:'label',
                text
            }
        ]
    }
}

export const noCheckbox=text=>{
    return{
        type:'div',
        content:[
            {
                type:'label',
                text
            }
        ]
    }
}