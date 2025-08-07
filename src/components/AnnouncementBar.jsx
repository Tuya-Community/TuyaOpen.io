import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';

export default function AnnouncementBar({ 
  backgroundColor = "#0598ea", // Quality blue for online contest announcement
  textColor = "#ffffff",
  showCloseButton = true
}) {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if announcement was dismissed
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    // Add/remove body class based on announcement visibility
    if (isVisible) {
      document.body.classList.add('announcement-visible');
    } else {
      document.body.classList.remove('announcement-visible');
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('announcement-dismissed', 'true');
  };

  if (!isVisible) {
    return null;
  }

  const barStyle = {
    backgroundColor,
    color: textColor,
  };

  return (
    <div className="announcement-bar" style={barStyle}>
      <div className="announcement-content">
        <span>
          <Translate
            id="announcement.message"
            description="Announcement bar message"
          >
            🏆 Join the TuyaOpen AI Hardware Contest! 100 days to build the future of AI devices
          </Translate>
        </span>
        <Link
          to="/blog/8-8-online-contest"
          className="announcement-link"
          style={{ color: textColor }}
        >
          <Translate
            id="announcement.learnMore"
            description="Learn more link text"
          >
            Learn More →
          </Translate>
        </Link>
        {showCloseButton && (
          <button
            className="announcement-close"
            onClick={handleClose}
            aria-label={Translate({
              id: 'announcement.close',
              description: 'Close announcement button aria-label'
            })}
            style={{ color: textColor }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
} 