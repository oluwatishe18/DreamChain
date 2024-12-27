;; Dream Analysis Contract

(define-map dream-analyses
  { dream-id: uint }
  {
    analysis: (string-utf8 1024),
    patterns: (list 10 (string-ascii 64))
  }
)

(define-public (analyze-dream (dream-id uint) (analysis (string-utf8 1024)) (patterns (list 10 (string-ascii 64))))
  (ok (map-set dream-analyses
    { dream-id: dream-id }
    {
      analysis: analysis,
      patterns: patterns
    }
  ))
)

(define-read-only (get-dream-analysis (dream-id uint))
  (ok (map-get? dream-analyses { dream-id: dream-id }))
)

