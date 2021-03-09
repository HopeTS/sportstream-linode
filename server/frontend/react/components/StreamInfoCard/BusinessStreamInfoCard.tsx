import React, {useEffect} from 'react';


/** Business stream info card */
function BusinessStreamInfoCard(props) {


    useEffect(() => {
        console.log(props)
    }, [])
    

    return (
        <div className="StreamInfoCard" data-type="business">
            <section>
                <p className="StreamInfoCard__field">{props.field}</p>
                <p className="StreamInfoCard__status">{props.status}</p>
                <p className="StreamInfoCard__key">{props.streamKey}</p>
            </section>
        </div>
    );
};


export = BusinessStreamInfoCard;