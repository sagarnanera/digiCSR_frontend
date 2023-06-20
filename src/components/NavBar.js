import React from 'react'
import NgoNavigation from './Navigation/NgoNavigation'
import CompanyNavigation from './Navigation/companyNavigation'
import BenificiaryNavigation from './Navigation/beneficiaryNavigation'

const NavBar = ({ userType }) => {

    switch (userType) {
        case 'ngo':
            return <NgoNavigation />;
        case 'company':
            return <CompanyNavigation />;
        case 'beneficiary':
            return <BenificiaryNavigation />;
        default:
            return null;
    }

}

export default NavBar
