import logo from './logo.svg';
import './App.css';
import './Arrow.css'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import ReactFullpage from '@fullpage/react-fullpage'; // will return static version on server and "live" version on client

import { LoopCircleLoading } from 'react-loadingg';
import ReactLoading from "react-loading";

import DTubeLogo from './Logo_White.svg';
import Backdrop from './backdrop.png';
import Backdrop2 from './backdrop2.png';
import preview_modal from './preview_modal.png';


import ShowcaseImg from './components/ShowcaseImg'
import AddForm from './AddForm'
import { Box } from '@material-ui/core';

import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column'
  },
}));

function App() {
  const classes = useStyles();
  console.log(Backdrop)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <ReactFullpage
              //fullpage options
              licenseKey={'YOUR_KEY_HERE'}
              scrollingSpeed={1000} /* Options here */
              navigation={true}
              render={({ state, fullpageApi }) => {
                return <ReactFullpage.Wrapper>
                  <div className="section">
                    <header style={{ backgroundImage: `linear-gradient(rgb(40 44 52 / 95%), rgb(40 44 52 / 98%)), url(${Backdrop2})`, backgroundSize: 'cover', }} className="App-header">

                      <h1 style={{ marginBottom: '0px', fontSize: '2.5em' }}>
                        <img src={DTubeLogo} style={{ width: '3em', marginRight: '14px' }} alt="dtube " />IPFS Storage
                      </h1>
                      <p style={{ marginBottom: '0px' }}>
                        1 DTC/video
                      </p>
                      <p style={{ marginBottom: '0px' }}>
                        Store your dtube videos. Long term.
                      </p>
                      <h2>
                        Coming Soon
                      </h2>
                      <Modal
                        open={true}
                      >

                        <Paper className={classes.paper}>
                          <Box style={{ display: 'flex', flexWrap: 'nowrap' }}>

                            <Box style={{ padding: '5px', textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                              <Box>
                                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                  <ReactLoading type={'spin'} color="red" />
                                  {/*<CheckCircleIcon style={{color: 'green', height: '64px', width: '64px'}}/>*/}
                                </Box>
                                Remaining: 1DTC
                                Pending: 0DTC

                              </Box>
                            </Box>
                            <Box style={{ padding: '5px', textAlign: 'center' }}>
                              <h3>
                                Send 1 DTC to

                              </h3>
                              <code style={{ backgroundColor: 'rgb(255 0 0 / 20%)' }}>
                                <a href="https://d.tube/#/c/vaultec" target="_blank" rel="noreferrer">vaultec</a>
                              </code>
                              <h3>
                                with memo:
                              </h3>

                              <code style={{ backgroundColor: 'rgb(255 0 0 / 20%)' }}>
                                332a5ecc-3101-4545-b98a-159ccfe68e8d
                              </code>

                            </Box>
                          </Box>
                          <Box>
                            <a href="https://discord.gg/UwMkwRQ">
                              Need help? Join Our Discord!
                            </a>
                          </Box>
                        </Paper>

                      </Modal>
                      <div class="scrollarrow">
                        <a onClick={() => fullpageApi.moveSectionDown()}>
                          <span></span>
                          <span></span>
                          <span></span></a>
                      </div>
                    </header>

                  </div>
                  <div style={{ backgroundColor: '#2f4475', color: 'white' }} className="section">
                    <header >
                      <h1>
                        How-To
                      </h1>
                      <div style={{ width: '100%', height: '85vh', display: 'flex' }}>
                        <div className="showcase-box" style={{ width: '50%' }}>
                          <div>
                            <h2>
                              1. Copy and Paste your video url into the app.
                            </h2>
                            <ShowcaseImg src={Backdrop} />
                          </div>
                        </div>
                        <div className="showcase-box" style={{ width: '50%' }}>
                          <div className="showcase-downslide">
                            <ShowcaseImg src={preview_modal} />
                            <h2>
                              2. You should see a prompt similar to the above
                            </h2>

                          </div>

                        </div>

                      </div>
                    </header>
                  </div>
                  <div style={{ verticalAlign: 'baseline', display: 'flex', backgroundColor: '#223154', color: 'white' }} className="section">
                    <header>
                      <h1 style={{
                        height: '98%', fontFamily: "'Roboto', 'Helvetica Neue', Helvetica, Arial, sans- serif",
                        fontWeight: 300,
                        fontSize: '2.5rem'
                      }}>
                        Frequently Asked Questions
                      </h1>
                      <div style={{ display: 'flex' }}>

                        <div style={{ width: '25%' }}>
                          <Accordion style={{ margin: '10px', color: 'white', backgroundColor: 'rgb(39 64 121 / 80%)' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography>What is IPFS?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                IPFS stands for the InterPlanetary File System — a peer-to-peer network for storing and accessing files, websites, applications, and data in a distributed file system.
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        <div style={{ width: '25%' }}>
                          <Accordion style={{ margin: '10px', color: 'white', backgroundColor: 'rgb(39 64 121 / 80%)' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography>How long is my video stored for?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                While this is in beta, we are aiming for storing content for as long as reasonably possible.
                                We will for sure store content for atleast 6 months if not a year or more.
                                Our pricing model is still being developed and is subject to change.
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        <div style={{ width: '25%' }}>
                          <Accordion style={{ margin: '10px', color: 'white', backgroundColor: 'rgb(39 64 121 / 80%)' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography>What type of videos can I store?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                You can store any kind of video, except for copyrighted/illegal material.
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                        <div style={{ width: '25%' }}>
                          <Accordion style={{ margin: '10px', color: 'white', backgroundColor: 'rgb(39 64 121 / 80%)' }}>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography>Do you plan on supporting services other than dtube?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                Yes! For now, we are starting with dtube then, eventually supporting other services.
                                Stay tuned!
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>

                      </div>
                      <div>
                        <h1>
                          1 DTC/Video
                        </h1>
                        <Button size="large" onClick={() => fullpageApi.moveTo(1)}>
                          Get Started
                        </Button>
                      </div>
                    </header>
                  </div>

                </ReactFullpage.Wrapper>
              }} />
          </Route>
          <Route exact path="/dev">
              <AddForm/>
          </Route>
        </Switch>
      </Router>


    </div>
  );
}

export default App;
