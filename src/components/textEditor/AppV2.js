import React, {Component} from 'react';
//import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import SockJsClient from "react-stomp";
//import j from 'jsondiffpatch'

class AppV2 extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    id: "test"
  }

  handleMessage = (data) => {
    if (!data) return
    let nextContentState = convertFromRaw(data)
    this.setState({
      editorState: EditorState.push(this.state.editorState, nextContentState)
    })
  }

  sendMessage = (editorState) => {
    this.clientRef.sendMessage('/app/user-all', JSON.stringify({
      name: this.state.id,
      message: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    }));
  };

  onChange = editorState => {
    this.sendMessage(editorState)
    this.setState({ editorState })
  }

  render () {
    return (
        <div>
          <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
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
                          this.handleMessage(JSON.parse(msg.message))
                          console.log(JSON.parse(msg.message))
                        }}
                        ref={(client) => {
                          this.clientRef = client
                        }}/>
        </div>
    )
  }
}

export default AppV2;