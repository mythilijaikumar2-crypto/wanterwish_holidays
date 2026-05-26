import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Packages page
      perfectHolidays: "Perfect Holidays",
      ourTourPackages: "Our Tour Packages",
      clearAllFilters: "Clear All Filters",
      filterByCategory: "Filter By Category:",
      noPackagesFound: "No Tour Packages Found",
      noPackagesMatch: "We couldn't find any tour packages matching your search parameters. Try altering your keyword search or select a different category pill above.",
      resetFilters: "Reset Search Filters",

      // Package Details page
      packageNotFound: "Package Not Found",
      packageNotExist: "The holiday package you are trying to view does not exist or has been relocated. Please check the packages catalog page.",
      backToPackages: "Back to Packages",
      holidayDetails: "Holiday Details",
      aboutTour: "About the Tour",
      placesCovered: "Sightseeing Places Covered:",
      dayByDayItinerary: "Day-by-Day Itinerary",
      dayLabel: "Day {{num}}",
      whatsIncluded: "What's Included",
      whatsExcluded: "What's Excluded",
      importantTerms: "Important Terms",
      startingOffer: "Subsidized Starting Offer",
      bookEnquireToday: "Book / Enquire Today",
      submitContactDetails: "Submit your contact details and our founder Vinothini will coordinate directly.",
      submitEnquiry: "Submit Booking Enquiry",
      enquirySubmitted: "Enquiry Submitted!",
      thankYouMessage: "Thank you, {{name}}! Your holiday inquiry for {{title}} has been captured. Our director, Vinothini, will contact you via {{phone}} very shortly.",
      enquireAnother: "Enquire Another Package",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
