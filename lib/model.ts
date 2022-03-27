import mongoose from 'mongoose'

//the variable name should be same as the collection name and small letter
const csv = new mongoose.Schema({
    Year: {
        type: Number
    },
    Rank: {
        type: Number
    },
    Country: {
        type: String
    },
    Career: {
        type: String
    },
    Tied: {
        type: Number
    },
    Title: {
        type: String
    }
})

export default mongoose.models.csv || mongoose.model('csv', csv);
