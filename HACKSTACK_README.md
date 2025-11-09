# ⚡ HackStack - Tinder for Hackathon Teams

**Find your perfect hackathon teammates with a swipe!**

HackStack is a Tinder-style matching platform designed specifically for hackathon participants. Swipe through developer profiles, match with potential teammates, and start collaborating—all in one beautiful, intuitive interface.

## 🎯 Problem It Solves

- **Solo hackers** struggle to find teammates with complementary skills
- **Team formation** is chaotic and time-consuming at hackathons
- **Skill mismatches** lead to unsuccessful projects
- **Finding people** with similar interests and availability is hard

## ✨ Key Features

### 🔥 Swipeable Profiles
- Tinder-style card interface
- Swipe right to like, left to pass
- Super like for must-have teammates
- Smooth animations and instant feedback

### 👥 Smart Matching
- Match when both users swipe right
- Instant notification when you match
- See all your matches in one place

### 💬 Built-in Chat
- Chat directly with your matches
- Real-time messaging
- Coordinate hackathon plans seamlessly

### 🏆 Devfolio Integration (Demo)
- Verified developer badges
- Pull past hackathon achievements
- Display completed projects
- Show skill endorsements
- Trust indicators from the Devfolio ecosystem

### 🎛️ Advanced Filters
- Filter by role (Frontend, Backend, Designer, ML, etc.)
- Filter by availability (Weekend, Full-time, Flexible)
- Find exactly who you need for your team

### 📊 Rich Profiles
- Skills and technologies
- Interests and domains
- Past hackathon wins
- Availability status
- Location information
- Personal bio

## 🔌 Devfolio Integration

### How It Would Work (Implementation Notes)

**Current Demo:** Uses mock data that simulates Devfolio profiles

**Production Integration:**
1. **OAuth Login**: Users authenticate via Devfolio
2. **Profile Sync**: Automatically pull:
   - Username and avatar
   - Skills and technologies
   - Past hackathon submissions
   - Project history
   - Achievement badges
   - GitHub and social links

3. **API Endpoints** (Proposed):
```javascript
// Example integration code
GET /api/devfolio/profile/{username}
{
  "name": "Priya Sharma",
  "skills": ["React", "Node.js", "Solidity"],
  "hackathons": [
    {
      "name": "ETHIndia 2024",
      "position": "Winner",
      "project": "DeFi Dashboard"
    }
  ],
  "projects": [...],
  "verified": true
}
```

4. **Trust Score**: Leverage Devfolio's verification system
5. **Project Showcase**: Display actual hackathon submissions
6. **Team History**: Show previous collaborations

## 🎮 How to Use

### 1. Open the App
```bash
# Just open hackstack.html in your browser
open hackstack.html

# Or use a local server
python -m http.server 8000
# Visit http://localhost:8000/hackstack.html
```

### 2. Discover Teammates
- Browse through developer profiles
- Read their skills, interests, and past achievements
- Swipe right if you'd like to team up
- Swipe left to pass

### 3. Match & Chat
- When both users swipe right, it's a match!
- Start chatting immediately
- Discuss project ideas and hackathon plans
- Form your dream team

## 🛠 Tech Stack

- **Frontend**: Pure HTML5, CSS3, Vanilla JavaScript
- **No Dependencies**: Works completely offline
- **Responsive Design**: Perfect on mobile and desktop
- **Modern UI**: Gradient designs, smooth animations

## 🎨 UI/UX Highlights

- **Beautiful Gradients**: Purple-blue gradient theme
- **Smooth Animations**: Card swipes, modal pop-ups, heartbeat effects
- **Mobile-First**: Optimized for phone screens
- **Intuitive**: Familiar Tinder-style interface
- **Fast**: No loading times, instant interactions

## 📱 Features Breakdown

### Swipe View
- Card-based profile browsing
- Touch/mouse drag support
- Visual swipe indicators
- Action buttons for quick decisions
- Filter options at the top

### Matches View
- Grid of all your matches
- Unread message badges
- Quick access to chat
- Match timestamp tracking

### Profile View
- Your own profile display
- Skills and interests showcase
- Past hackathon achievements
- Devfolio verification badge
- Edit capabilities (coming soon)

### Chat System
- Real-time messaging interface
- Message bubbles (sent/received)
- Online status indicators
- Smooth scrolling
- Enter to send

## 🚀 Future Enhancements

### Phase 1 (MVP+)
- [ ] User authentication
- [ ] Real Devfolio API integration
- [ ] Profile editing
- [ ] Photo uploads
- [ ] Advanced matching algorithm

### Phase 2 (Growth)
- [ ] Team formation (3-4 members)
- [ ] Hackathon event integration
- [ ] Skill endorsements
- [ ] Team analytics
- [ ] Video introductions

### Phase 3 (Scale)
- [ ] AI-powered matching
- [ ] Team compatibility scores
- [ ] Project idea sharing
- [ ] Resource sharing
- [ ] Post-hackathon collaboration

## 💡 Use Cases

### For Participants
- Find teammates before hackathons
- Build diverse, skilled teams
- Connect with people in your timezone
- Match based on interests and availability

### For Organizers
- Help participants form teams
- Reduce solo participants
- Increase hackathon completion rates
- Build community engagement

### For Platforms (Devfolio)
- Add value to the ecosystem
- Increase user engagement
- Enable better hackathon outcomes
- Create networking opportunities

## 🎯 Target Audience

- **Hackathon participants** looking for teammates
- **Solo developers** wanting to join teams
- **Students** attending their first hackathon
- **Experienced hackers** seeking skilled collaborators
- **Hackathon organizers** facilitating team formation

## 📊 Metrics to Track

- Swipe rate
- Match rate
- Message response rate
- Team formation success
- Hackathon completion rate
- User retention

## 🔒 Privacy & Safety

- Only matched users can message each other
- Report/block functionality (to be added)
- Verified profiles via Devfolio
- No profile visible without consent
- Clear data handling policies

## 🤝 Contributing

This is a demo/prototype. To make it production-ready:

1. **Backend**: Build Node.js/Python backend
2. **Database**: Store user profiles, matches, messages
3. **Auth**: Implement Devfolio OAuth
4. **Real-time**: Add WebSocket for live chat
5. **Storage**: Image uploads and hosting
6. **Testing**: Unit and integration tests
7. **Deployment**: Host on cloud platform

## 📞 Contact & Feedback

Built as a demo for hackathon team formation. Feedback welcome!

---

**Made with ❤️ for the hackathon community**

🔗 Perfect for Devfolio users | ETHGlobal | HackMIT | And more!

