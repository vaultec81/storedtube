const ipfsClient = require('ipfs-http-client')
const { exec, spawn } = require('child_process');
const util = require('util');
const { MongoClient } = require('mongodb')
const javalon = require('javalon')
javalon.getContent = util.promisify(javalon.getContent);

const MONGODB_URL = 'mongodb://localhost:27017';

class ipfsHandler {
    constructor(self) {
        this.self = self;
        this.ipfs = ipfsClient.create();
        this.ipfs2 = ipfsClient.create({
            url: 'https://ipfs.d.tube/'
        });
        this.ap_purchase = this.ap_purchase.bind(this);
    }
    async addPin(cidList) {
        for (let cid of cidList) {
            await this.pin.add(cid)
        }
    }
    async addPinCli(cidList) {
        let proc = spawn('ipfs', ['pin', 'add', '--progress', 'QmQcwzm4ywTarbwKdfQBLFSNmr5NT1efZjw6RJmc1Ygrdx'], {
            env: {
                IPFS_PATH: '\\Users\\merk\\.ipfs'
            }
        })
        proc.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        proc.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

    }
    async exists(cid) {

    }
    /**
     * Processes purchase of storage
     */
    async ap_purchase(input) {
        
        console.log(input)
        for await(let god of this.ipfs.pin.addAll(input.cidList)) {
            console.log(god)
        }
        
        return {
            status: 'success',
            out: {
                message: 'test message'
            }
        }
    }
    async getDTubeInfo(fullUrl = "") {
        let authorLink;
        let cidList = [];

        if (fullUrl.startsWith('https://d.tube/#!/v/')) {
            authorLink = fullUrl.replace('https://d.tube/#!/v/', '')
            console.log(authorLink)
        } else if(fullUrl.startsWith('https://d.tube/v/')) {
            authorLink = fullUrl.replace('https://d.tube/v/', '')
            console.log(authorLink)

        } else {
            authorLink = fullUrl;
        }

        const [author, link] = authorLink.split('/')
        const post = await javalon.getContent(author, link)
        console.log(post.json)
        console.log(post.json.files.ipfs)
        const ipfsInfo = post.json.files.ipfs;
        if (!ipfsInfo) {
            throw new Error('Video is not IPFS')
        }
        console.log(post.json.files)
        if(!ipfsInfo.vid) {
            throw new Error('Video is not IPFS')
        }
        delete ipfsInfo.vid.src;


        cidList.push(
            ...Object.values(ipfsInfo.vid),
            ...Object.values(ipfsInfo.img || [])
        )
        console.log(cidList)
        let totalSize = 0;
        let totalBlocks = 0;
        for (let hash of cidList) {
            const statInfo = await this.ipfs2.object.stat(hash);
            totalSize = totalSize + statInfo.CumulativeSize;
            totalBlocks = totalBlocks + statInfo.LinksSize;
            console.log(statInfo)

        }
        console.log(totalSize, totalBlocks)
        const out = {
            link: authorLink,
            cidList,
            totalSize,
            totalBlocks,
        }
        console.log(out);
        return out;

    }
    async start() {
        this.mongodbClient = new MongoClient(MONGODB_URL)
        await this.mongodbClient.connect();
        this.db = this.mongodbClient.db('storedtube')

        this.self.avalonPayments.registerOpt('store_dtube', this.ap_purchase)
    }
}
/*;(async () => {
    const instance = new ipfsHandler();
    await instance.start();

    //instance.getDTubeInfo("https://d.tube/#!/v/dannyar00/QmS5YYb1QxrtTPAZAjk5BTxRhJY4adYKTNvKEJekuJ5Ldz")
    instance.addPinCli()
})()*/
module.exports = ipfsHandler;