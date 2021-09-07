import {useState, useCallback, useEffect} from 'react'
import useAxios from 'axios-hooks'
import Axios from 'axios'
import Config from '../Config'

export function useDtubeStore() {
    const [locked, setLocked] = useState(false);
    const [invoice, setInvoice] = useState({})
    const [invoiceId, setInvoiceId] = useState(null)

    const purchase = useCallback(async(url) => {
        const data = (await Axios.post(`${Config.endpoint_api}/api/ipfs/store_dtube`, {
            url: url
        })).data
        console.log(data)
        setInvoiceId(data["memo_id"])
    }, [])

    const exit = useCallback(async(url) => {
        if(invoice.status === "finalized") {
            setInvoiceId(null)
            setInvoice({})
        }
    }, [invoice.status])

    useEffect(() => {
        if(invoiceId) {
            const interval = setInterval(async () => {
              //setSeconds(seconds => seconds + 1);
              const {data} = await Axios.get(`${Config.endpoint_api}/api/ipfs/get_invoice?memo_id=${invoiceId}`)
              setInvoice(data)
            }, 2000);
            return () => clearInterval(interval);
        }
      }, [invoiceId]);

      const statusMessage = (() => {
        if(invoiceId) {
            if(!invoice.status) {
                return "Loading Invoice"
            }
            if(invoice.status === "finalized") {
                return "Pinning complete! You can safely leave this page."
            }
        }
      })();

    return {
        locked,
        invoice,
        invoiceId,
        statusMessage,
        purchase,
        exit
    }
}