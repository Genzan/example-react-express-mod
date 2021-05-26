import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Web3 from 'web3';
import Loading from './loading';
import Users from './Users.js';

const web3 = new Web3(magic.rpcProvider);
const usersObj = new Users();
let control = false; // Unicamente para evitar el StrictMode, quitar en Produccion

const getData = async (_user) => {
  if (typeof(_user) !== 'undefined' && control === false) {
    control = true;
    console.log("USER",_user);
    await updateUser(_user.email);
  } else {
    console.log('Undefined or Already in');
    control = false;
  }
}

const updateUser = async (_userAddress) => {
  let creds = await usersObj.loginUser(_userAddress);
  console.log("CREDS",creds);
}

const Profile = () => {
  const history = useHistory();
  const [user] = useContext(UserContext);

  // Redirect to login page if not loading and no user found
  useEffect(() => {
    user && !user.loading && !user.issuer && history.push('/login');
  }, [user, history]);

  getData(user);

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
            <div className='label'>Email</div>
            <div className='profile-info'>{user.email}</div>

            <div className='label'>User Id</div>
            <div className='profile-info'>{user.issuer}</div>

            <div className='label'>Address</div>
            <div className='profile-info'>{user.issuer}</div>
          </>
        )
      )}
      <style>{`
        .label {
          font-size: 12px;
          color: #6851ff;
          margin: 30px 0 5px;
        }
        .profile-info {
          font-size: 17px;
          word-wrap: break-word;
        }
      `}</style>
    </>
  );
};

export default Profile;
