import { Schema, model, models } from 'mongoose';

const StockTransferSchema = new Schema({
    bname:{type:String, required :[true]},
    saledate:{type:Date,required:[true]},
    model:{type:String, required :[true]},
    invoice:{type:Number, required:[true]},
    chassis:{type:String, required :[true]},
    engine:{type:String, required :[true]},
    mobile:{type:Number, required :[true]},
    address:{type:String, required :[true]},
    GSTIN:{type:String},
    GST_rate:{type:Number},
    isIGST:{type:Boolean},
    bighsn:{type:Boolean},
    saleamount:{type:Number, required :[true]},
})

const StockTransfer = models.StockTransfer || model('StockTransfer',StockTransferSchema);
export default StockTransfer;