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
    status: "Coming soon.",
    detail: "Coiffed is coming soon to 2325 Hennepin Ave. Follow along or join the mailing list for opening updates."
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
    schedule: [
      { days: "Tuesday-Saturday", time: "9 AM-4 PM" },
      { days: "Sunday", time: "By appointment" },
      { days: "Monday", time: "Closed" }
    ]
  },
  inventory: "Coiffed plans to carry glueless wigs from multiple brands, in a range of colors and price points. Exact availability has not yet been verified.",
  services: [
    {
      id: "la-petite",
      name: "La Petite",
      price: "$35",
      description: "A focused wig-care service. Coiffed will assess the wig and confirm suitable care at drop-off."
    },
    {
      id: "classique",
      name: "Classique",
      price: "$55",
      description: "The classic wig-care service, with cleaning and styling when appropriate for the wig’s fiber, construction, and condition."
    },
    {
      id: "supreme",
      name: "Suprême",
      price: "$85",
      description: "A more extensive wig-care service. Coiffed will assess suitability and confirm the appropriate work at drop-off."
    },
    {
      id: "le-renouveau",
      name: "Le Renouveau",
      price: "$115+",
      description: "The renewal wig-care service, starting at $115. Coiffed will assess the wig and confirm suitable work and final pricing at drop-off."
    }
  ],
  requiredDecisions: [
    "Cancellation window",
    "Consultation-credit expiration",
    "Refund rules",
    "Minimum qualifying wig purchase",
    "Consultation-credit transferability",
    "Official Square Appointments URL"
  ]
});
