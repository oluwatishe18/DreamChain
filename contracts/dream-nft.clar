;; Dream NFT Contract

(define-non-fungible-token dream uint)

(define-data-var last-dream-id uint u0)

(define-map dreams
  { dream-id: uint }
  {
    owner: principal,
    encrypted-content: (string-utf8 1024),
    timestamp: uint
  }
)

(define-public (mint-dream (encrypted-content (string-utf8 1024)))
  (let
    (
      (dream-id (+ (var-get last-dream-id) u1))
    )
    (try! (nft-mint? dream dream-id tx-sender))
    (map-set dreams
      { dream-id: dream-id }
      {
        owner: tx-sender,
        encrypted-content: encrypted-content,
        timestamp: block-height
      }
    )
    (var-set last-dream-id dream-id)
    (ok dream-id)
  )
)

(define-public (transfer-dream (dream-id uint) (recipient principal))
  (begin
    (try! (nft-transfer? dream dream-id tx-sender recipient))
    (ok (map-set dreams
      { dream-id: dream-id }
      (merge (unwrap! (map-get? dreams { dream-id: dream-id }) (err u404))
        { owner: recipient }
      )
    ))
  )
)

(define-read-only (get-dream (dream-id uint))
  (ok (map-get? dreams { dream-id: dream-id }))
)

(define-read-only (get-owner (dream-id uint))
  (ok (nft-get-owner? dream dream-id))
)

