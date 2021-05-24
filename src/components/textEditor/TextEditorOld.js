import React, { useEffect } from 'react';
import * as SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import richText from 'rich-text';


let stompClient = null;

let currChar = String;

// Connect function, groupId with props
function connect(id) {


    let socket = new SockJS('http://localhost:8080/ws');


    stompClient = Stomp.overWS(socket);

    stompClient.connect({'groupId': id}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/' + id + '.public.messages', function (sharedDoc) {
            // Show the existing group document
            showSharedDoc(JSON.parse(sharedDoc.body));
        });
    }, function () {})
};

// Disconnect from server, probably gonna be executed with the back button
function disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

// Sends the string to backend, which distributes it to other group members
function sendData(id) {

    let payload = JSON.stringify({groupId : id, char: currChar});
    stompClient.send("/app/", {}, payload);
    currChar = String;
};

function showSharedDoc(){

}

function TextEditorOld(props) {

    connect(props.children);

    return (
        <div style={{ margin: '5%', border: '1px solid' }}>
            <div id='editor'> Halloo </div>
        </div>
    );
}

export default TextEditorOld;