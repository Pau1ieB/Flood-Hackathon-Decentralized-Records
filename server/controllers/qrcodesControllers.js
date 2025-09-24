import QRCode from 'qrcode';

export const createQRCode=async (req,res)=>{
    // if an empty QR Code is requested ie without a name or family field input,
    // a code is generated with the default "E" (for "empty")
    // You can generate an empty QR code for anonymity,
    // and link it to another 'family' - using the 'Update Family Function'
    const output = (req.body.output.length==0)?'E':req.body.output;
    try{
        const code = await QRCode.toDataURL(output);
        res.status(201).json({ok:1,data:code});
    }catch(err){res.status(400).json({ok:0,data:'Something went Wrong!'})}
}

export const updateFamily=async (req,res)=>{
    //Updates the dest code with the family reference of the source code.
    //And returns an updated dest QR code
    const source = req.body.source.split(';').find(obj=>obj[0]=='F');
    if(!source) return res.status(400).json({ok:0,data:'The Source QRCode does not have a family code'});
    let dest = req.body.dest.split(';').filter(obj=>obj.length>0);
    if(dest.length==0)dest.push(source);
    else{
        const index = dest.findIndex(obj=>obj[0]=='F');
        (index==-1 && dest[0][0]=='N')?dest.splice(1,0,source):(index==-1)?dest.splice(0,0,source):dest[index]=source
    }
    try{
        const code = await QRCode.toDataURL(dest.join(';'));
        res.status(201).json({ok:1,data:code});
    }catch(err){res.status(400).json({ok:0,data:'Something went Wrong!'})}
}