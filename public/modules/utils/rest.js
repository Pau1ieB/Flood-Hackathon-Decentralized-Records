export const get=async(path)=>{
    try{
        let response = await fetch(path, {
            method: 'GET',
            headers: getHeaders()
        });
        response = await response.json();
        return response;
    }catch(err){
        if(err.name == 'NetworkError' || err == 'TypeError: NetworkError when attempting to fetch resource.'){
            console.log('There was a network error...');
        };
        return err;
    }
}

export const getArrayBuffer=async(path)=>{
    try{
        let response = await fetch(path, {
            method: 'GET',
            headers: getHeaders()
        });
        response = await response.arrayBuffer();
        return response;
    }catch(err){
        if(err.name == 'NetworkError' || err == 'TypeError: NetworkError when attempting to fetch resource.'){
            console.log('There was a network error...');
        };
        return err;
    }
}

export const post=async(path,data)=>{
    try{
        let response = await fetch(path, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        response = await response.json();
        return response;
    }catch(err){
        if(err.name == 'NetworkError' || err == 'TypeError: NetworkError when attempting to fetch resource.'){
            console.log('There was a network error...');
        };
        return err;
    }
}

export const put=async(path,data)=>{
    let response = await fetch(path, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    response = await response.json();
    return response;
}

export const patch=async(path,data)=>{
    let response = await fetch(path, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    response = await response.json();
    return response;
}

export const del=async(path)=>{
    let response = await fetch(path, {
        method: 'DELETE',
        headers: getHeaders()
    });
    response = await response.json();
    return response;
}

const getHeaders=()=>{
    return{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}