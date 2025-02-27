import React from 'react';

const HeaderWithIconography = () => {
  // Create an array of 50 background pattern icons
  const renderPatternIcons = () => {
    const icons = [];
    
    for (let i = 0; i < 50; i++) {
      let icon;
      
      // Cycle through different icon types
      if (i % 4 === 0) {
        icon = (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 21H3V3"></path>
            <path d="M7 14l4-4 4 4 6-6"></path>
          </svg>
        );
      } else if (i % 4 === 1) {
        icon = (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="9"></line>
            <line x1="9" y1="12" x2="15" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        );
      } else if (i % 4 === 2) {
        icon = (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        );
      } else {
        icon = (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        );
      }
      
      icons.push(
        <div key={i} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {icon}
        </div>
      );
    }
    
    return icons;
  };
  
  return (
    <header className="dashboard-header">
      {/* Background Icon Pattern */}
      <div className="header-icon-pattern">
        {renderPatternIcons()}
      </div>
      
      <div className="header-content">
        {/* Row of Featured Icons */}
        <div className="header-icons-row">
          <div className="icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 21H3V3"></path>
              <path d="M7 14l4-4 4 4 6-6"></path>
            </svg>
          </div>
          <div className="icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <div className="icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
              <circle cx="16" cy="16" r="3"></circle>
            </svg>
          </div>
        </div>
        
        {/* Title with Underline */}
        <h1>
          HCAS Final Challenge
          <div className="title-underline"></div>
        </h1>
        
        {/* Subtitle */}
        <p className="subtitle">
          <em>Health Care Analytics and Society Winter 2025</em>
        </p>
        
        {/* Semester Badge */}
        <div className="semester-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Winter 2025 Session
        </div>
      </div>
    </header>
  );
};

export default HeaderWithIconography;