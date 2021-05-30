import React, {useCallback, useEffect, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"
import "./TextEditorStyles.css"
import SockJsClient from "react-stomp";
import {getDomain} from "../../helpers/getDomain";
import { api, handleError } from '../../helpers/api';

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

  const saveDocument = () => {
    console.log('saving Document');
    try {
      const requestBody = JSON.stringify({
        id: sessionStorage.getItem('groupId'), 
        data: JSON.stringify(quill.getContents().ops)
      })
      console.log(requestBody)

      api.patch(`/documents/`, requestBody);

    } catch (error) {
      alert(`Something went wrong during saving document: \n${handleError(error)}`);
    }
  }

  async function loadDocument() {
    const response = await api.get(`/documents/${sessionStorage.getItem('groupId')}`);
    console.log(response)
    try {
      const contents = JSON.parse(response.data.data);
      console.log(contents);
      quill.setContents(contents);
    } catch (error) {
      alert(`Something went wrong during loading document: \n${handleError(error)}`);
    }

  }

  const sendMessage = (delta) => {
    clientRef.sendMessage(`/app/${sessionStorage.getItem("groupId")}/user-all`, JSON.stringify({
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
        <SockJsClient url={getDomain() + '/ws-document'}
                      topics={[`/topic/${sessionStorage.getItem("groupId")}/user`]}
                      onConnect={() => {
                        loadDocument();
                        console.log("connected");
                      }}
                      onDisconnect={() => {
                        console.log("Disconnected");
                        sessionStorage.setItem("socket", "disconnected")
                        saveDocument();

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