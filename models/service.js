import { Schema, model, models } from 'mongoose';

const SpareSchema = new Schema({
  code: { type: String },
  quantity: { type: Number },
  final: { type: Number }
}, { _id: false }); 

const JobsSchema = new Schema({
  type: {type:String}, 
  cost: {type:Number} 
}, { _id: false }); 

const ServiceSchema = new Schema({
    ownername: {type:String},
    invoice:{type:Number},
    model: {type:String},
    chassis: {type:String},
    engine: {type:String},
    mobile: {type:Number},
    date:{type:Date},
    hours: {type:Number},
    spares: [SpareSchema],
    jobs: [JobsSchema]
})

const Service = models.Service || model('Service',ServiceSchema);
export default Service;