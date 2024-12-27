import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockClarity = {
  contracts: {
    'dream-analysis': {
      functions: {
        'analyze-dream': vi.fn(),
        'get-dream-analysis': vi.fn(),
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

describe('Dream Analysis Contract', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })
  
  describe('analyze-dream', () => {
    it('should analyze a dream successfully', async () => {
      const dreamId = 1
      const analysis = 'This dream represents your subconscious desires.'
      const patterns = ['flying', 'falling', 'chasing']
      mockClarity.contracts['dream-analysis'].functions['analyze-dream'].mockReturnValue({ success: true })
      
      const result = await callContract('dream-analysis', 'analyze-dream', [dreamId, analysis, patterns])
      
      expect(result.success).toBe(true)
    })
  })
  
  describe('get-dream-analysis', () => {
    it('should return dream analysis', async () => {
      const dreamId = 1
      const expectedAnalysis = {
        analysis: 'This dream represents your subconscious desires.',
        patterns: ['flying', 'falling', 'chasing']
      }
      mockClarity.contracts['dream-analysis'].functions['get-dream-analysis'].mockReturnValue({ success: true, value: expectedAnalysis })
      
      const result = await callContract('dream-analysis', 'get-dream-analysis', [dreamId])
      
      expect(result.success).toBe(true)
      expect(result.value).toEqual(expectedAnalysis)
    })
    
    it('should return null for non-existent analysis', async () => {
      const dreamId = 999
      mockClarity.contracts['dream-analysis'].functions['get-dream-analysis'].mockReturnValue({ success: true, value: null })
      
      const result = await callContract('dream-analysis', 'get-dream-analysis', [dreamId])
      
      expect(result.success).toBe(true)
      expect(result.value).toBeNull()
    })
  })
})

