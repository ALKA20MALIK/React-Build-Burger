import React from 'react';
import classes from './DrawerToggle.css'
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary'

const drawerToggle = (props) => (
    <Auxiliary>
        <div className={classes.DrawerToggle} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>

        </div>
        {/* <div>
            <button>
                <img />
            </button>
        </div> */}
    </Auxiliary>


)

export default drawerToggle;
