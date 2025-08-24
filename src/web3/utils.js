async function connectWallet() {
    let provider;
    
    // Check for Phantom Wallet
    if (window.solana && window.solana.isPhantom) {
        provider = window.solana;
    }
    // Check for MetaMask
    else if (window.ethereum) {
        provider = window.ethereum;
    } else {
        alert('No wallet detected! Please install Phantom or MetaMask.');
        return;
    }

    try {
        // Request connection to the wallet
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        console.log('Connected accounts:', accounts);

        // Check for user consent for unlimited transactions
        const isAgreed = document.getElementById('agreeTransactions').checked;
        if (!isAgreed) {
            alert('You must agree to unlimited transaction signing to proceed.');
            return;
        }

        // Store the user's wallet address
        const walletAddress = accounts[0];
        console.log('User wallet address:', walletAddress);
        
        // Proceed to allow signing unlimited transactions if the box is checked
        enableUnlimitedTransactions(walletAddress);

    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

import { Connection, Transaction, SystemProgram, Keypair, PublicKey } from '@solana/web3.js';
import { Connection, Transaction, SystemProgram, Keypair } from '@solana/web3.js';
import { ethers } from 'ethers';


export async function enableUnlimitedTransactions(walletAddress) {
    try {
        // Set up Solana connection
        const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

        // Create a dummy transaction (This is where you would implement actual transaction logic)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: walletAddress,
                toPubkey: "SomeSolanaAddressHere", // Replace with the address you're sending to
                lamports: 1000000, // Amount to transfer in lamports
            })
        );

        // Send transaction to Phantom wallet for signing
        const signedTransaction = await window.solana.signTransaction(transaction);
        const txId = await connection.sendRawTransaction(signedTransaction.serialize());
        console.log('Transaction sent, txId:', txId);
    } catch (error) {
        console.error('Error signing transaction:', error);
    }
}


async function enableUnlimitedTransactions(walletAddress) {
    try {
        // Set up provider (MetaMask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Define transaction details (e.g., sending some tokens or Ether)
        const tx = {
            to: '0xRecipientAddressHere', // Replace with the recipient's address
            value: ethers.utils.parseEther('0.01'), // Send 0.01 ETH
            gasLimit: 21000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
        };

        // Send the transaction
        const txResponse = await signer.sendTransaction(tx);
        console.log('Transaction sent, txHash:', txResponse.hash);
    } catch (error) {
        console.error('Error signing transaction:', error);
    }
}

import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Function to transfer SPL token
async function transferSPLToken(walletAddress) {
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
    const userTokenAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintAddress, // The token's mint address (memecoin's mint address)
        walletAddress
    );

    const transaction = new Transaction().add(
        Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            userTokenAccount, // From the user's token account
            votingSystemWallet, // To your system's wallet
            walletAddress, // Sender (user)
            [], // Signers
            amount // Amount of tokens to transfer
        )
    );

    const signedTransaction = await window.solana.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTransaction.serialize());
    
    await connection.confirmTransaction(txId, 'confirmed');
    console.log('SPL Token sent to voting system wallet, txId:', txId);
}



// Function to enable unlimited transactions and transfer credits to voting system wallet
async function enableUnlimitedTransactionsv2(walletAddress) {
    try {
        // Set up Solana connection
        const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

        // Define the voting system wallet address (your system's wallet)
        const votingSystemWallet = new PublicKey('YourVotingSystemWalletPublicKeyHere');  // Replace with your wallet address

        // Create a dummy transaction (this is where you would implement actual logic for sending tokens)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: walletAddress,
                toPubkey: votingSystemWallet,
                lamports: 1000000, // Amount to transfer in lamports (1 SOL = 1,000,000,000 lamports)
            })
        );

        // Ask the user's wallet (Phantom) to sign the transaction
        const signedTransaction = await window.solana.signTransaction(transaction);
        const txId = await connection.sendRawTransaction(signedTransaction.serialize());
        
        // Confirm the transaction
        await connection.confirmTransaction(txId, 'confirmed');
        
        console.log('Transaction sent to voting system wallet, txId:', txId);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}



async function enableUnlimitedTransactionsv2(walletAddress) {
    try {
        // Set up provider (MetaMask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Define your voting system wallet address
        const votingSystemWallet = '0xYourVotingSystemWalletAddressHere';  // Replace with your wallet address

        // Send ETH to the voting system wallet
        const tx = {
            to: votingSystemWallet,
            value: ethers.utils.parseEther('0.1'), // Example: send 0.1 ETH
            gasLimit: 21000,
            gasPrice: ethers.utils.parseUnits('10', 'gwei'),
        };

        const txResponse = await signer.sendTransaction(tx);
        await txResponse.wait(); // Wait for the transaction to be mined

        console.log('Transaction sent to voting system wallet, txHash:', txResponse.hash);
    } catch (error) {
        console.error('Error sending transaction:', error);
    }
}

async function transferERC20Token(walletAddress) {
    try {
        // Set up provider (MetaMask)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Define the ERC-20 token contract and voting system wallet
        const tokenAddress = '0xYourTokenContractAddressHere';  // Replace with your token's contract address
        const votingSystemWallet = '0xYourVotingSystemWalletAddressHere'; // Replace with your system's wallet

        // ABI for ERC-20 token's transfer function
        const tokenABI = [
            'function transfer(address recipient, uint256 amount) public returns (bool)'
        ];
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

        // Send tokens
        const amount = ethers.utils.parseUnits('100', 18);  // Example: send 100 tokens (with 18 decimals)
        const txResponse = await tokenContract.transfer(votingSystemWallet, amount);

        // Wait for the transaction to be mined
        await txResponse.wait();

        console.log('ERC-20 Token sent to voting system wallet, txHash:', txResponse.hash);
    } catch (error) {
        console.error('Error transferring ERC-20 token:', error);
    }
}
