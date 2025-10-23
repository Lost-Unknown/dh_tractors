import { Schema, model, models } from 'mongoose';

const SpareSchema = new Schema({
    code: {type:String},
    hsn:{type:Number},
    name: {type:String},
    price: {type:Number},
    gst: {type:Number},
})

const Spare = models.Spare || model('Spare',SpareSchema);
export default Spare;