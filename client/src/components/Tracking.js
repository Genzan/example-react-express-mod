import Web3 from 'web3';

const contractAddress = "0x068E9199a2Bf5625E81bA5E68F0A20EeECC6BB50";
const contractABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_itemID","type":"uint256"},{"indexed":false,"internalType":"string","name":"_horaAccion","type":"string"},{"indexed":false,"internalType":"address","name":"_actorInvolucrado","type":"address"}],"name":"ProductoActualizado","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_itemID","type":"uint256"},{"indexed":false,"internalType":"string","name":"_horaAccion","type":"string"},{"indexed":false,"internalType":"address","name":"_actorInvolucrado","type":"address"}],"name":"ProductoCreado","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_itemID","type":"uint256"},{"indexed":false,"internalType":"string","name":"_horaAccion","type":"string"},{"indexed":false,"internalType":"address","name":"_actorInvolucrado","type":"address"}],"name":"ProductoDividido","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_codigoPLU","type":"string"},{"internalType":"string","name":"_unidadRepresentada","type":"string"},{"internalType":"string","name":"_layoutHash","type":"string"},{"internalType":"string","name":"_horaAccion","type":"string"}],"name":"createProduct","outputs":[{"internalType":"uint256","name":"_newItemId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemID","type":"uint256"},{"internalType":"string","name":"_horaAccion","type":"string"}],"name":"divideProduct","outputs":[{"internalType":"uint256","name":"_newItemId","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemID","type":"uint256"}],"name":"getDatosToken","outputs":[{"internalType":"string","name":"_codigoPLU","type":"string"},{"internalType":"string","name":"_unidadRepresentada","type":"string"},{"internalType":"string","name":"_layoutHash","type":"string"},{"internalType":"uint16","name":"_numAcciones","type":"uint16"},{"internalType":"uint256","name":"_previousToken","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemID","type":"uint256"},{"internalType":"uint16","name":"_numAccion","type":"uint16"}],"name":"getEstatusProducto","outputs":[{"internalType":"string","name":"_horaAccion","type":"string"},{"internalType":"string","name":"_JSONHashURL","type":"string"},{"internalType":"address","name":"_usuarioAccion","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemID","type":"uint256"}],"name":"getLatestEstatusProducto","outputs":[{"internalType":"string","name":"_horaAccion","type":"string"},{"internalType":"string","name":"_JSONHashURL","type":"string"},{"internalType":"address","name":"_usuarioAccion","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"string","name":"_horaAccion","type":"string"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_itemID","type":"uint256"},{"internalType":"string","name":"_JSONHashURL","type":"string"},{"internalType":"string","name":"_horaAccion","type":"string"}],"name":"updateAccionProducto","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
const web3 = new Web3(
    new Web3.providers.HttpProvider("https://blockchain.iagrinet.com")
);
const contract = new web3.eth.Contract(
    JSON.parse(contractABI),
    contractAddress
);

export default class APITracking {

    // Funciones para Actualizar la informacion del Usuario
    createToken = async(creds, params) => {
        console.log("<createToken>");
        let result = false;
        let encodedABI = contract.methods.createProduct(params.codigoPLU, params.unidadRepresentada, params.layoutHash, params.horaAccion).encodeABI();
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
        let response2 = await contract.getPastEvents("ProductoCreado", { fromBlock: blockNumber, toBlock: blockNumber });
        for(var i=0; i < response2.length; i++){
            if(response2[i].transactionHash === response.transactionHash){
                result = response2[i].returnValues.empresaAddress;
            }
        }
        console.log("</createToken>");
        return result;
    };

    divideToken = async(creds, params) => {
        console.log("<divideToken>");
        let result = false;
        let encodedABI = contract.methods.divideProduct(params.itemID, params.horaAccion).encodeABI();
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
        let response2 = await contract.getPastEvents("ProductoDividido", { fromBlock: blockNumber, toBlock: blockNumber });
        for(var i=0; i < response2.length; i++){
            if(response2[i].transactionHash === response.transactionHash){
                result = response2[i].returnValues.empresaAddress;
            }
        }
        console.log("</divideToken>");
        return result;
    };

    updateToken = async(creds, params) => {
        console.log("<updateToken>");
        let result = false;
        let encodedABI = contract.methods.updateAccionProducto(params.itemID, params.JSONHashURL, params.horaAccion).encodeABI();
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
        console.log("</updateToken>");
        return result;
    };

    transferToken = async(creds, params) => {
        console.log("<transferToken>");
        let result = false;
        let encodedABI = contract.methods.transferFrom(params.from, params.to, params.itemID, params.horaAccion).encodeABI();
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
        console.log("</transferToken>");
        return result;
    };

    getDatosToken = async(params) => {
        console.log("<getDatosToken>");
        let response = await contract.methods.getDatosToken(params.itemID).call();
        console.log("</getDatosToken>");
        return response;
    };

    getEstatusProducto = async(params) => {
        console.log("<getEstatusProducto>");
        let response = await contract.methods.getEstatusProducto(params.itemID, params.numAccion).call();
        console.log("</getEstatusProducto>");
        return response;
    };

    getLatestEstatusProducto = async(params) => {
        console.log("<getLatestEstatusProducto>");
        let response = await contract.methods.getLatestEstatusProducto(params.itemID).call();
        console.log("</getLatestEstatusProducto>");
        return response;
    };

    getDatosToken = async(params) => {
        console.log("<getTotalSupply>");
        let response = await contract.methods.getUserData().call();
        console.log("</getTotalSupply>");
        return response;
    };

}