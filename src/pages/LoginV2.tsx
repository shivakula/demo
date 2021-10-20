import * as React from 'react';
import Button from '@mui/material/Button';
import '../App.scss';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginImage from '../../src/assets/LoginImagev2.svg';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, FormHelperText, TextareaAutosize } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Visibility } from '@mui/icons-material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const useStyles = makeStyles({
  loginPageHolderMain: {
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 0px 17px #00000026 ",
    paddingLeft: "0px !important",
    paddingRight: "0px !important",
    "@media screen and (max-width: 960px)": {
      borderRadius: "5px",
      maxWidth: "600px",
    },
    "@media screen and (max-width: 767px)": {
      borderRadius: "5px",
      maxWidth: "95%",
    },

  },

  loginLogo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    top: "20px",
    left: "0px",
    background: "#EAF0FF",
    padding: "10px 50px 10px 15px",
    borderRadius: "0px 50px 50px 0px",

    "& p": {
      fontSize: "30px",
      fontWeight: 600,
      color: "#2D7DEC",
    },
  },

  loginPageHolder: {
    display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#EAF0FF",
  },

  loginBoxContainerGrid: {
    // minHeight:"600px",

  },

  loginBoxLeft: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: "0px 25px",
    height: "100%",
    "& img": {
      maxWidth: "70%",
      margin: "10px auto",

      "@media screen and (max-width: 960px)": {
        maxWidth: "50%",
      }

    },

  },

  loginBox: {
    maxWidth: "475px",
    padding: "25px",
    margin: "50px auto",
    justifyContent: "flex-start",

    "@media screen and (max-width: 960px)": {
      margin: "50px auto 20px",
    },


    "& h2": {
      fontSize: "50px",
      textAlign: "left",
      fontWeight: "400",
      marginBottom: 10,
      color: "#2D7DEC",
      marginTop: 40,
      "@media screen and (max-width: 960px)": {

        marginTop: 20,
      },
      "@media screen and (max-width: 767px)": {
        fontSize: "20px",
        marginTop: 40,
      },
    },


    "& h5": {
      fontSize: "15px",
      textAlign: "left",
      fontWeight: "400",
      paddingLeft: 10,
      marginBottom: 30,
      "@media screen and (max-width: 767px)": {
        fontSize: "12px",
        paddingLeft: 0,
      }
    },

    "& a": {
      textDecoration: "none",
      fontSize: "15px",
      color: "#2F7AE8",
      "@media screen and (max-width: 767px)": {
        fontSize: "12px",
      }


    },
  }

});



let encrypedData: any = '';
export default function LoginV2() {
  const classes = useStyles();
  const history = useHistory();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [privateData, setPrivateData]: any = useState('');
  const [privateDataError, setPrivateDataError] = useState('');
  const [privateKey, setPrivateKey]: any = useState('');
  const [showLogout, setShowLogout]: any = useState(false);
  function getKeyMaterial() {

    let enc = new TextEncoder();
    return window.crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (password.length === 0) {
      setPasswordError('Password is required');
      isValid = false;
    }
    if (email.length === 0) {
      setEmailError('Username is required');
      isValid = false;
    }



    if (isValid) {
      //NOTE: This prompts the user to enter a password.
      setShowTextArea(true)


    /*   if (localStorage.getItem("encrytedData")) {
        var enc = new TextEncoder(); // always utf-8
        let encrypted = enc.encode(localStorage.getItem("encrytedData") || '')
        
        let encoder = new TextEncoder();
        let decoder = new TextDecoder('utf-8');
        //let encDV = new DataView(encrypted);         // Bug: UTF-8 decoding damages the ciphertext
        //let ct = decoder.decode(encDV);
        let ct = ab2b64(encrypted);                    // Fix: Use a binary to text encoding like Base64
        console.log(ct.replace(/(.{48})/g, '$1\n'));

        // Decrypt the string

        //let encodedCiphertext = encoder.encode(ct);  // Bug: s. above
        let encodedCiphertext = b642ab(ct);            // Fix: s. above 

        let privcryptokey = await window.crypto.subtle.importKey(
          'jwk',
          privateKey,
          {
            name: "RSA-OAEP",
            hash: "SHA-256"
          },
          false,
          ["decrypt"]
        );

        console.log("Before decrypt");
        let decrypted = await window.crypto.subtle.decrypt(
          {
            name: "RSA-OAEP"
          },
          privcryptokey,
          encodedCiphertext
        );
        console.log("After decrypt");

        let decDV = new DataView(decrypted);
        let pt = decoder.decode(decDV);

        console.log(pt);
        setPrivateData(pt);
        setShowLogout(true);
      }*/
    } 

  };
  const decryptData = async () => {

    let encoder = new TextEncoder();
    let decoder = new TextDecoder('utf-8');

    // Generate a key pair

    let keyPair: any = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },
      true,
      ["encrypt", "decrypt"]
    );

    let publicKey = await window.crypto.subtle.exportKey('jwk', keyPair.publicKey);
    let privateKey = await window.crypto.subtle.exportKey('jwk', keyPair.privateKey);
    setPrivateKey(privateKey);
    // Encrypt a string

    let encodedSecret = encoder.encode(privateData);
    let pubcryptokey = await window.crypto.subtle.importKey(
      'jwk',
      publicKey,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      false,
      ["encrypt"]
    );

    let encrypted = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP"
      },
      pubcryptokey,
      encodedSecret
    );
    localStorage.setItem("encrytedData", encrypted);
    //let encDV = new DataView(encrypted);         // Bug: UTF-8 decoding damages the ciphertext
    //let ct = decoder.decode(encDV);
    let ct = ab2b64(encrypted);                    // Fix: Use a binary to text encoding like Base64
    console.log(ct.replace(/(.{48})/g, '$1\n'));

    // Decrypt the string

    //let encodedCiphertext = encoder.encode(ct);  // Bug: s. above
    let encodedCiphertext = b642ab(ct);            // Fix: s. above 

    let privcryptokey = await window.crypto.subtle.importKey(
      'jwk',
      privateKey,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      false,
      ["decrypt"]
    );

    console.log("Before decrypt");
    let decrypted = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP"
      },
      privcryptokey,
      encodedCiphertext
    );
    console.log("After decrypt");

    let decDV = new DataView(decrypted);
    let pt = decoder.decode(decDV);

    console.log(pt);

    setShowLogout(true);
    setPrivateData(pt);

  }
  // https://stackoverflow.com/a/11562550/9014097
  function ab2b64(arrayBuffer: any) {
    const data: unknown = new Uint8Array(arrayBuffer) as unknown;
    return btoa(String.fromCharCode.apply(null, data as number[]));
  }

  // https://stackoverflow.com/a/41106346 
  function b642ab(base64string: string) {
    return Uint8Array.from(atob(base64string), c => c.charCodeAt(0));
  }
  const handleSave = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let enc = new TextEncoder();
    // eslint-disable-next-line no-console
    let isValid = true;
    setPrivateData('');


    if (privateData.length === 0) {
      setPrivateData('Private Data is required');
      isValid = false;
    }




    if (isValid) {

      //NOTE: This prompts the user to enter a password.

      decryptData();


    }

  };
  return (
    <>

      <Box className={clsx(classes.loginPageHolder, 'loginPageHolder')} >
        <Container className={clsx(classes.loginPageHolderMain, 'loginPageHolderMain')} component="main" maxWidth="lg">


          <Grid container className={clsx(classes.loginBoxContainerGrid, 'loginBoxContainerGrid')}>
            <Grid item lg={6} md={6} sm={12} xs={12} style={{ background: "#7793bb", }} alignItems="center">
              <Box className={clsx(classes.loginBoxLeft, 'loginBoxLeft')}  >
                <img alt="Logo" src={LoginImage} />
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} alignItems="center" style={{ position: "relative" }}>
              <Box className={clsx(classes.loginBox, 'loginBox')}
                sx={{

                  display: 'flex',
                  flexDirection: 'column',

                }}
              >

                <Box className={clsx(classes.loginLogo, 'loginLogo')} >

                  <Typography variant="body2">
                    LOGO
                  </Typography>
                </Box>


                <Typography component="h2" variant="h2">
                  Welcome Back !
                </Typography>
                <Typography component="h5" variant="h5">
                  {showLogout === true ? <Button onClick={() => window.location.href = "/"} > Logout </Button> : <>   We missed you. Don't have an account yet? <Link href="/"> SignUP</Link>
                  </>}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  {
                    showTextArea ? <Grid container spacing={2}>


                      <Grid item xs={12}>
                        <FormControl error={passwordError.length > 0 ? true : false} fullWidth variant="outlined">
                          <InputLabel

                            style={{ background: "#fff", paddingLeft: 5, paddingRight: 5 }}
                            htmlFor="standard-adornment-password">Private Data</InputLabel>
                          <TextareaAutosize
                            id="standard-adornment-password"

                            onChange={(e) => {
                              setPrivateData(e.target.value);
                              setPrivateDataError('');
                              if (e.target.value.length === 0) {
                                setPrivateDataError('Private Data is required');

                              }
                            }}

                            value={privateData}
                          />
                          <FormHelperText id="component-error-text">{privateDataError}</FormHelperText>
                        </FormControl>


                      </Grid>


                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          size="large"
                          variant="contained"
                          style={{ minWidth: 150 }}
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                      :
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl error={emailError.length > 0 ? true : false} fullWidth variant="outlined">
                            <InputLabel style={{ background: "#fff", paddingLeft: 5, paddingRight: 5 }} htmlFor="standard-adornment-EmailAddress">Email Address</InputLabel>
                            <OutlinedInput onChange={(e) => {
                              setEmail(e.target.value);
                              setEmailError('');
                              if (e.target.value.length === 0) {
                                setEmailError('Username is required');

                              }
                            }} id="standard-adornment-EmailAddress" />
                            <FormHelperText id="component-error-text">{emailError}</FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <FormControl error={passwordError.length > 0 ? true : false} fullWidth variant="outlined">
                            <InputLabel

                              style={{ background: "#fff", paddingLeft: 5, paddingRight: 5 }}
                              htmlFor="standard-adornment-password">Password</InputLabel>
                            <OutlinedInput
                              id="standard-adornment-password"
                              type={passwordVisibility === true ? "text" : "password"}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError('');
                                if (e.target.value.length === 0) {
                                  setPasswordError('Password is required');

                                }
                              }}

                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                                    aria-label="toggle password visibility"
                                  >
                                    {passwordVisibility === false ? <VisibilityOffIcon /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            <FormHelperText id="component-error-text">{passwordError}</FormHelperText>
                          </FormControl>


                        </Grid>


                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            style={{ minWidth: 150 }}

                          >
                            Login
                          </Button>
                        </Grid>
                      </Grid>
                  }               </Box>
              </Box>
            </Grid>
          </Grid>


        </Container>



      </Box>
    </>
  );
}