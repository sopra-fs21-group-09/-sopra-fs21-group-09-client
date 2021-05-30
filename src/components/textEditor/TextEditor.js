import React, {useCallback, useEffect, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"
import "./TextEditorStyles.css"
import SockJsClient from "react-stomp";
import {getDomain} from "../../helpers/getDomain";

/*
TODO: fix bug, where input is duplicated...
 every change is sent to the server an thus received by the author too, duplicating his code
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

export default function TextEditor() {
  const [quill, setQuill] = useState()
  const [clientRef, setClientRef] = useState()

  const sendMessage = (delta) => {
    clientRef.sendMessage('/app/user-all', JSON.stringify({
      name: sessionStorage.getItem("token"),
      message: JSON.stringify(delta)
    }));
  }

  useEffect(() => {
    if (clientRef == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return
      console.log(delta)
      sendMessage(delta)
    }
    quill.on('text-change', handler)

    return () => {
      quill.off('text-change', handler)
    }
  }, [clientRef, quill])

  const wrapperRef= useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement(("div"))
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    setQuill(q)
  }, [])

  return (
      <div className="container" ref={wrapperRef} >
        <SockJsClient url={getDomain() + '/websocket-chat'}
                      topics={['/topic/user']}
                      onConnect={() => {
                        console.log("connected");
                      }}
                      onDisconnect={() => {
                        console.log("Disconnected");
                      }}
                      onMessage={(msg) => {
                        if (msg.name !== sessionStorage.getItem("token")){
                          console.log(JSON.parse(msg.message))
                          quill.updateContents(JSON.parse(msg.message))
                        }
                      }}
                      ref={(client) => {
                        setClientRef(client)
                      }}
        />
      </div>
  )
}