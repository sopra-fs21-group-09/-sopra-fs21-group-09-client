import React, { Component } from "react";
import SockJsClient from "react-stomp";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';


class AppV3 extends Component {

  constructor(props) {
    super(props);

    this.modules = {
      toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ]
    };

    this.formats = [
      'font',
      'size',
      'bold', 'italic', 'underline',
      'list', 'bullet',
      'align',
      'color', 'background'
    ];

    this.state = {
      id: "test",
      content: '',
      editor: {}
    }

    this.rteChange = this.rteChange.bind(this);
  }

  handleMessage = (data) => {
    if (!data) return
    this.state.editor.updateContents(data)
  }

  sendMessage = (delta) => {
    this.clientRef.sendMessage('/app/user-all', JSON.stringify({
      name: this.state.id,
      message: JSON.stringify(delta)
    }));
  }

  rteChange = (content, delta, source, editor) => {
    /*    console.log(editor.getHTML()); // rich text
        console.log(editor.getText()); // plain text
        console.log(editor.getLength()); // number of characters*/
    this.sendMessage(delta)
    this.setState({editor, content})
    console.log(this.state.editor)
  }

  render () {
    return (
        <div>
          <ReactQuill theme="snow"  modules={this.modules}
                      formats={this.formats} onChange={this.rteChange}
                      value={this.state.content}
          />
          <SockJsClient url='http://localhost:8080/websocket-chat/'
                        topics={['/topic/user']}
                        onConnect={() => {
                          console.log("connected");
                        }}
                        onDisconnect={() => {
                          console.log("Disconnected");
                        }}
                        onMessage={(msg) => {
                          //this.handleMessage(JSON.parse(msg.message))
                          console.log(JSON.parse((msg.message)))
                        }}
                        ref={(client) => {
                          this.clientRef = client
                        }}/>
        </div>
    )
  }
}

export default AppV3;
