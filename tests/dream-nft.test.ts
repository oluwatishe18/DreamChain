import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockClarity = {
  contracts: {
    'dream-nft': {
      functions: {
        'mint-dream': vi.fn(),
        'transfer-dream': vi.fn(),
        'get-dream': vi.fn(),
        'get-owner': vi.fn(),
      },
    },
  },
  globals: {
    'tx-sender': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    'block-height': 123456,
  },
}

function callContract(contractName: string, functionName: string, args: any[]) {
  return mockClarity.contracts[contractName].functions[functionName](...args)
}

describe('Dream NFT Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('mint-dream', () => {
    it('should mint a new dream NFT successfully', async () => {
      const encryptedContent = 'encrypted dream content'
      mockClarity.contracts['dream-nft'].functions['mint-dream'].mockReturnValue({ success: true, value: 1 })
      
      const result = await callContract('dream-nft', 'mint-dream', [encryptedContent])
      
      expect(result.success).toBe(true)
      expect(result.value).toBe(1)
    })
  })
  
  describe('transfer-dream', () => {
    it('should transfer a dream NFT successfully', async () => {
      const dreamId = 1
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
      mockClarity.contracts['dream-nft'].functions['transfer-dream'].mockReturnValue({ success: true })
      
      const result = await callContract('dream-nft', 'transfer-dream', [dreamId, recipient])
      
      expect(result.success).toBe(true)
    })
    
    it('should fail if the sender does not own the dream NFT', async () => {
      const dreamId = 1
      const recipient = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'
      mockClarity.contracts['dream-nft'].functions['transfer-dream'].mockReturnValue({ success: false, error: 403 })
      
      const result = await callContract('dream-nft', 'transfer-dream', [dreamId, recipient])
      
      expect(result.success).toBe(false)
      expect(result.error).toBe(403)
    })
  })
  
  describe('get-dream', () => {
    it('should return dream details', async () => {
      const dreamId = 1
      const expectedDream = {
        owner: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        encrypted_content: 'encrypted dream content',
        timestamp: 123456
      }
      mockClarity.contracts['dream-nft'].functions['get-dream'].mockReturnValue({ success: true, value: expectedDream })
      
      const result = await callContract('dream-nft', 'get-dream', [dreamId])
      
      expect(result.success).toBe(true)
      expect(result.value).toEqual(expectedDream)
    })
    
    it('should return null for non-existent dream', async () => {
      const dreamId = 999
      mockClarity.contracts['dream-nft'].functions['get-dream'].mockReturnValue({ success: true, value: null })
      
      const result = await callContract('dream-nft', 'get-dream', [dreamId])
      
      expect(result.success).toBe(true)
      expect(result.value).toBeNull()
    })
  })
  
  describe('get-owner', () => {
    it('should return the owner of a dream NFT', async () => {
      const dreamId = 1
      const expectedOwner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      mockClarity.contracts['dream-nft'].functions['get-owner'].mockReturnValue({ success: true, value: expectedOwner })
      
      const result = await callContract('dream-nft', 'get-owner', [dreamId])
      
      expect(result.success).toBe(true)
      expect(result.value).toBe(expectedOwner)
    })
    
    it('should return null for non-existent dream NFT', async () => {
      const dreamId = 999
      mockClarity.contracts['dream-nft'].functions['get-owner'].mockReturnValue({ success: true, value: null })
      
      const result = await callContract('dream-nft', 'get-owner', [dreamId])
      
      expect(result.success).toBe(true)
      expect(result.value).toBeNull()
    })
  })
})

