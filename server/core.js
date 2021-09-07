const express = require('express')
const cors = require('cors')
const ConvertUnits = require('convert-units')


const AvalonPayments = require('./avalonPayments')
const IpfsHandler = require('./ipfsHandler')

let app = express()
app.use(express.json()) // for parsing application/json
app.use(cors());


class Core {
    constructor() {
        this.avalonPayments = new AvalonPayments(this);
        this.ipfsHandler = new IpfsHandler(this);

        this.purchaseStorageDtube = this.purchaseStorageDtube.bind(this)
    }
    async buy() {

    }
    async purchaseStorageDtube(req, res) {
        console.log(req)
        console.log(req.body)
        console.log(req.params)
        const { url } = req.body
        if (!url) {
            throw new Error('Missing get param url required.')
        }
        let dtubeInfo;
        try {
            dtubeInfo = await this.ipfsHandler.getDTubeInfo(url)
        } catch (ex) {
            console.log(ex)
            return res.send({
                error: ex.toString()
            }, 500)
        }
        const allowed_size = ConvertUnits(250).from('MB').to('B')
        const allowed = allowed_size > dtubeInfo.totalSize
        console.log(allowed)
        if(allowed) {
            const les = await this.avalonPayments.registerInvoice('store_dtube', dtubeInfo)
            console.log(les)
            return res.send({
                memo_id: les
            })
        } else {
            return res.send({
                error: 'Video not allowed in beta.',
                code: -10,
                show_user: true,
                success: false,
            })
        }
    }
    async start() {
        await this.avalonPayments.start();
        await this.ipfsHandler.start();
        app.post('/api/ipfs/store_dtube', this.purchaseStorageDtube);
        app.get('/api/ipfs/get_invoice', this.avalonPayments.getInvoice);
    }
}
; (async () => {
    const server = new Core();
    await server.start();
    app.get('/api/getvideoinfo', async function (req, res) {
        console.log(req.query)
        const { url } = req.query
        if (!url) {
            return res.send({
                error: 'Missing get param url required.'
            }, 500)
        }
        let dtubeInfo;
        try {
            dtubeInfo = await server.ipfsHandler.getDTubeInfo(url)
        } catch (ex) {
            return res.send({
                error: ex.toString()
            }, 500)
        }

        const allowed_size = ConvertUnits(250).from('MB').to('B')
        

        res.send ({
            allowed: allowed_size > dtubeInfo.totalSize,
            dtubeInfo
        })
    })
    app.set('port', 3100);
    app.listen(app.get('port'));
})();

