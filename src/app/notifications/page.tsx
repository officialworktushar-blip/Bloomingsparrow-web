'use client';

import { useState } from 'react';

export default function NotificationsPage() {
  const [read, setRead] = useState(false);

  const markAllRead = () => {
    setRead(true);
  };

  return (
    <main className="inner-page" id="main-content">
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
        <button 
          className="mark-all-btn" 
          id="mark-all-btn" 
          onClick={markAllRead}
          style={read ? { color: 'var(--accent)' } : undefined}
        >
          {read ? 'All read ✓' : 'Mark all as read'}
        </button>
      </div>

      <div className="notif-list" id="notif-list" role="list">
        <div className={`notif-item ${!read ? 'unread' : ''}`} role="listitem" tabIndex={0}>
          <div className="notif-icon notif-icon--new">✦</div>
          <div className="notif-body">
            <div className="notif-text"><strong>New Arrival:</strong> "Peacock Rogan Canvas" has just been added to our Rogan Art collection.</div>
            <div className="notif-meta">2 hours ago</div>
          </div>
          <div className="notif-thumb"><img src="/images/rogan_1.png" alt="Peacock Rogan Canvas" /></div>
        </div>
        <div className={`notif-item ${!read ? 'unread' : ''}`} role="listitem" tabIndex={0}>
          <div className="notif-icon notif-icon--enquiry">✉</div>
          <div className="notif-body">
            <div className="notif-text"><strong>Enquiry Received:</strong> Thank you for your enquiry about "Brass Temple Bell". Our team will respond within 24 hours.</div>
            <div className="notif-meta">Yesterday, 4:30 PM</div>
          </div>
          <div className="notif-thumb"><img src="/images/bell_1.png" alt="Brass Temple Bell" /></div>
        </div>
        <div className="notif-item" role="listitem" tabIndex={0}>
          <div className="notif-icon notif-icon--sale">%</div>
          <div className="notif-body">
            <div className="notif-text"><strong>Special Offer:</strong> Free shipping on all Shola Art orders this week. Explore our collection today!</div>
            <div className="notif-meta">2 days ago</div>
          </div>
          <div className="notif-thumb"><img src="/images/shola_1.png" alt="Shola Art" /></div>
        </div>
        <div className="notif-item" role="listitem" tabIndex={0}>
          <div className="notif-icon notif-icon--new">✦</div>
          <div className="notif-body">
            <div className="notif-text"><strong>New Collection:</strong> Our Bird Making series has expanded — 2 new handcrafted sculptures are now available.</div>
            <div className="notif-meta">3 days ago</div>
          </div>
          <div className="notif-thumb"><img src="/images/bird_2.png" alt="Bird Making" /></div>
        </div>
        <div className="notif-item" role="listitem" tabIndex={0}>
          <div className="notif-icon notif-icon--wishlist">♡</div>
          <div className="notif-body">
            <div className="notif-text"><strong>Wishlist Alert:</strong> "Wire Peacock Sculpture" is in high demand. Limited pieces available.</div>
            <div className="notif-meta">4 days ago</div>
          </div>
          <div className="notif-thumb"><img src="/images/bird_2.png" alt="Wire Peacock" /></div>
        </div>
        <div className="notif-item" role="listitem" tabIndex={0}>
          <div className="notif-icon notif-icon--sale">★</div>
          <div className="notif-body">
            <div className="notif-text"><strong>Welcome to Blooming Sparrow!</strong> Discover India's most exquisite handcrafted arts across 7 curated collections.</div>
            <div className="notif-meta">1 week ago</div>
          </div>
          <div className="notif-thumb notif-logo"><img src="/images/logo.png" alt="Blooming Sparrow" /></div>
        </div>
      </div>
    </main>
  );
}
