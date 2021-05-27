import Web3 from 'web3';

const contractAddress = "0x4b0ED1151b7974E8A446094297783aC99f6116F1";
const contractABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_perfilHash","type":"string"}],"name":"PerfilAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_perfilHash","type":"string"}],"name":"PerfilUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"assingNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_mail","type":"string"},{"internalType":"address","name":"_perfilAddress","type":"address"},{"internalType":"string","name":"_privateKey","type":"string"}],"name":"createUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserData","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_mail","type":"string"}],"name":"getUserIdentity","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"isUserActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_perfilHash","type":"string"}],"name":"updateUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_mail","type":"string"}],"name":"userExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]';
const web3 = new Web3(
    new Web3.providers.HttpProvider("https://blockchain.iagrinet.com")
);
const contract = new web3.eth.Contract(
    JSON.parse(contractABI),
    contractAddress
);

export default class APIUsers {

    // Funciones de Logeo
    loginUser = async(_userAddress) => {
        console.log("<loginUser>");
        let response = await this.existIdentityUser(_userAddress);
        if (response) {
            let creds = await this.getIdentityUser(_userAddress);
            return creds;
        } else {
            let creds = await this.createNewIdentityUser(_userAddress);
            return creds;
        }
    };

    existIdentityUser = async(_userAddress) => {
        console.log("<existIdentityUser>");
        let response = await contract.methods.userExistence(_userAddress).call();
        console.log("</existIdentityUser>",response);
        return response;
    };

    createNewIdentityUser = async(_userAddress) => {
        console.log("<createNewIdentityUser>");
        let account = web3.eth.accounts.create(_userAddress);
        let encodedABI = contract.methods.createUser(_userAddress, account.address, account.privateKey).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: account.address,
              gas: 2000000,
              to: contractAddress,
            },
            account.privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).catch((err) => {
            console.error("ERR",err);
        });
        console.log("result",response);
        let text = '{ "address":"'+account.address+'", "privateKey":"'+account.privateKey+'"}'; 
        let jsonObj = JSON.parse(text); 
        console.log("</createNewIdentityUser>",jsonObj);
        return jsonObj;
    };

    getIdentityUser = async(_userAddress) => {
        console.log("<getIdentityUser>");
        let response = await contract.methods.getUserIdentity(_userAddress).call({from: '0x42567b4A1cF4EeFE7F75d55b66A9df4197ebe163'});
        let text = '{ "address":"'+response[0]+'", "privateKey":"'+response[1]+'"}'; 
        let jsonObj = JSON.parse(text); 
        console.log("</getIdentityUser>",jsonObj);
        return jsonObj;
    };

    // Funciones para Actualizar la informacion del Usuario
    updateUser = async(creds, params) => {
        console.log("<updateUser>");
        let result = false;
        let encodedABI = contract.methods.updateUser(params.perfilHash).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: creds.address,
              gas: 2000000,
              to: contractAddress,
            },
            creds.privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', response =>{
            result = true;
        }).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</updateUser>");
        return result;
    };

    getUserData = async(params) => {
        console.log("<getUserData>");
        let response = await contract.methods.getUserData(params.account).call();
        console.log("</getUserData>");
        return response;
    };

    isUserActive = async(params) => {
        console.log("<isUserActive>");
        let response = await contract.methods.isUserActive(params.account).call();
        console.log("</isUserActive>");
        return response;
    };
}