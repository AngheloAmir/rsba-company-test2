import CSVFileValidator from 'csv-file-validator';
import formidable from "formidable";
import fs from "fs";

import { csvformat } from '../../lib/csvformat';
import dbConnect from '../../lib/mongo';
import CSVModel from '../../lib/model';

export const config = {
    api: {
      bodyParser: false
    }
};

export default async function handler(req, res) {
    await dbConnect();

    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        try {
            const result = await validateFile(files.myFile);

            if(result.error) {
                return res.json(result);
            }

            //update the database
            await CSVModel.deleteMany({});
            await CSVModel.insertMany([...result.data]);

           //await CSVModel.insertMany([{Recipient: 'aaaa'}]);

            return res.json(result);
        }
        catch(err) {
            return res.json({error: [err.toString()]});
        }
    });
    //res.json({error: ['There is an error on the server']});
}

async function validateFile(file) {
    const data = fs.readFileSync(file.filepath);
    await fs.unlinkSync(file.filepath);
    
    const csvData = await CSVFileValidator(data.toString(), csvformat);
    
    if(csvData.inValidMessages.length > 0)
        return { error: csvData.inValidMessages };
    else
        return { data: csvData.data }
}
