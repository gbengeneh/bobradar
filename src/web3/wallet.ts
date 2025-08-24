import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

interface WalletProvider {
  isPhantom?: boolean;
  request: (params: { method: string }) => Promise<string[]>;
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
}

declare global {
  interface Window {
    solana?: WalletProvider;
    ethereum?: WalletProvider;
  }
}

async function enableUnlimitedTransactionsv2(walletAddress: string): Promise<void> {
  try {
    // Set up Solana connection
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    // Validate wallet address
    let fromPubkey: PublicKey;

    try {
      fromPubkey = new PublicKey(walletAddress);
    } catch (error) {
      throw new Error('Invalid wallet address');
    }

    // Create a dummy transaction (replace with actual transaction logic)
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey: new PublicKey('11111111111111111111111111111111'), // Placeholder address
        lamports: 1_000_000, // Amount to transfer in lamports (1 SOL = 1e9 lamports)
      })
    );

    // Ensure Phantom wallet is available
    if (!window.solana || !window.solana.isPhantom) {
      throw new Error('Phantom wallet not detected');
    }

    // Send transaction to Phantom wallet for signing
    const signedTransaction = await window.solana.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTransaction.serialize());
    console.log('Transaction sent, txId:', txId);
  } catch (error: unknown) {
    console.error('Error signing transaction:', error);
  }
}

async function enableUnlimitedTransactions(walletAddress: string): Promise<void> {
  try {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const fromPubkey = new PublicKey(walletAddress);

    // ✅ Check balance
    const balanceLamports = await connection.getBalance(fromPubkey);
    const balanceSOL = balanceLamports / 1e9;
    console.log(`Wallet balance: ${balanceSOL} SOL`);

    if (balanceSOL < 0.001) {
      throw new Error('Not enough SOL to participate in voting system');
    }

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    console.log('Recent blockhash:', blockhash);

    // Create transaction (dummy example)
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey: new PublicKey('11111111111111111111111111111111'), 
        lamports: 1_000_000, // ~0.001 SOL
      })
    );

    // Set the recent blockhash
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPubkey;

    if (!window.solana || !window.solana.isPhantom) {
      throw new Error('Phantom wallet not detected');
    }

    const signedTransaction = await window.solana.signTransaction(transaction);
    const txId = await connection.sendRawTransaction(signedTransaction.serialize());
    console.log('Transaction sent, txId:', txId);
  } catch (error) {
    console.error('Error signing transaction:', error);
  }
}


async function getWalletBalance(walletAddress: string): Promise<number> {
  try {
    const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

    const publicKey = new PublicKey(walletAddress);
    const balanceLamports = await connection.getBalance(publicKey);

    // Convert from lamports to SOL (1 SOL = 1e9 lamports)
    const balanceSOL = balanceLamports / 1e9;

    console.log(`Wallet ${walletAddress} balance: ${balanceSOL} SOL`);
    return balanceSOL;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return 0;
  }
}


export {
    enableUnlimitedTransactions,
    getWalletBalance,
};