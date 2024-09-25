import React, {useState, useEffect} from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

 function TimeProgressBar({duration}) {
    const [timeEslapse, setTimeEslapse] = useState(0);
    const [timeLabel, setTimeLabel] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);

    let totalDuration = duration*60;// change to secs

    useEffect(()=>{
        let interval = setInterval(()=>{
            setTimeEslapse(prev=>prev+1);
            setTimeLabel(Math.floor(timeEslapse/60));
            setProgressPercentage( prev=> prev + 1*100/(totalDuration))
        }, 1000); //Will call tick every second

        return ()=>{clearInterval(interval)}; 
    });
    
    useEffect(()=>{
        setProgressPercentage(timeEslapse*100/totalDuration)
    },[duration]);
    

    return (
        <ProgressBar animated now={progressPercentage} 
            label= {timeLabel===0? '' : timeLabel===1?'1 min' : `${timeLabel} mins`}/>
    )
}


export default TimeProgressBar;