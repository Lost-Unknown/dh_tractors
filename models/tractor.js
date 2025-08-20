import { Schema, model, models } from 'mongoose';

const TractorSchema = new Schema({
    bname:{type:String, required :[true]},
    fname:{type:String, required :[true]},
    saledate:{type:Date,required:[true]},
    model:{type:String, required :[true]},
    chassis:{type:String, required :[true]},
    enigne:{type:String, required :[true]},
    mobile:{type:Number, required :[true]},
    address:{type:String, required :[true]},
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
    pendingamount:{type:Number},
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