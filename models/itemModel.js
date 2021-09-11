const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type:String,
        default:"Not Applicable"
    },
    memory:{
        type: String,
        default:"Not Applicable"
    },
    brand:{
        type: String,
    },
    contact_number:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    available:{
        type: Boolean,
        default: true
    },
    key:{
        type: String,
    },
    creatorAt:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
});
// let Dataset = mongoose.models.Item || mongoose.model('item', itemSchema)
// export default Dataset;


// itemSchema.index({
//     title: "text", 
//     memory: "text", 
//     description: "text", 
//     category: "text", 
//     location: "text"
    
// })

// model issue solved following this link:
//https://github.com/kriasoft/react-starter-kit/issues/1418

export default (mongoose.models && mongoose.models.Item
    ? mongoose.models.Item
    : mongoose.model('Item', itemSchema));