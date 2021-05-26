import React, {useCallback, useEffect, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"
import "./TextEditorStyles.css"
import SockJsClient from "react-stomp";

/*
TODO: fix bug, where input is duplicated...
 1) every change is sent to the server an thus received by the author too, duplicating his code
 2) non-authors have the text inserted on new lines, even though deltas are the same (see logs in lines 43,77)

 for further reference check out: https://www.youtube.com/watch?v=iRaelG7v0OU&t=1856s

 */

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export const TextEditor = () =>{
  const [quill, setQuill] = useState();
  const [clientRef, setClientRef] = useState();
  const [message, setMessage] = useState('You server message here.');

  // sends each change to the backend
  const sendMessage = (delta) => {
    console.log("Message sending")
    clientRef.sendMessage('/app/user-all', JSON.stringify({
      name: "some name",
      message: JSON.stringify(delta)
    }));
    console.log("Message sending v2");
  }

  //
  useEffect(() => {
    console.log("Use effect executed");
    console.log(quill);
    console.log(clientRef);
    if (clientRef == null || quill == null) return
    console.log(" Use effect if statement passed");
    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return
      console.log(delta)
      //sendMessage(delta)
    }
    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    }
  }, [clientRef, quill])

  const wrapperRef= useCallback(wrapper => {
    console.log("Wrapper Ref executed");
    if (wrapper == null) return
    console.log("Wrapper Ref if statement executed");
    wrapper.innerHTML = ""
    const editor = document.createElement(("div"))
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    setQuill(q);
  }, [])

  let onMessageReceived = (msg) => {
    console.log(JSON.parse(msg.message));
    setMessage(msg.message);
  }


  return (
      <div className="container" ref={wrapperRef}>
          <SockJsClient url='http://localhost:8080/websocket-chat'
                        topics={['/topic/user']}
                        onConnect={console.log("Connected!!")}
                        //onDisconnect={console.log("Disconnected!")}
                        //onMessage={msg => onMessageReceived(msg)}
                        ref={(client) => {
                          setClientRef(client);
                          console.log("Client Ref set");
                        }}
          />

      </div>

  )
}