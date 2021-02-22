import React, { useEffect, useRef, useState, createContext } from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import "./widgets/Menu.js";
import GlobalStyles from "./themes/GlobalTheme.js";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import sendIco from "./sendIco.svg";
import Menu from "./widgets/Menu.js";

import { light } from "./themes/mainTheme.js";

export const UserContext = createContext({});

firebase.initializeApp({
  apiKey: "AIzaSyDFoov4nBAQiN_McOyiaO2tfqp58H6N1po",
  authDomain: "paweloo-chat.firebaseapp.com",
  databaseURL: "https://paweloo-chat.firebaseio.com",
  projectId: "paweloo-chat",
  storageBucket: "paweloo-chat.appspot.com",
  messagingSenderId: "156728413226",
  appId: "1:156728413226:web:3274e2c1f22024a36f4753",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <h2 className="welcomeText">Welcome to</h2>
      <h1 className="welcomeText welcomePc">Paweloo Chat</h1>
      <button onClick={signInWithGoogle} className="signInButton">
        Sign in with Google
      </button>
    </>
  );
}

function SignOut() {
  auth.currentUser && auth.signOut();
}

function ChatRoom() {
  const dummy = useRef();

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const [settingsVisibility, setSettingsVisibility] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behaviour: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const showSettings = () => {
    setSettingsVisibility(!settingsVisibility);
  };

  const [theme, setTheme] = useState(light);

  return (
    <UserContext.Provider value={[theme, setTheme]}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <header>
          Paweloo Chat
          <button className="settingsProfileButton" onClick={showSettings}>
            <img
              src={auth.currentUser.photoURL}
              alt="Profile"
              className="settingsProfile"
            />
            <div className="isOnline" />
          </button>
          {settingsVisibility && (
            <Menu name={auth.currentUser.displayName} onClick={SignOut} />
          )}
        </header>
        <main>
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

          <div ref={dummy}></div>
        </main>

        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            required
          />
          <button type="submit" className="sendButton">
            <img src={sendIco} alt="Send" className="sendIcon" />
          </button>
        </form>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img className="profilePhoto" alt="Profile" src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export default App;
