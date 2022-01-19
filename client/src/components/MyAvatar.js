import {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
// hooks

//
import { MAvatar } from './@material-extend';
import createAvatar from '../utils/createAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const user = useSelector(state => state.auth.user);
  const [avatar, setAvatar] = useState('https://gravatar.com/avatar/efb6ffa97343cc5ce16274b335877dbd?d=mm&r=pg&s=200');
  useEffect(()=>{
    if(user?.avatar){
      setAvatar(`http://localhost:5000/${user.avatar}`);
    }else{
      setAvatar('https://gravatar.com/avatar/efb6ffa97343cc5ce16274b335877dbd?d=mm&r=pg&s=200');
    }
  },[user?.avatar])
  // console.log(user?.avatar);
  return (
    <MAvatar
      src={avatar}
      alt={user?.firstName}
      // color={user.photoURL ? 'default' : createAvatar(user.displayName).color}
      {...other}
      sx={{border:'1px solid #c5c5c5'}}
    >
      {createAvatar(user?.firstName).name}
    </MAvatar>
  );
}
