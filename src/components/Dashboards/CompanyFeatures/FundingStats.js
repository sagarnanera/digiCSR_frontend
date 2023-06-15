import React from 'react'
import CompanyNavigation from '../companyNavigation';

const FundingStats = () => {
  return (
    <div style={{
        backgroundImage: "url('bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}>
      <CompanyNavigation />
      FundingStats
    </div>
  );
}

export default FundingStats
