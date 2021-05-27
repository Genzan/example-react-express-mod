import Web3 from 'web3';

const contractAddress = "0x2aB9046cB89f36a544c58E88BfB963bDb6FaA1a8";
const contractABI_Factory = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"empresaAddress","type":"address"}],"name":"empresaCreated","type":"event"},{"inputs":[{"internalType":"uint16","name":"_numAccounts","type":"uint16"}],"name":"newCIIANEmpresa","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"empresas","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEmpresasLenght","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]';
const contractABI_Company = '[{"inputs":[{"internalType":"uint16","name":"_numAccounts","type":"uint16"},{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"uint16","name":"_numAccounts","type":"uint16"}],"name":"AccountAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"},{"indexed":false,"internalType":"uint16","name":"_numAccounts","type":"uint16"}],"name":"AccountDeleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_admin","type":"address"},{"indexed":false,"internalType":"uint16","name":"_numAccounts","type":"uint16"}],"name":"AdminAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"}],"name":"SolicitudAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"}],"name":"SolicitudAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_account","type":"address"}],"name":"SolicitudRejected","type":"event"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"addAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"_index","type":"uint16"}],"name":"approveAccountEntry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"avaliableAccounts","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"deleteAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"empresaHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEmpresaHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPendingAccounts","outputs":[{"internalType":"address[]","name":"_pendingAccounts","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isAccountAllowed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_index","type":"uint16"}],"name":"rejectAccountEntry","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"requestEntryEmpresa","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_empresaHash","type":"string"}],"name":"updateEmpresa","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
const web3 = new Web3(
    new Web3.providers.HttpProvider("https://blockchain.iagrinet.com")
);
const contractFactory = new web3.eth.Contract(
    JSON.parse(contractABI_Factory),
    contractAddress
);

const contract = new web3.eth.Contract(
    JSON.parse(contractABI_Company)
);

export default class APICompanies {

    // Funciones de la Administracion de Empresas
    createEmpresa = async(creds, params) => {
        console.log("<createEmpresa>");
        let result = false;
        let encodedABI = contractFactory.methods.newCIIANEmpresa(params.num).encodeABI();
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
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).catch((err) => {
            console.error("ERR",err);
        });
        const blockNumber = response.blockNumber;
        let response2 = await contract.getPastEvents("empresaCreated", { fromBlock: blockNumber, toBlock: blockNumber });
        for(var i=0; i < response2.length; i++){
            if(response2[i].transactionHash === response.transactionHash){
                result = response2[i].returnValues.empresaAddress;
            }
        }
        console.log("</createEmpresa>");
        return result;
    };

    addAdmin = async(creds, params) => {
        console.log("<addAdmin>");
        let result = false;
        let encodedABI = contract.methods.addAdmin(params.address).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: creds.address,
              gas: 2000000,
              to: params.contractAddress,
            },
            creds.privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', response =>{
            result = true;
        }).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</addAdmin>");
        return result;
    };

    addAccount = async(creds, params) => {
        console.log("<addAccount>");
        let result = false;
        let encodedABI = contract.methods.addAccount(params.address).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: creds.address,
              gas: 2000000,
              to: params.contractAddress,
            },
            creds.privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', response =>{
            result = true;
        }).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</addAccount>");
        return result;
    };

    deleteAccount = async(creds, params) => {
        console.log("<deleteAccount>");
        let result = false;
        let encodedABI = contract.methods.deleteAccount(params.address).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: creds.address,
              gas: 2000000,
              to: params.contractAddress,
            },
            creds.privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', response =>{
            result = true;
        }).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</deleteAccount>");
        return result;
    };

    // AQUI VAN LOS SCORES getScores

    updateEmpresa = async(creds, params) => {
        console.log("<updateEmpresa>");
        let result = false;
        let encodedABI = contract.methods.updateEmpresa(params.empresaHash).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: creds.address,
              gas: 2000000,
              to: params.contractAddress,
            },
            creds.privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', response =>{
            result = true;
        }).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</updateEmpresa>");
        return result;
    };

    requestEntryEmpresa = async(creds, params) => {
        console.log("<requestEntryEmpresa>");
        let result = false;
        let encodedABI = contract.methods.requestEntryEmpresa().encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: creds.address,
              gas: 2000000,
              to: params.contractAddress,
            },
            creds.privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', response =>{
            result = true;
        }).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</requestEntryEmpresa>");
        return result;
    };

    approveAccountEntry = async(creds, params) => {
        console.log("<approveAccountEntry>");
        let result = false;
        let encodedABI = contract.methods.approveAccountEntry(params.index).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: creds.address,
              gas: 2000000,
              to: params.contractAddress,
            },
            creds.privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', response =>{
            result = true;
        }).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</approveAccountEntry>");
        return result;
    };

    rejectAccountEntry = async(creds, params) => {
        console.log("<rejectAccountEntry>");
        let result = false;
        let encodedABI = contract.methods.rejectAccountEntry(params.index).encodeABI();
        let signedTx = await web3.eth.accounts.signTransaction(
            {
              data: encodedABI,
              from: creds.address,
              gas: 2000000,
              to: params.contractAddress,
            },
            creds.privateKey,
            false,
        );
        let response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', response =>{
            result = true;
        }).catch((err) => {
            console.error("ERR",err);
        });
        console.log("</rejectAccountEntry>");
        return result;
    };

    getEmpresaHash = async(creds, params) => {
        console.log("<getEmpresaHash>");
        const myContract = new web3.eth.Contract(
            JSON.parse(contractABI_Company),
            params.contractAddress
        );
        let response = await myContract.methods.getEmpresaHash().call();
        console.log("</getEmpresaHash>");
        return response;
    };

    getPendingAccounts = async(creds, params) => {
        console.log("<getPendingAccounts>");
        const myContract = new web3.eth.Contract(
            JSON.parse(contractABI_Company),
            params.contractAddress
        );
        let response = await myContract.methods.getPendingAccounts().call();
        console.log("</getPendingAccounts>");
        return response;
    };

    isAccountAllowed = async(creds, params) => {
        console.log("<isAccountAllowed>");
        const myContract = new web3.eth.Contract(
            JSON.parse(contractABI_Company),
            params.contractAddress
        );
        let response = await myContract.methods.isAccountAllowed(params.account).call();
        console.log("</isAccountAllowed>");
        return response;
    };

}