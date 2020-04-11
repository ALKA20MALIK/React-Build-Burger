import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const sideDrawer = (porps) => {

    let attachedClasses=[classes.SideDrawer,classes.Close]

    if(porps.open){
        attachedClasses=[classes.SideDrawer,classes.Open]
    }
    
    return (
        <Auxiliary>
            <Backdrop show={porps.open} clicked={porps.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    )
}

export default sideDrawer;