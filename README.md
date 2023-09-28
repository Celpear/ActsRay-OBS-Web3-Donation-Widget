# ActsRay-OBS-Web3-Donation-Widget
A widget for OBS to enable donations via dApp


## 1. Config
You have to adjust the config file first.
```bash
nano obs_smart_contract_widget/backend/config.json
```
Set the ETH Node Websocket Path. I recommend here to do it via https://www.infura.io/
Please use the sepolia test network. I am not responsible for any financial loss or damage if you use it on the mainnet!
And be sure that you are using the right test network in a wallet.

For testing you can use my deployed smartcontract first. You can find it here: "smart_contracts/test_contract.sol".
If you want to deploy it yourself it is best to do this with a MetaMask wallet and https://remix.ethereum.org/.

The ABI file can be found under "obs_smart_contract_widget/backend/API.json".

## 2. Build and Run
```bash
cd obs_smart_contract_widget/backend/
npm install
npm start
```

## 3. Build and Run
Add this web page http://localhost:8765 in OBS and give it the size 700x700
Start OBS only when the script is already running.

## 4. Done
Have fun!
