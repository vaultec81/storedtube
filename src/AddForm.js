import React, {
    useEffect,
    useState,
    useCallback
} from 'react'
import Axios from 'axios';
import useAxios from 'axios-hooks';
import {
    TextField,
    endAdornment,
    OutlinedInput,
    InputAdornment,
    Button,
    Box,
    FormControl,
    InputLabel
} from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error';
import LinkIcon from '@material-ui/icons/Link';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { useDebounce, useDebounceCallback } from '@react-hook/debounce'
import { ReactComponent as DtubeIcon } from './Logo_White_D.svg'

/**
 * background: linear-gradient(
93deg
, rgba(40, 44, 52, 0.98), rgba(40, 44, 52, 0.95));
    color: ghostwhite;
    margin-left: 6px;
}
 * @param {*} props 
 * @returns 
 */
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


    const handleSubmit = useCallback(() => {
        onSubmit(url)
    }, [onSubmit, url])

    const handleKeyPress = useCallback(() => {

    }, [])

    return <div>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
            <DtubeIcon style={{ width: '48px', height: '48px' }} />
            <LinkIcon style={{ width: '32px', height: '32px' }} />
            <FormControl>

                <OutlinedInput
                    onKeyPress={(e) => e.key === "Enter" ? handleSubmit() : null}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{
                        height: '36px',
                        borderColor: 'white',
                        color: 'white'
                    }}
                    label={null}
                    labelWidth={60}
                    variant="primary"
                    color="primary"
                    placeholder="https://dtube/#!/v/example/testPermlink"
                    endAdornment={
                        url !== '' ?
                            <InputAdornment>
                                {
                                    loading ? <CircularProgress style={{ height: '24px', width: '24px' }} /> :
                                        (error || !data.allowed ? <ErrorIcon style={{ color: 'red' }} /> : <CheckCircleIcon style={{ color: 'green' }} />)

                                }
                            </InputAdornment> : null
                    }>
                </OutlinedInput>
            </FormControl>

            <Button variant="contained" style={{
                //background: 'linear-gradient(93deg, rgba(40, 44, 52, 0.98), rgba(40, 44, 52, 0.95))',
                color: 'black',
                marginLeft: '6px',
            }} onClick={handleSubmit}>Submit</Button>

        </Box>

    </div>
}