import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../lib/UserContext';
import { magic } from '../lib/magic';
import Web3 from 'web3';
import Loading from './loading';

const web3 = new Web3(magic.rpcProvider);

const getData = async () => {
  //const network = await web3.eth.net.getNetworkType();
  //console.log("Network",network);
  const userAddress = (await web3.eth.getAccounts())[0];
  console.log("userAddress",userAddress);
  /*const userBalance = web3.utils.fromWei(
    await web3.eth.getBalance(userAddress) // Balance is in wei
  );
  console.log("userBalance",userBalance);*/
  updateUser();
}

const updateUser = async () => {
  const contractAddressRinkeby = "0xe652135baeF1b5b22E662e8120A50aE947119092"; //Rinkeby
  const contractAddressCIIAN = "0x6983DEd5D97AEF64FA76682610CC9104039Bd528"; //CIIAN
  const contractABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_perfilHash","type":"string"}],"name":"PerfilAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_perfilHash","type":"string"}],"name":"PerfilUpdated","type":"event"},{"inputs":[{"internalType":"string","name":"_perfilHash","type":"string"}],"name":"updateUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserData","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"isUserActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]';
  const fromAddress = (await web3.eth.getAccounts())[0];
  const newMessage = "Indra";
  const contract = new web3.eth.Contract(
    JSON.parse(contractABI),
    contractAddressCIIAN
  );
  try{
  await contract.methods
    .updateUser(newMessage)
    .send({ from: fromAddress })
    .on('receipt', function(receiptTran){
      console.log("Completed:", receiptTran);
    });
  } catch {
    console.log("Send");
  }
}

const Profile = () => {
  const history = useHistory();
  const [user] = useContext(UserContext);

  // Redirect to login page if not loading and no user found
  useEffect(() => {
    user && !user.loading && !user.issuer && history.push('/login');
  }, [user, history]);

  getData();

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
