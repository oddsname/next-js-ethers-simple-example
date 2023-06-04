import styles from '@/styles/Home.module.css'
import {useState} from "react";
import {ethers} from "ethers";

export default function Home() {
    const [isConnected, setIsConnected] = useState(false)
    const [signer, setSigner] = useState();

    const connect = async () => {
        try {
            await ethereum.request({method: 'eth_requestAccounts'})
            setIsConnected(true);
            const connectedProvider = new ethers.providers.Web3Provider(window.ethereum);
            setSigner(connectedProvider.getSigner());
        } catch (e) {
            setIsConnected(false);
            setSigner(null);
            console.log(e);
        }
    }

    const execute = async () => {
        //need to have real abi and contract address here
        const contractAddress = '<address>'
        const abi = [{'abi': 'abi'}]

        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            await contract.store(42);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <main className={`${styles.main}`}>
                <div>Hello</div>
                { isConnected
                    ? 'Connected!'
                    :  <button onClick={() => connect()}>Connect</button>
                }

                { isConnected ? <button onClick={() => execute()}>Execute</button> : ''}
            </main>
        </>
    )
}
