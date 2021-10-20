import "./Chat.scss";
import React, { useState } from "react";
import {
    Box, AppBar, Toolbar, IconButton, List,
    ListItemAvatar, Divider, TextareaAutosize, Avatar, ListItemText, Tooltip, Hidden
} from "@mui/material";
import {
    Check, Block, ArrowBackIos, ArrowForwardIos, SendOutlined, ContactsOutlined, Archive
} from '@mui/icons-material';
import ChatButtonsHolder from "./ChatButtonsHolder";
import ChatButtons from "./ChatButtons";



const Chat = (props: any) => {
    const {
        open,
        handleDrawerOpen,
        handleDrawerClose,
        archiveChat,
        updateBlockStatus,
        selectedUser,
        conversationList,
        handleConversationList
    } = props || {}
    const [txtMessage, setTxtMessage] = useState('');
    const getNameOrMobileNumber = (userid: any) => {

        let { contact }: { contact: any } = conversationList.find((c: any) => c.userId === userid);

        if (contact.firstName !== "" && contact.lastName !== "") {
            return `${contact.firstName} ${contact.lastName}`;
        } else {
            return contact.mobile.mnumber;
        }
    };
    return (

        <Box className="chat-grid">
            <AppBar color="default" elevation={0} position="absolute" style={{ background: "#fff" }}>
                <Toolbar
                    style={{

                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                     <Box >
                        <Hidden smUp={true} > <IconButton  onClick={handleConversationList} ><ArrowBackIos /></IconButton></Hidden>
                    </Box>
                   
                    <Box style={{
                        textAlign: "right",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}>
                        {selectedUser.archive === false &&
                            <>
                                <Tooltip title="Archive Chat" placement="bottom">
                                    <IconButton >
                                        <Archive onClick={archiveChat} />
                                    </IconButton>
                                </Tooltip>
                                {
                                    selectedUser.block === false &&
                                    <Tooltip title="Block Chat" placement="bottom">
                                        <IconButton>
                                            <Block onClick={() => {
                                                updateBlockStatus()
                                            }} />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </>
                        }
                        <Hidden smDown={true}>
                            <Tooltip placement="bottom" title={open === true ? "Hide Right Panel" : "Show Right Panel"}>
                                <IconButton>
                                    {open === true ? <ArrowForwardIos onClick={handleDrawerClose} /> : <ArrowBackIos onClick={handleDrawerOpen} />}
                                </IconButton>
                            </Tooltip>
                        </Hidden>
                    </Box>


                </Toolbar>
            </AppBar>

            <Box className="chatBoxHolder"  >


                {
                    selectedUser.messages && selectedUser.messages.map((cht: any) => {
                        console.log(selectedUser.userId === cht.userId)
                        return (
                            <Box className={`chatSection ${selectedUser.userId === cht.userId && 'right'} `}>
                                <List className="chatBox">
                                    <Box className="messageInfoBox">
                                        <ListItemAvatar>
                                            {" "}
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="https://material-ui.com/static/images/avatar/1.jpg"
                                            />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <div className="messageInfoUser">
                                                <span>{getNameOrMobileNumber(cht.userId)}</span>
                                                <span>9.30 AM</span>
                                            </div>
                                        </ListItemText>
                                    </Box>
                                    <Box className="messageBoxBlue" borderRadius={2}>
                                        {cht.message}
                                    </Box>
                                    <Box style={{ textAlign: "right" }}>
                                        <Check className="tickGreen" />
                                    </Box>
                                </List> </Box>)
                    })
                }




            </Box>

            {
                selectedUser.block === false && selectedUser.archive === false && (
                    <Box className="bottomChatSectionHolder">
                        <Divider style={{ maxWidth: "100%" }} />
                        <Box
                            className="bottomChatSectionInner"
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "flex-end",
                                padding: "10px 0px 0px",
                            }}
                        >
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "flex-start",
                                }}
                            >

                                <Hidden mdUp={true}> <ChatButtonsHolder /></Hidden>

                                <Hidden mdDown={true}> <ChatButtons /></Hidden>

                            </Box>
                            <Box
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginRight: 5,
                                    position: "relative",
                                }}
                                sx={{ flexGrow: 1 }}
                            >
                                <TextareaAutosize
                                    aria-label="Type a message..."
                                    className="textChatSection"

                                    minRows={1}
                                    maxRows={3}
                                    placeholder="Type a message..."
                                    maxLength={200}
                                    value={txtMessage}
                                    onChange={(e) => setTxtMessage(e.target.value)} />
                                <span className="HelperTextChat">
                                    3 segments ({`${200 - txtMessage.length} characters remaining`})
                                </span>
                            </Box>
                            <Box
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-center",
                                    alignItems: "flex-center",
                                }}
                            >
                                <IconButton>
                                    <Tooltip placement="top" title="Send">
                                        <SendOutlined style={{ color: "#000" }} />
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                )
            }

        </Box>

    );
};

export default Chat;
