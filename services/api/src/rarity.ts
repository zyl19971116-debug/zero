import { randomBytes, createHash } from 'node:crypto';
import { z } from 'zod';
export const rarityConfigSchema=z.object({version:z.string(),weights:z.object({COMMON:z.number().int().nonnegative(),RARE:z.number().int().nonnegative(),EPIC:z.number().int().nonnegative(),LEGENDARY:z.number().int().nonnegative(),MYTHIC:z.number().int().nonnegative()})}).refine(v=>Object.values(v.weights).reduce((a,b)=>a+b,0)===10000,'weights must total 10000 basis points');
export const defaultRarityConfig=rarityConfigSchema.parse({version:'2026-10-17.v1',weights:{COMMON:6000,RARE:2500,EPIC:1000,LEGENDARY:400,MYTHIC:100}});
export function selectRarity(n:number,cfg=defaultRarityConfig){if(!Number.isInteger(n)||n<0||n>=10000)throw new RangeError('outcome must be 0..9999');let x=0;for(const [rarity,w] of Object.entries(cfg.weights)){x+=w;if(n<x)return rarity as keyof typeof cfg.weights}throw new Error('invalid configuration')}
export function secureOutcome(){const raw=randomBytes(32);const n=raw.readUInt32BE(0)%10000;return{outcome:n,commitment:createHash('sha256').update(raw).digest('hex'),audit:{algorithm:'CSPRNG_SHA256_COMMITMENT',sampleSpace:10000}}}
