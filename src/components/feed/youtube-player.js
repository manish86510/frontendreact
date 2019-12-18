import React from 'react';
import { PropTypes } from 'prop-types';


class YoutubePlayer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            video_url: this.convertUrl(props.video_url)
        };
    }

    convertUrl = (url)=>{
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        var video_id = (match && match[2].length === 11)
          ? match[2]
          : null;
        if(video_id!=null){
            return "https://www.youtube.com/embed/"+video_id;
        }

    }

    render(){
        return(
            <div className={"video-responsive"}>
                <iframe 
                width="811" 
                height="456" 
                src={this.state.video_url} 
                frameborder="0" 
                allow="autoplay; encrypted-media; gyroscope;" 
                allowfullscreen
                ></iframe>
            </div>
        );
    }
}

YoutubePlayer.propTypes = {
    video_url: PropTypes.string.isRequired,
};
export default YoutubePlayer;