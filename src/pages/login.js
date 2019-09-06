import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';


import {Link} from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {Alert} from 'antd';
import {connect} from 'react-redux';
import { loginUser  } from '../store/actions/userAction';
const styles = {
    form:{
        textAlign:'center'
    },
    image:{
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '20px auto 20px auto'
    },
    textField:{
        margin: '10px auto 10px auto'
    },
    button:{
        marginTop:20,
        position:'relative'
    },
    progress:{
        position:'absolute'
    }
};
class login extends Component {
    state={
        email:'',
        password:'',
        errors:[]
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors) this.setState({errors:nextProps.UI.errors});
    }
    submitHandle = event =>{
        event.preventDefault();
        const {email,password}  = this.state;
        const credentials = {
            email:email,
            password:password
        };
        this.props.login(credentials,this.props.history);
    }
    changeHandle = event=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    render() {
        const {classes,UI:{loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    {errors.error?<Alert type="error" message="Wrong Credentials" closable showIcon />:null}
                    <form noValidate onSubmit={this.submitHandle} >
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                            value={this.state.email} onChange={this.changeHandle} 
                            helperText={errors.email}
                            error={errors.email? true:false}
                            fullWidth />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                            value={this.state.password}
                            helperText={errors.password}
                            error={errors.password? true:false}
                            onChange={this.changeHandle} fullWidth />   
                        <Button type="submit" variant="contained" disabled={loading} color="primary" className={classes.button } >
                            Login
                            {loading?<CircularProgress size={30} className={classes.progress} />:null}
                            </Button> 
                            <br/>
                            <br/>
                            <small>don't have an account <Link to="/signup">Sign Up</Link></small>       
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
};

login.proptype={
    classes:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    UI:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    user:state.user,
    UI:state.ui
});

const mapDispatchToProps = dispatch =>{
    return{
        login:(credentials,history)=>dispatch(loginUser(credentials,history))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(login));
