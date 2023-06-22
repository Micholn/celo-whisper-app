import React, { useEffect, useState } from 'react';
import { createIdentity, createChannel, sendMessage, onMessage } from './Whisper';

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  let identity = null;
  let channel = null;

  useEffect(() => {
    const setup = async () => {
      identity = await createIdentity();
      channel = await createChannel(identity);

      onMessage(channel, (newMessage) => {
        setMessages(oldMessages => [...oldMessages, newMessage]);
      });
    }

    setup();
  }, []);

  const handleSend = async () => {
    await sendMessage(identity, message);
    setMessage("");
  }

  return (
    <div>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSend}>Send</button>
      {messages.map((msg, i) => <p key={i}>{msg}</p>)}
    </div>
  );
}

export default App;
