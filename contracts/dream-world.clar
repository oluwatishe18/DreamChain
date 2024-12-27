;; Dream World Contract

(define-map dream-elements
  { element-id: uint }
  {
    creator: principal,
    name: (string-ascii 64),
    description: (string-utf8 256),
    usage-count: uint
  }
)

(define-map dream-worlds
  { world-id: uint }
  {
    creator: principal,
    name: (string-ascii 64),
    description: (string-utf8 256),
    elements: (list 100 uint)
  }
)

(define-data-var last-element-id uint u0)
(define-data-var last-world-id uint u0)

(define-public (create-dream-element (name (string-ascii 64)) (description (string-utf8 256)))
  (let
    (
      (element-id (+ (var-get last-element-id) u1))
    )
    (map-set dream-elements
      { element-id: element-id }
      {
        creator: tx-sender,
        name: name,
        description: description,
        usage-count: u0
      }
    )
    (var-set last-element-id element-id)
    (ok element-id)
  )
)

(define-public (create-dream-world (name (string-ascii 64)) (description (string-utf8 256)) (elements (list 100 uint)))
  (let
    (
      (world-id (+ (var-get last-world-id) u1))
    )
    (map-set dream-worlds
      { world-id: world-id }
      {
        creator: tx-sender,
        name: name,
        description: description,
        elements: elements
      }
    )
    (var-set last-world-id world-id)
    (ok world-id)
  )
)

(define-public (add-element-to-world (world-id uint) (element-id uint))
  (let
    (
      (world (unwrap! (map-get? dream-worlds { world-id: world-id }) (err u404)))
      (element (unwrap! (map-get? dream-elements { element-id: element-id }) (err u404)))
    )
    (asserts! (is-eq (get creator world) tx-sender) (err u403))
    (map-set dream-worlds
      { world-id: world-id }
      (merge world
        { elements: (unwrap! (as-max-len? (append (get elements world) element-id) u100) (err u400)) }
      )
    )
    (map-set dream-elements
      { element-id: element-id }
      (merge element
        { usage-count: (+ (get usage-count element) u1) }
      )
    )
    (ok true)
  )
)

(define-read-only (get-dream-element (element-id uint))
  (ok (map-get? dream-elements { element-id: element-id }))
)

(define-read-only (get-dream-world (world-id uint))
  (ok (map-get? dream-worlds { world-id: world-id }))
)

