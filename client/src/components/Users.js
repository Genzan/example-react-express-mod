import Web3 from 'web3';

const contractAddressCIIAN = "0x4b0ED1151b7974E8A446094297783aC99f6116F1"; //CIIAN
const contractABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_perfilHash","type":"string"}],"name":"PerfilAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_perfilHash","type":"string"}],"name":"PerfilUpdated","type":"event"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"assingNewOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_mail","type":"string"},{"internalType":"address","name":"_perfilAddress","type":"address"},{"internalType":"string","name":"_privateKey","type":"string"}],"name":"createUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserData","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_mail","type":"string"}],"name":"getUserIdentity","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"isUserActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_perfilHash","type":"string"}],"name":"updateUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_mail","type":"string"}],"name":"userExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]';
const web3 = new Web3(
    new Web3.providers.HttpProvider("https://blockchain.iagrinet.com")
);
const contract = new web3.eth.Contract(
    JSON.parse(contractABI),
    contractAddressCIIAN
);

export default class APIUsers {

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
        let encoded = contract.methods.createUser(_userAddress, account.address, account.privateKey).encodeABI();
        let tx = {
            to : contractAddressCIIAN,
            data : encoded,
            gas: web3.utils.toHex('320000')
        }
        web3.eth.accounts.signTransaction(tx, account.privateKey).then(signed => {
            web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log);
        });
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

}