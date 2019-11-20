import React from 'react';
import SideNav from '../nav'
import { Button } from 'react-bootstrap';
import SplitView from "./SplitView";



class Profile extends React.Component{

    render() {
        return (
            <SideNav>
            <div class="row">
                <div class="col-md-6">
                    <Button style={{borderRadius: '25px', width: 100}} variant="outline-secondary">Cancel</Button>
                    <Button style={{borderRadius: '25px', float: 'right' , width: 100}} variant="success">Done</Button>
                    
                    <p></p>
                    <div class="row">
                                <img     style={{width: 100, height: 100, borderRadius: '25px'}} 
                                src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg">
                                </img>
                            <p style={{}}>
                                Name : Jackie Chan//              
                            </p>
                            <p>
                            Username : Jackie Chan......................                
                            </p>
                            
                            <div className='custom-control custom-switch'>
                                <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitchesChecked'
                                defaultChecked
                                />
                                <label  className='custom-control-label' htmlFor='customSwitchesChecked'>
                                Private Profile
                                </label>
                                </div>
                            </div>
                            Change Profile Photo
                        
                </div>    
            
                <div class="col-md-6">
                 Right Side
                
                </div>    
            </div>
            
           <hr></hr>
                
 
            
            </SideNav>
        );
    }
}

export default Profile;