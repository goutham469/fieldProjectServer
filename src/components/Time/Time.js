import React, { useState, useEffect } from 'react';

function Time(props) {
    const [final, setFinal] = useState("");

    useEffect(() => {
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

            const [timePart, datePart] = date.split("--");
            const [seconds, minutes, hours] = timePart.split(":").map(Number);
            const [days, months, years] = datePart.split(":").map(Number);

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
        }

        
    }, [props.time]);

    return <div style={{fontSize:"12px"}}>-{final}</div>;
}

export default Time;
