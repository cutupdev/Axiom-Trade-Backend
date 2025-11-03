import { Metaplex } from '@metaplex-foundation/js';
import { solanaConnection } from '../config/config';
import { PublicKey } from '@solana/web3.js';


export async function getTokenImage(mintAddress: PublicKey): Promise<string> {
    const metaplex = new Metaplex(solanaConnection);
    try {
      const nft = await metaplex.nfts().findByMint({ mintAddress });
      console.log("🚀 ~ getTokenImage ~ nft:", nft)
      return nft.json?.image || '';
    } catch (error) {
      console.error(':x: Error fetching token uri:', error);
      return '';
    }
  }