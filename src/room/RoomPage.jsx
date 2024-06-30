import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate } from "react-router-dom";
import Home from '../App';

const RoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const url = 'http://localhost:5173/';
    const [redirectTo, setRedirectTo] = React.useState(null); 


    const myMeeting = async (element) => {
        const appID = 230674519;
        const serverSecret = '64a9d09c00e28e3dd24a0eb61ae372be';
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), "Person");
        const zc = ZegoUIKitPrebuilt.create(kitToken);

        zc.joinRoom({
            
            container: element,
            sharedLinks: [
                {
                    name: 'Copy Link',
                    url: `http://localhost:5173/room/${roomId}`
                }
            ], showLeaveRoomConfirmDialog: true,
            
            // onReturnToHomeScreenClicked: (() =>
            // // window.location.href = url
            // navigate(url)
            // ),
            onLeaveRoom: (()=>Home),
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
                
            },
            
            showScreenSharingButton: false,

        })
    }

    return (
        <>
            <div>
                <div ref={myMeeting} />
            </div>
        </>
    );
};

export default RoomPage;