const axios = require('axios')


;(async () => {
    const data = await axios.post('http://localhost:3100/api/ipfs/store_dtube', {
        url: 'https://d.tube/#!/v/devdeckardcain94/QmWbwKztRaNNM1LrAw9RbLsw2qR5tBg1thKYPPPTfnW15n'
    })
    console.log(data)
})()