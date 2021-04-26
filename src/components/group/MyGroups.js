import React, {useState, useEffect} from "react";
import {Group} from "./Group";

export function MyGroups(){
    const [userID, setUserID] = useState('userID')

    useEffect(()=>{
        //const response = await api.get('/users/'+ userID);
    })

    return (
        <div>
        <Group></Group>
        </div>
    )

    /*return <div>
        {response.groups.map(group => {
            return (
                //groups
            );
        })}
    </div>*/
}