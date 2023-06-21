import React from 'react'
import BenificiaryNavigation from '../../components/Navigation/beneficiaryNavigation'
import Homepage from '../../components/Dashboards/CompanyFeatures/Homepage'

const BeneficiaryDashboard = () => {
  return (
    <div>
      <BenificiaryNavigation />
      <Homepage userType={"beneficiary"} />
    </div>
  )
}

export default BeneficiaryDashboard
