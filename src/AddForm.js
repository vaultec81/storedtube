import React, {
    useEffect,
    useState
} from 'react'
import Axios from 'axios';
import useAxios from 'axios-hooks';
import {
    TextField,
    endAdornment,
    OutlinedInput,
    InputAdornment,
    Button,
    Box
} from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import {useDebounce, useDebounceCallback} from '@react-hook/debounce'

export default function AddForm(props) {
    const {
        onSubmit
    } = props;
    const [url, setUrl] = useDebounce('')
    const [{ data, loading, error }, refetch, manualCancel] = useAxios({
        url: 'http://localhost:3100/api/getvideoinfo',
        params: {
            url
        }
    })

    
    useEffect(() => {
        refetch()
        return () => {
            manualCancel()
        }
    }, [url])


    return <div>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
            <OutlinedInput
                onChange={(e) => setUrl(e.target.value)}
                style={{
                    height: '42px'
                }}
                label="Link"
                labelWidth={60}
                endAdornment={
                    <InputAdornment>
                    {
                        loading ? <CircularProgress/> :
                        (error || !data.allowed  ? <ErrorIcon style={{ color: 'red' }} />:<CheckCircleIcon style={{color: 'green'}} />   )
                       
                    }
                    </InputAdornment>
                }>

            </OutlinedInput>
            <Button variant="contained">Submit</Button>

        </Box>

    </div>
}