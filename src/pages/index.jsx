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

import family-trips from "./family-trips";

import request-a-quote from "./request-a-quote";

import romantic-vacations from "./romantic-vacations";

import kosher-vacations from "./kosher-vacations";

import Destinations from "./Destinations.jsx";

import DestinationDetails from "./DestinationDetails.jsx";

import honeymoon-trips from "./honeymoon-trips";

import backpacker-trips from "./backpacker-trips";

import luxury-vacations from "./luxury-vacations";

import ski-vacations from "./ski-vacations";

import group-tours from "./group-tours";

import last-minute-deals from "./last-minute-deals";

import business-travel from "./business-travel";

import cruises from "./cruises.jsx";

import travel-insurance from "./travel-insurance";

import custom-trip-builder from "./custom-trip-builder";

import greece from "./greece.jsx";

import dubai from "./dubai.jsx";

import argentina from "./argentina.jsx";

import london from "./london.jsx";

import paris from "./paris.jsx";

import sports-packages from "./sports-packages";

import concert-packages from "./concert-packages";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

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
    
    family-trips: family-trips,
    
    request-a-quote: request-a-quote,
    
    romantic-vacations: romantic-vacations,
    
    kosher-vacations: kosher-vacations,
    
    Destinations: Destinations,
    
    DestinationDetails: DestinationDetails,
    
    honeymoon-trips: honeymoon-trips,
    
    backpacker-trips: backpacker-trips,
    
    luxury-vacations: luxury-vacations,
    
    ski-vacations: ski-vacations,
    
    group-tours: group-tours,
    
    last-minute-deals: last-minute-deals,
    
    business-travel: business-travel,
    
    cruises: cruises,
    
    travel-insurance: travel-insurance,
    
    custom-trip-builder: custom-trip-builder,
    
    greece: greece,
    
    dubai: dubai,
    
    argentina: argentina,
    
    london: london,
    
    paris: paris,
    
    sports-packages: sports-packages,
    
    concert-packages: concert-packages,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
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
                
                <Route path="/family-trips" element={<family-trips />} />
                
                <Route path="/request-a-quote" element={<request-a-quote />} />
                
                <Route path="/romantic-vacations" element={<romantic-vacations />} />
                
                <Route path="/kosher-vacations" element={<kosher-vacations />} />
                
                <Route path="/Destinations" element={<Destinations />} />
                
                <Route path="/DestinationDetails" element={<DestinationDetails />} />
                
                <Route path="/honeymoon-trips" element={<honeymoon-trips />} />
                
                <Route path="/backpacker-trips" element={<backpacker-trips />} />
                
                <Route path="/luxury-vacations" element={<luxury-vacations />} />
                
                <Route path="/ski-vacations" element={<ski-vacations />} />
                
                <Route path="/group-tours" element={<group-tours />} />
                
                <Route path="/last-minute-deals" element={<last-minute-deals />} />
                
                <Route path="/business-travel" element={<business-travel />} />
                
                <Route path="/cruises" element={<cruises />} />
                
                <Route path="/travel-insurance" element={<travel-insurance />} />
                
                <Route path="/custom-trip-builder" element={<custom-trip-builder />} />
                
                <Route path="/greece" element={<greece />} />
                
                <Route path="/dubai" element={<dubai />} />
                
                <Route path="/argentina" element={<argentina />} />
                
                <Route path="/london" element={<london />} />
                
                <Route path="/paris" element={<paris />} />
                
                <Route path="/sports-packages" element={<sports-packages />} />
                
                <Route path="/concert-packages" element={<concert-packages />} />
                
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