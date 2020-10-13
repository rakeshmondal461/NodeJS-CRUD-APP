const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

let customerSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    mob : {
        type:String,
        required:true
    },
    uid : {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('customer',customerSchema);