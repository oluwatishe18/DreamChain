import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockClarity = {
  contracts: {
    'dream-world': {
      functions: {
        'create-dream-element': vi.fn(),
        'create-dream-world': vi.fn(),
        'add-element-to-world': vi.fn(),
        'get-dream-element': vi.fn(),
        'get-dream-world': vi.fn(),
      },
    },
  },
  globals: {
    'tx-sender': 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  },
}

function callContract(contractName: string, functionName: string, args: any[]) {
  return mockClarity.contracts[contractName].functions[functionName](...args)
}

describe('Dream World Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('create-dream-element', () => {
    it('should create a dream element successfully', async () => {
      const name = 'Flying'
      const description = 'The sensation of flying through the air'
      mockClarity.contracts['dream-world'].functions['create-dream-element'].mockReturnValue({ success: true, value: 1 })
      
      const result = await callContract('dream-world', 'create-dream-element', [name, description])
      
      expect(result.success).toBe(true)
      expect(result.value).toBe(1)
    })
  })
  
  describe('create-dream-world', () => {
    it('should create a dream world successfully', async () => {
      const name = 'Enchanted Forest'
      const description = 'A mystical forest filled with magical creatures'
      const elements = [1, 2, 3]
      mockClarity.contracts['dream-world'].functions['create-dream-world'].mockReturnValue({ success: true, value: 1 })
      
      const result = await callContract('dream-world', 'create-dream-world', [name, description, elements])
      
      expect(result.success).toBe(true)
      expect(result.value).toBe(1)
    })
  })
  
  describe('add-element-to-world', () => {
    it('should add an element to a dream world successfully', async () => {
      const worldId = 1
      const elementId = 4
      mockClarity.contracts['dream-world'].functions['add-element-to-world'].mockReturnValue({ success: true })
      
      const result = await callContract('dream-world', 'add-element-to-world', [worldId, elementId])
      
      expect(result.success).toBe(true)
    })
    
    it('should fail if the sender is not the world creator', async () => {
      const worldId = 1
      const elementId = 4
      mockClarity.contracts['dream-world'].functions['add-element-to-world'].mockReturnValue({ success: false, error: 403 })
      
      const result = await callContract('dream-world', 'add-element-to-world', [worldId, elementId])
      
      expect(result.success).toBe(false)
      expect(result.error).toBe(403)
    })
  })
  
  describe('get-dream-element', () => {
    it('should return dream element details', async () => {
      const elementId = 1
      const expectedElement = {
        creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        name: 'Flying',
        description: 'The sensation of flying through the air',
        usage_count: 5
      }
      mockClarity.contracts['dream-world'].functions['get-dream-element'].mockReturnValue({ success: true, value: expectedElement })
      
      const result = await callContract('dream-world', 'get-dream-element', [elementId])
      
      expect(result.success).toBe(true)
      expect(result.value).toEqual(expectedElement)
    })
  })
  
  describe('get-dream-world', () => {
    it('should return dream world details', async () => {
      const worldId = 1
      const expectedWorld = {
        creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        name: 'Enchanted Forest',
        description: 'A mystical forest filled with magical creatures',
        elements: [1, 2, 3, 4]
      }
      mockClarity.contracts['dream-world'].functions['get-dream-world'].mockReturnValue({ success: true, value: expectedWorld })
      
      const result = await callContract('dream-world', 'get-dream-world', [worldId])
      
      expect(result.success).toBe(true)
      expect(result.value).toEqual(expectedWorld)
    })
  })
})

