// @ts-nocheck
import { Router } from "express";
import { getTokenList } from "../../api";
import { getTokenImage } from "../../utils";
import { PublicKey } from "@solana/web3.js";
  

// Create a new instance of the Express Router
const CoinRouter = Router();
const axios = require('axios');
const qs = require('qs');

CoinRouter.post("/getList", async (req, res) => {
    try {
       console.log(" ======= start getList ======= ")
        const list = await getTokenList();

        if (!list) {
            return res.status(400).json({
                status: false,
                msg: "no data"
            })
        }

        // Extract mint address from item's `address` field only
        const getPossibleMintAddress = (item: any): string | null => {
            const value = item?.address;
            if (typeof value === "string" && value.length >= 32) {
                return value;
            }
            if (value && typeof value === "object" && typeof value.toString === "function") {
                const str = value.toString();
                if (str && str.length >= 32) return str;
            }
            return null;
        };

        // Enrich an array of items with tokenImage if possible
        const enrichArrayWithTokenImage = async (arr: any[]): Promise<any[]> => {
            const results = await Promise.allSettled(
                arr.map(async (item) => {
                    try {
                        const mintStr = getPossibleMintAddress(item);
                        if (!mintStr) return { ...item };
                        const image = await getTokenImage(new PublicKey(mintStr));
                        return { ...item, tokenImage: image };
                    } catch {
                        return { ...item };
                    }
                })
            );
            return results.map((r, idx) => (r.status === "fulfilled" ? r.value : arr[idx]));
        };

        let responseBody: any;

        if (Array.isArray(list)) {
            const enriched = await enrichArrayWithTokenImage(list);
            responseBody = enriched;
        } else if (Array.isArray(list?.data)) {
            const enriched = await enrichArrayWithTokenImage(list.data);
            responseBody = { ...list, data: enriched };
        } else if (Array.isArray(list?.result)) {
            const enriched = await enrichArrayWithTokenImage(list.result);
            responseBody = { ...list, result: enriched };
        } else if (Array.isArray(list?.tokens)) {
            const enriched = await enrichArrayWithTokenImage(list.tokens);
            responseBody = { ...list, tokens: enriched };
        } else {
            // Fallback: return as-is if list shape is not an array
            responseBody = list;
        }

        return res.json({
            status: true,
            data: responseBody
        })
    } catch (error: any) {
        console.log("get list error ==>", error)
        res
            .status(400)
            .json({ status: false,
                msg: "Error handling get list action." 
            });
    }
});

export default CoinRouter;