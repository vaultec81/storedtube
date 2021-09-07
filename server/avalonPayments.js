const util = require('util');
const nodeSchedule = require('node-schedule');
const javalon = require('javalon')
const { v4: uuid } = require('uuid')
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb')
javalon.init({ api: 'https://avalon.d.tube' });
javalon.getDiscussionsByAuthor = util.promisify(javalon.getDiscussionsByAuthor);
javalon.sendTransaction = util.promisify(javalon.sendTransaction);
javalon.getAccount = util.promisify(javalon.getAccount);
javalon.getClaimedVotesByAccount = util.promisify(javalon.getClaimedVotesByAccount);
javalon.getClaimableVotesByAccount = util.promisify(javalon.getClaimableVotesByAccount);
javalon.getPendingVotesByAccount = util.promisify(javalon.getPendingVotesByAccount);
javalon.getVotesByAccount = util.promisify(javalon.getVotesByAccount);
javalon.getPendingRewards = util.promisify(javalon.getPendingRewards);
javalon.getContent = util.promisify(javalon.getContent);
javalon.getAccountHistory = util.promisify(javalon.getAccountHistory);


const MONGODB_URL = 'mongodb://localhost:27017';

const HANDLE_ACCOUNT = "vaultec";

const INVOICE_STATUS = {
    PENDING: 'pending', //Waiting payment
    PAID: 'paid', //Paid
    FINALIZED: 'finalized', //Operation executed
    ABORTED: 'aborted',
}

const opt_list = {
    "store-ipfs": (args) => {
        console.log(args)
        console.log('executing store-ipfs')


    }
}

class ServerTracker {
    constructor(self) {
        this.self = self;
        this.regOps = {};
        this.trxQuery = this.trxQuery.bind(this)
        this.getInvoice = this.getInvoice.bind(this)
    }
    registerOpt(name, cb) {
        this.regOps[name] = cb;
    }
    async trxQuery() {
        const data = await javalon.getAccountHistory(HANDLE_ACCOUNT, 0);
        for (let esix of data) {
            for (let trx of esix.txs) {
                //Detect transfer operation
                if (trx.type === 3) {
                    //console.log(trx)
                    //Ensure the account is to the manager/payment processor account, and ensure the memo is set to a real value.
                    if (trx.data.receiver === HANDLE_ACCOUNT && trx.data.memo !== '') {
                        //Ensure only incoming transactions are handled
                        console.log('Received transaction')
                        const memo = trx.data.memo;
                        const collection = this.db.collection('invoices')
                        let invoice = await collection.findOne({
                            _id: memo
                        })
                        if (!invoice) {
                            continue;
                        }
                        //Check whether transaction is already tracked or not.
                        if (!invoice.trxs.includes(trx.hash)) {
                            invoice.trxs.push(trx.hash)
                            //Add balance to invoice data
                            invoice.bal = invoice.bal + trx.data.amount;
                        }
                        if (invoice.bal >= invoice.balReq && invoice.status === INVOICE_STATUS.PENDING) {
                            console.log('rocket mom')
                            //Mark as paid.
                            invoice.status = INVOICE_STATUS.PAID
                        }
                        console.log(invoice)
                        if(invoice.status === INVOICE_STATUS.PAID) {
                            try {
                                //Execute operation upon paying for invoice.
                                console.log(this.regOps[invoice.op])
                                const output = await this.regOps[invoice.op](invoice.args)
                                console.log(output)
                                if (output) {
                                    invoice.out = output;
                                }
                                invoice.status = INVOICE_STATUS.FINALIZED; //Mark as finalized once operation has been executed.
                            } catch (ex) {
                                console.log(ex)
                            }
                        }
                        await collection.updateOne({
                            _id: invoice._id,

                        },
                        {
                            $set: invoice
                        })
                    }
                }
            }
        }
    }
    async registerInvoice(op, args) {
        const id = uuid();
        const collection = this.db.collection('invoices')
        const invoice_data = {
            op,
            memo: id,
            _id: id,
            bal: 0,
            balReq: 100,
            trxs: [],
            args,
            out: null,
            created: new Date(),
            status: INVOICE_STATUS.PENDING
        }
        await collection.insertOne(invoice_data)

        return id;
    }
    async getInvoice(req, res) {
        const {memo_id} = req.query;
        const collection = this.db.collection('invoices')
        const invoice = await collection.findOne({
            memo: memo_id
        })
        return res.send(invoice);
    }
    async cancelInvoice(req, res) {
        const {memo_id} = req.query;
        const collection = this.db.collection('invoices')
        const invoice = await collection.findOneAndUpdate({
            memo: memo_id
        }, {
            $set: {
                status: 'canceled'
            }
        })
        return res.send(invoice);
    }
    async start() {
        this.mongodbClient = new MongoClient(MONGODB_URL)
        await this.mongodbClient.connect();
        this.db = this.mongodbClient.db('storedtube')

        console.log(this.db)

        setInterval(this.trxQuery, 20000)
    }
}
/*
;(async () => {
    const instance = new ServerTracker();
    await instance.start();
    instance.registerInvoice('store-ipfs')
})()*/
module.exports = ServerTracker