import { SET_ERRORS,SET_USER,CLEAR_ERRORS,LOADING_UI, SET_UNAUTHENTICATED ,LOADING_USER,MARK_NOTIFICATIONS_READ } from '../types';

import axios from 'axios';

export const loginUser = (credentials,history) => {
    return dispatch=>{
        dispatch({type:LOADING_UI});
        console.log(credentials);
        axios.post('/login',credentials)
            .then(res=>{
                setAuthoriationHeaders(res.data.token);
                dispatch(getUserData());
                dispatch({type:CLEAR_ERRORS});
                history.push('/');
            })
            .catch(error=>{
                console.log(error);
                dispatch({type:SET_ERRORS,payload:error.response.data});   
            });
    }

};
export const signup = (newUserData,history) => {
    return dispatch=>{
        dispatch({type:LOADING_UI});
        axios.post('/signup',newUserData)
            .then(res=>{
                setAuthoriationHeaders(res.data.token);
                dispatch(getUserData());
                dispatch({type:CLEAR_ERRORS});
                history.push('/');
            })
            .catch(error=>{
                console.error(newUserData);
                dispatch({type:SET_ERRORS,payload:error.response.data});   
            });
    }

};

export const getUserData = () =>(dispatch)=> {
    dispatch({type:LOADING_USER});
    axios.get('/user')
        .then(res=>{
            dispatch({type:SET_USER,payload:res.data});
        })
        .catch(error=>console.log(error));
};

export const uploadImage =(formData)=>(dispatch)=>{
    dispatch({type:LOADING_USER});
    axios.post('/user/image',formData)
        .then(()=>{
            dispatch(getUserData());
        })
        .catch(err=>console.error(err));
};

export const editUserDetails = userDetails=>dispatch=>{
    dispatch({type:LOADING_USER});
    axios.post('/user',userDetails)
        .then(()=>{
            dispatch(getUserData());
        })
        .catch(err=>console.error(err));
};

export const logoutUser = ()=> (dispatch)=>{
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type:SET_UNAUTHENTICATED});
};
export const markNotificationsRead = (notificationIds) => (dispatch) => {
    axios
      .post('/notifications', notificationIds)
      .then((res) => {
        dispatch({
          type: MARK_NOTIFICATIONS_READ
        });
      })
      .catch((err) => console.log(err));
  };

const setAuthoriationHeaders = (idToken) =>{
    const token = `Bearer ${idToken}`;
    localStorage.setItem('FBIdToken',token);
    axios.defaults.headers.common['Authorization']=token;
};