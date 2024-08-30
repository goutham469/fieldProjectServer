import React, { useState, useEffect } from 'react';

function ChatTime(props) {
    const [final, setFinal] = useState("");
    const [errMsg,setErrMsg] = useState('')
    
    let dateString = props.time;

    
    useEffect(() => {


        try
        {
            // Manually parse the date string
            const dateParts = dateString.split(' ');
            console.log(dateParts)
            const timeParts = dateParts[4].split(':');
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames.indexOf(dateParts[1]);
            const day = parseInt(dateParts[2], 10);
            const year = parseInt(dateParts[3], 10);
            const hour = parseInt(timeParts[0], 10);
            const minute = parseInt(timeParts[1], 10);
            const second = parseInt(timeParts[2], 10);

            // Get the current date and time manually
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();
            const currentHour = currentDate.getHours();
            const currentMinute = currentDate.getMinutes();
            const currentSecond = currentDate.getSeconds();

            // Convert both dates to seconds since epoch
            const secondsInYear = 60 * 60 * 24 * 365;
            const secondsInMonth = 60 * 60 * 24 * 30;
            const secondsInDay = 60 * 60 * 24;
            const secondsInHour = 60 * 60;
            const secondsInMinute = 60;

            const targetTimeInSeconds = 
                second +
                minute * secondsInMinute +
                hour * secondsInHour +
                day * secondsInDay +
                month * secondsInMonth +
                year * secondsInYear;

            const currentTimeInSeconds =
                currentSecond +
                currentMinute * secondsInMinute +
                currentHour * secondsInHour +
                currentDay * secondsInDay +
                currentMonth * secondsInMonth +
                currentYear * secondsInYear;

            const timeDifferenceInSeconds = currentTimeInSeconds - targetTimeInSeconds;

            let displayTime = "";

            if (timeDifferenceInSeconds < 60) {
                displayTime = `${timeDifferenceInSeconds} seconds ago`;
            } else if (timeDifferenceInSeconds < 60 * 60) {
                displayTime = `${Math.floor(timeDifferenceInSeconds / 60)} minutes ago`;
            } else if (timeDifferenceInSeconds < 60 * 60 * 24) {
                displayTime = `${Math.floor(timeDifferenceInSeconds / (60 * 60))} hours ago`;
            } else if (timeDifferenceInSeconds < 60 * 60 * 24 * 30) {
                displayTime = `${Math.floor(timeDifferenceInSeconds / (60 * 60 * 24))} days ago`;
            } else if (timeDifferenceInSeconds < 60 * 60 * 24 * 365) {
                displayTime = `${Math.floor(timeDifferenceInSeconds / (60 * 60 * 24 * 30))} months ago`;
            } else {
                displayTime = `${Math.floor(timeDifferenceInSeconds / (60 * 60 * 24 * 365))} years ago`;
            }

            setFinal(displayTime);
        }
        catch(err)
        {
            setErrMsg(err)
        }

        if(errMsg)
        {
            try
            {
                const date = props.time;
                const cur_date = new Date();

                const cur_sec = cur_date.getSeconds();
                const cur_min = cur_date.getMinutes();
                const cur_hour = cur_date.getHours();
                const cur_day = cur_date.getDate();
                const cur_month = cur_date.getMonth();
                const cur_year = cur_date.getFullYear();

                const cur_stamp = 
                    cur_sec +
                    cur_min * 60 +
                    cur_hour * 60 * 60 +
                    cur_day * 60 * 60 * 24 +
                    cur_month * 60 * 60 * 24 * 30 +
                    cur_year * 60 * 60 * 24 * 30 * 12;

                const [timePart, datePart] = date.split(":");
                const [seconds, minutes, hours] = timePart.split("-").map(Number);
                const [days, months, years] = datePart.split("-").map(Number);

                const projected_time =
                    seconds +
                    minutes * 60 +
                    hours * 60 * 60 +
                    days * 60 * 60 * 24 +
                    months * 60 * 60 * 24 * 30 +
                    years * 60 * 60 * 24 * 30 * 12;

                const timeDifference = cur_stamp - projected_time;

                let displayTime = "";

                if (timeDifference < 60) {
                    displayTime = `${timeDifference} seconds ago`;
                } else if (timeDifference < 60 * 60) {
                    displayTime = `${Math.floor(timeDifference / 60)} minutes ago`;
                } else if (timeDifference < 60 * 60 * 24) {
                    displayTime = `${Math.floor(timeDifference / (60 * 60))} hours ago`;
                } else if (timeDifference < 60 * 60 * 24 * 30) {
                    displayTime = `${Math.floor(timeDifference / (60 * 60 * 24))} days ago`;
                } else if (timeDifference < 60 * 60 * 24 * 30 * 12) {
                    displayTime = `${Math.floor(timeDifference / (60 * 60 * 24 * 30))} months ago`;
                } else {
                    displayTime = `${Math.floor(timeDifference / (60 * 60 * 24 * 30 * 12))} years ago`;
                }

                setFinal(displayTime);
            }
            catch(err)
            {
                console.log(err)
                setFinal("")
            }
        }








    }, [dateString]);

    return <div style={{fontSize:"12px"}}>-{final}</div>;
}



export default ChatTime;
