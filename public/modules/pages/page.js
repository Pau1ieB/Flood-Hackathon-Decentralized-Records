import { create } from '../utils/create.js';

export const createPage=(title,page,template)=>{
    document.querySelector('h1').textContent=title;
    document.querySelector('main').replaceChildren(create(template));
    document.querySelector('section').dataset.page=page;
}

export const replaceElementsOnPage=(parent,template)=>{parent.replaceChildren(create(template));}

export const addElementsToPage=(parent,template)=>{parent.append(create(template));}