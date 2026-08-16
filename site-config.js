window.COIFFED_SITE = Object.freeze({
  productionOrigin: "https://coiffedbeauty.com",
  indexedPages: Object.freeze(["/", "/notes.html"])
});

/*
 * Confirmed service and operating information for the Coiffed prototype.
 *
 * Update operational copy here instead of editing it on individual pages.
 * Set booking.squareUrl only after the official Square Appointments URL is
 * confirmed. Until then, the site offers an email inquiry instead of a
 * fabricated booking link.
 */
window.COIFFED_OPERATIONS = Object.freeze({
  opening: {
    label: "Opening status",
    status: "Preparing to open",
    detail: "Coiffed is preparing to open at 2325 Hennepin Ave. Follow along or join the mailing list for the confirmed opening date."
  },
  booking: {
    mode: "Square Appointments",
    squareUrl: "",
    activeLabel: "Book with Square",
    fallbackUrl: "mailto:hello@coiffedbeauty.com?subject=Coiffed%20appointment%20question",
    fallbackLabel: "Ask about an appointment",
    pendingLabel: "Online booking link to come"
  },
  specialist: "Brinn will initially be Coiffed’s only wig specialist.",
  hours: {
    walkIns: "Walk-ins will be welcome during posted hours. Exact hours are still being finalized.",
    provisionalPattern: "Provisional pattern: Tuesday through Saturday daytime, with selected evening appointments and no Sunday or Monday walk-in shopping."
  },
  inventory: "Coiffed plans to carry glueless wigs from multiple brands, in a range of colors and price points. Exact availability has not yet been verified.",
  services: [
    {
      id: "initial-wig-consultation",
      name: "Initial Wig Consultation",
      price: "$50 total",
      customerDuration: "45 minutes",
      description: "One-on-one time to talk through fit, comfort, style, care, and what you want from a wig.",
      details: [
        "The full consultation fee is credited toward a qualifying wig purchase.",
        "A $25 deposit is collected at booking through Square Appointments, with the remaining $25 due at the appointment.",
        "The $25 deposit functions as the missed-appointment or late-cancellation charge."
      ]
    },
    {
      id: "wig-care-drop-off",
      name: "Wig Care Drop-Off",
      price: "$35",
      customerDuration: "15-minute customer drop-off",
      internalDuration: "Up to 60 minutes of internal work",
      description: "Deep cleaning and styling when appropriate for the wig’s fiber, construction, and condition.",
      details: [
        "Not every wig can be serviced. Suitability will be assessed at drop-off.",
        "Target turnaround is two business days, with final timing confirmed at drop-off."
      ]
    }
  ],
  requiredDecisions: [
    "Cancellation window",
    "Consultation-credit expiration",
    "Refund rules",
    "Minimum qualifying wig purchase",
    "Consultation-credit transferability",
    "Exact operating hours",
    "Official Square Appointments URL"
  ]
});
