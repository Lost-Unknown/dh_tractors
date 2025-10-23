import { Schema, model, models } from 'mongoose';
import { BloomFilter } from 'next/dist/shared/lib/bloom-filter';

const TractorSchema = new Schema({
    bname:{type:String, required :[true]},
    fname:{type:String, required :[true]},
    saledate:{type:Date,required:[true]},
    model:{type:String, required :[true]},
    invoice:{type:Number, required:[true]},
    chassis:{type:String, required :[true]},
    engine:{type:String, required :[true]},
    mobile:{type:Number, required :[true]},
    address:{type:String, required :[true]},
    docs:{type:String},
    GSTIN:{type:String},
    GST_rate:{type:Number},
    isIGST:{type:Boolean},
    bighsn:{type:Boolean},
    saleamount:{type:Number, required :[true]},
    cashamount:[{
        amount:{type:Number},
        receivedate:{type:Date}
    }],
    onlineamount:[{
        amount:{type:Number},
        transid:{type:String},
        receivedate:{type:Date}
    }],
    chequeamount:[{
        amount:{type:Number},
        chequeid:{type:String},
        receivedate:{type:Date}
    }],
    loanamount:{type:Number},
    loantranid:{type:String},
    loanprovider:{type:String},
    oldtractorname:{type:String},
    oldtractorsaleamount:{type:Number},
    oldSaleMediator:{type:String},
    regno:{type:String},
    insureno:{type:String},
    regamount:{type:Number},
    insureamount:{type:Number}
})

const Tractor = models.Tractor || model('Tractor',TractorSchema);
export default Tractor;