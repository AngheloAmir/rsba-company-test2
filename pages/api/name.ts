import CSVModel from '../../lib/model';
import dbConnect from '../../lib/mongo';

export default async function handler(req, res) {
    await dbConnect();
    
    const data = await CSVModel.find({Recipient: req.body.recipient});
    res.json({data: data});
 
}
