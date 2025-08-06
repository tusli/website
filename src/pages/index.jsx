import Layout from "./Layout.jsx";

import Homepage from "./Homepage.jsx";

import Deals from "./Deals.jsx";

import Contact from "./Contact.jsx";

import About from "./About.jsx";

import Admin from "./Admin.jsx";

import Terms from "./Terms.jsx";

import Privacy from "./Privacy.jsx";

import SimpleBlog from "./SimpleBlog.jsx";

import SimpleBlogPostPage from "./SimpleBlogPostPage.jsx";

import PersonalTripPlanning from "./PersonalTripPlanning.jsx";

import OfferDetails from "./OfferDetails.jsx";

import NotFound from "./NotFound.jsx";

import familyTrips from "./family-trips";

import requestAQuote from "./request-a-quote";

import romanticVacations from "./romantic-vacations";

import kosherVacations from "./kosher-vacations";

import Destinations from "./Destinations.jsx";

import DestinationDetails from "./DestinationDetails.jsx";

import honeymoonTrips from "./honeymoon-trips";

import backpackerTrips from "./backpacker-trips";

import luxuryVacations from "./luxury-vacations";

import skiVacations from "./ski-vacations";

import groupTours from "./group-tours";

import lastMinuteDeals from "./last-minute-deals";

import businessTravel from "./business-travel";

import cruises from "./cruises.jsx";

import travelInsurance from "./travel-insurance";

import customTripBuilder from "./custom-trip-builder";

import greece from "./greece.jsx";

import dubai from "./dubai.jsx";

import argentina from "./argentina.jsx";

import london from "./london.jsx";

import paris from "./paris.jsx";

import sportsPackages from "./sports-packages";

import concertPackages from "./concert-packages";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { hyphenToCamelCase } from '../utils/index.ts';

const PAGES = {
    
    Homepage: Homepage,
    
    Deals: Deals,
    
    Contact: Contact,
    
    About: About,
    
    Admin: Admin,
    
    Terms: Terms,
    
    Privacy: Privacy,
    
    SimpleBlog: SimpleBlog,
    
    SimpleBlogPostPage: SimpleBlogPostPage,
    
    PersonalTripPlanning: PersonalTripPlanning,
    
    OfferDetails: OfferDetails,
    
    NotFound: NotFound,
    
    familyTrips: familyTrips,
    
    requestAQuote: requestAQuote,
    
    romanticVacations: romanticVacations,
    
    kosherVacations: kosherVacations,
    
    Destinations: Destinations,
    
    DestinationDetails: DestinationDetails,
    
    honeymoonTrips: honeymoonTrips,
    
    backpackerTrips: backpackerTrips,
    
    luxuryVacations: luxuryVacations,
    
    skiVacations: skiVacations,
    
    groupTours: groupTours,
    
    lastMinuteDeals: lastMinuteDeals,
    
    businessTravel: businessTravel,
    
    cruises: cruises,
    
    travelInsurance: travelInsurance,
    
    customTripBuilder: customTripBuilder,
    
    greece: greece,
    
    dubai: dubai,
    
    argentina: argentina,
    
    london: london,
    
    paris: paris,
    
    sportsPackages: sportsPackages,
    
    concertPackages: concertPackages,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const camelCaseUrlPart = hyphenToCamelCase(urlLastPart);
    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === camelCaseUrlPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Homepage />} />
                
                
                <Route path="/Homepage" element={<Homepage />} />
                
                <Route path="/Deals" element={<Deals />} />
                
                <Route path="/Contact" element={<Contact />} />
                
                <Route path="/About" element={<About />} />
                
                <Route path="/Admin" element={<Admin />} />
                
                <Route path="/Terms" element={<Terms />} />
                
                <Route path="/Privacy" element={<Privacy />} />
                
                <Route path="/SimpleBlog" element={<SimpleBlog />} />
                
                <Route path="/SimpleBlogPostPage" element={<SimpleBlogPostPage />} />
                
                <Route path="/PersonalTripPlanning" element={<PersonalTripPlanning />} />
                
                <Route path="/OfferDetails" element={<OfferDetails />} />
                
                <Route path="/NotFound" element={<NotFound />} />
                
                <Route path="/family-trips" element={<familyTrips />} />
                
                <Route path="/request-a-quote" element={<requestAQuote />} />
                
                <Route path="/romantic-vacations" element={<romanticVacations />} />
                
                <Route path="/kosher-vacations" element={<kosherVacations />} />
                
                <Route path="/Destinations" element={<Destinations />} />
                
                <Route path="/DestinationDetails" element={<DestinationDetails />} />
                
                <Route path="/honeymoon-trips" element={<honeymoonTrips />} />
                
                <Route path="/backpacker-trips" element={<backpackerTrips />} />
                
                <Route path="/luxury-vacations" element={<luxuryVacations />} />
                
                <Route path="/ski-vacations" element={<skiVacations />} />
                
                <Route path="/group-tours" element={<groupTours />} />
                
                <Route path="/last-minute-deals" element={<lastMinuteDeals />} />
                
                <Route path="/business-travel" element={<businessTravel />} />
                
                <Route path="/cruises" element={<cruises />} />
                
                <Route path="/travel-insurance" element={<travelInsurance />} />
                
                <Route path="/custom-trip-builder" element={<customTripBuilder />} />
                
                <Route path="/greece" element={<greece />} />
                
                <Route path="/dubai" element={<dubai />} />
                
                <Route path="/argentina" element={<argentina />} />
                
                <Route path="/london" element={<london />} />
                
                <Route path="/paris" element={<paris />} />
                
                <Route path="/sports-packages" element={<sportsPackages />} />
                
                <Route path="/concert-packages" element={<concertPackages />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}