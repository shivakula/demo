import React, { useEffect } from "react";
import "./Contacts.scss";
import {
  Avatar, Tooltip
} from "@mui/material";
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MailOutlineSharpIcon from '@mui/icons-material/MailOutlineSharp';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

const Contacts = (props: any) => {
  const { selectedUser, updateExpanded } = props;
  const [userDataDetail, setUserDataDetail] = React.useState(selectedUser.contacts[0]);
  const [selectedIndx, setSelectedIndx] = React.useState(0);
  useEffect(() => {
    setUserDataDetail(selectedUser.contacts[selectedIndx]);
  }, [selectedIndx, selectedUser.contacts])
  const getNameOrMobileNumber = ({ contact }: { contact: any }) => {

    if (contact.firstName !== "" && contact.lastName !== "") {
        return `${contact.firstName} ${contact.lastName}`;
    } else {
        return contact.mobile.mnumber;
    }
};
  return (
    <>
      <Box className="user-block" >
        <Grid container>
          <Grid item xs={12} style={{ textAlign: "right", marginBottom: "15px" }}>
            <Tooltip title="Edit Contact" placement="left">
              <IconButton style={{ position: "relative", zIndex: 999 }}>
              <ModeEditOutlinedIcon />

              </IconButton>
            </Tooltip>
          </Grid>
          <Box className="profileCard" style={{ position: "relative" }}>

            <Grid item xs={12}>
              <Paper className="profileCardInner"  style={{ background: "#fff" }}>
                <Box className="userAvtarHolder">
                  {selectedUser.contacts.length > 1 &&
                    <Tooltip title="prev" placement="left">
                      <IconButton className="arrowIcon left" onClick={() => {
                        if (selectedIndx !== 0) {

                          setSelectedIndx(selectedIndx - 1);

                        } else {

                          setSelectedIndx(selectedUser.contacts.length - 1);

                        }
                      }} >  <ArrowBackIosIcon />  </IconButton>
                    </Tooltip>
                  }
                  <Avatar
                    variant="circular"
                    className="profileCardImage"
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                  />
                  {selectedUser.contacts.length > 1 &&
                    <Tooltip title="next" placement="right">
                      <IconButton className="arrowIcon right"  >  <ArrowForwardIosIcon onClick={() => {
                        if (selectedIndx !== selectedUser.contacts.length - 1) {

                          setSelectedIndx(selectedIndx + 1);
                        } else {

                          setSelectedIndx(0);

                        }
                      }} /> </IconButton>
                    </Tooltip>
                  }
                </Box>
                {selectedUser && userDataDetail && (
                  <Box >
                    <Grid container>
                      <Grid xs={12} item style={{ textAlign: "center" }}>
                        <Typography style={{
                          textAlign: "center",
                          fontSize: 20,
                          fontFamily: "Work Sans",
                          marginTop: 10,
                          marginBottom: 20,
                        }} >

                          {`${getNameOrMobileNumber(userDataDetail)}`}
                        </Typography>
                      </Grid>
                      <Grid xs={12} item >
                        <Box
                          className="profileCardText"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <MailOutlineSharpIcon />
                          {`${userDataDetail.contact.email} `}
                        </Box>

                        <Box
                          className="profileCardText"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        >
                          <LocalPhoneOutlinedIcon />

                          {`${userDataDetail.contact.mobile.mnumber} `}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>)}
              </Paper>
            </Grid>

          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper className="contactCrollPanel" style={{ background: "#EAF0FF", }} elevation={0} >
            {userDataDetail.contact?.thirdPartyDetails &&
              userDataDetail.contact.thirdPartyDetails.length > 0 &&
              userDataDetail.contact.thirdPartyDetails.map((t: any, indx: number) => {

                return (
                  <Accordion expanded={t.expanded} style={{borderRadius:"6px", marginBottom:"10px"}} elevation={0}>
                    <AccordionSummary

                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                        minHeight: "40px",
                        margin: "5px 0px !important"
                      }}
                    >
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          width: "100%",

                        }}
                      >
                        <img
                          width="30"
                          alt={"Logo"}
                          src={t.logo}

                          style={{ marginRight: "15px" }}
                        />
                        <Typography>



                          {`${t.Integration}`}
                        </Typography>
                      </div>
                      <Tooltip placement="top" title="Configure">
                        <SettingsOutlinedIcon style={{ color: "#AAB2B8" }} />
                      </Tooltip>
                      {t.expanded === true && (
                        <ExpandMoreIcon
                          onClick={() => {
                            updateExpanded(indx, selectedIndx, false);
                          }}
                        />
                      )}
                      {t.expanded === false && (
                        <ExpandLessIcon
                          onClick={() => {
                            updateExpanded(indx, selectedIndx, true);
                          }}
                        />
                      )}


                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid wrap="nowrap" spacing={0} container>
                        <Grid xs={1} style={{ minWidth: "40px" }}></Grid>
                        <Grid className="message-spacing">
                          <div>{t.gender}</div>
                          <div>{t.age}</div>
                          <div>{t.color}</div>
                          <div>{t.country}</div>

                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                )
              })
            }
          </Paper>
        </Grid>
      </Box>
    </>
  );
};

export default Contacts;



