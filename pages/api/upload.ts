import CSVFileValidator from 'csv-file-validator';
import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
      bodyParser: false
    }
  };


export default function handler(req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        console.log( files.myFile.filepath);


        await saveFile(files.myFile);
        return res.json({ name: 'John Doe' })
    });
    //res.json({ name: 'John Doe' })
}

const saveFile = async (file) => {
    const data = fs.readFileSync(file.filepath);
    //console.log(data.toString());

    CSVFileValidator(data.toString(), ggconfig)
    .then(csvData => {
        csvData.data // Array of objects from file
        csvData.inValidMessages // Array of error messages

        console.log(csvData.data)
        console.log('errORS: ' + csvData.inValidMessages.length )
    })
    .catch(err => {
        console.log(err);
    })
    
    //fs.writeFileSync(`./public/aaa`, data);
    //await fs.unlinkSync(file.path);
    //return;
  };



   


const ggconfig = {
    headers: [
        {
            name: 'Year',
            inputName: 'year',
            
            requiredError: 'kkkk'
        },
        {
            name: 'Rank',
            inputName: 'Rank',
            required: true,
           
        },
        {
            name: 'Recipient',
            inputName: 'Recipient',
            required: true,
            
        },
        {
            name: 'Country',
            inputName: 'Country',
            required: true,
            
        },
        {
            name: 'Career',
            inputName: 'Career',
            required: true,
          
        },
        {
            name: 'Tied',
            inputName: 'Tied',
            required: true,
           
        },
        {
            name: 'Title',
            inputName: 'Title',
            required: true,
          
        },
    ],
    isHeaderNameOptional: false
}
