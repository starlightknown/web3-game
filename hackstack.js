// App State
const appState = {
    currentUser: {
        name: 'You',
        avatar: '👨‍💻',
        role: 'Full Stack Developer',
        skills: ['React', 'Node.js', 'Python', 'TypeScript'],
        interests: ['Web3', 'AI/ML', 'Mobile Dev'],
        availability: 'weekend',
        location: 'India'
    },
    profiles: [],
    currentProfileIndex: 0,
    matches: [],
    currentChat: null,
    chats: {},
    filters: {
        role: 'all',
        availability: 'all',
        location: 'all',
        hackathon: 'all'
    },
    stats: {
        profilesViewed: 0,
        matchesMade: 0,
        superLikesUsed: 0,
        totalChemistry: 0,
        chemistryCount: 0
    }
};

// Mock Developer Profiles (Simulating Devfolio-style data)
const mockProfiles = [
    {
        id: 1,
        name: 'Priya Sharma',
        avatar: '👩‍💻',
        role: 'Frontend Developer',
        location: 'Bangalore, India',
        skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Figma'],
        interests: ['Web3', 'DeFi', 'NFTs'],
        availability: 'weekend',
        bio: 'Passionate about creating beautiful UIs. Love hackathons and building in public!',
        hackathons: ['ETHIndia 2024 - Winner', 'HackBangalore 2024 - 2nd Place'],
        devfolioVerified: true,
        pastProjects: 3
    },
    {
        id: 2,
        name: 'Alex Chen',
        avatar: '👨‍🎨',
        role: 'UI/UX Designer',
        location: 'San Francisco, USA',
        skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
        interests: ['Design Systems', 'Accessibility', 'AR/VR'],
        availability: 'flexible',
        bio: 'Designer who codes! I believe great products come from great teams.',
        hackathons: ['TreeHacks 2024 - Best Design', 'CalHacks 2024'],
        devfolioVerified: true,
        pastProjects: 5
    },
    {
        id: 3,
        name: 'Rahul Verma',
        avatar: '🧑‍💻',
        role: 'Backend Developer',
        location: 'Mumbai, India',
        skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS'],
        interests: ['Microservices', 'Cloud Architecture', 'APIs'],
        availability: 'weekend',
        bio: 'Building scalable systems. Love optimizing performance and solving complex problems.',
        hackathons: ['SIH 2024 - Finalist', 'HackMumbai 2024 - Winner'],
        devfolioVerified: true,
        pastProjects: 7
    },
    {
        id: 4,
        name: 'Sarah Johnson',
        avatar: '👩‍🔬',
        role: 'ML Engineer',
        location: 'Boston, USA',
        skills: ['TensorFlow', 'PyTorch', 'Python', 'NLP', 'Computer Vision'],
        interests: ['AI Ethics', 'Healthcare AI', 'Generative AI'],
        availability: 'fulltime',
        bio: 'ML enthusiast working on making AI more accessible. Always learning!',
        hackathons: ['HackMIT 2024 - Best AI Project', 'AI Hackathon 2024'],
        devfolioVerified: true,
        pastProjects: 4
    },
    {
        id: 5,
        name: 'Arjun Patel',
        avatar: '🧑‍🚀',
        role: 'Blockchain Developer',
        location: 'Ahmedabad, India',
        skills: ['Solidity', 'Web3.js', 'Hardhat', 'Rust', 'React'],
        interests: ['DeFi', 'DAOs', 'Smart Contracts'],
        availability: 'weekend',
        bio: 'Building the decentralized future, one smart contract at a time!',
        hackathons: ['ETHGlobal 2024 - Top 10', 'Web3Conf Hackathon - Winner'],
        devfolioVerified: true,
        pastProjects: 6
    },
    {
        id: 6,
        name: 'Emily Zhang',
        avatar: '👩‍🎨',
        role: 'Full Stack Developer',
        location: 'Toronto, Canada',
        skills: ['React', 'Django', 'PostgreSQL', 'Docker', 'GraphQL'],
        interests: ['SaaS', 'DevOps', 'Open Source'],
        availability: 'flexible',
        bio: 'Full-stack generalist. I love turning ideas into working products quickly.',
        hackathons: ['Hack the North 2024', 'TOHacks 2024 - 3rd Place'],
        devfolioVerified: true,
        pastProjects: 8
    },
    {
        id: 7,
        name: 'Mohamed Ali',
        avatar: '👨‍💼',
        role: 'Product Manager',
        location: 'Dubai, UAE',
        skills: ['Product Strategy', 'User Research', 'Agile', 'SQL', 'Analytics'],
        interests: ['FinTech', 'EdTech', 'Product Design'],
        availability: 'weekend',
        bio: 'Technical PM who understands both code and users. Let\'s build something people love!',
        hackathons: ['GITEX Hackathon 2024 - Winner', 'Dubai Startup Weekend'],
        devfolioVerified: true,
        pastProjects: 5
    },
    {
        id: 8,
        name: 'Jessica Lee',
        avatar: '👩‍🚀',
        role: 'Mobile Developer',
        location: 'Seoul, South Korea',
        skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
        interests: ['Mobile UX', 'Performance', 'Cross-platform'],
        availability: 'fulltime',
        bio: 'Mobile-first developer. Creating delightful experiences on iOS and Android.',
        hackathons: ['Seoul Hack 2024 - Best Mobile App', 'Junction 2024'],
        devfolioVerified: true,
        pastProjects: 6
    },
    {
        id: 9,
        name: 'Carlos Rodriguez',
        avatar: '🧑‍🔬',
        role: 'Data Scientist',
        location: 'Barcelona, Spain',
        skills: ['Python', 'R', 'Pandas', 'Scikit-learn', 'Tableau'],
        interests: ['Data Viz', 'Predictive Analytics', 'Big Data'],
        availability: 'weekend',
        bio: 'Turning data into insights and insights into action. Love finding patterns!',
        hackathons: ['Barcelona Tech Week - Winner', 'Data Fest 2024'],
        devfolioVerified: true,
        pastProjects: 4
    },
    {
        id: 10,
        name: 'Aisha Khan',
        avatar: '👩‍💻',
        role: 'DevOps Engineer',
        location: 'London, UK',
        skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform'],
        interests: ['Infrastructure', 'Automation', 'Security'],
        availability: 'flexible',
        bio: 'Automating all the things! Passionate about reliable, scalable systems.',
        hackathons: ['London Hack 2024', 'CloudFest Hackathon - Winner'],
        devfolioVerified: true,
        pastProjects: 5
    }
];

// Initialize
function init() {
    // Check if we have Devfolio profiles in localStorage
    const devfolioProfiles = localStorage.getItem('hackstack-devfolio-profiles');
    
    if (devfolioProfiles) {
        try {
            const parsedProfiles = JSON.parse(devfolioProfiles);
            if (parsedProfiles && parsedProfiles.length > 0) {
                appState.profiles = [...parsedProfiles, ...mockProfiles]; // Combine with mock profiles
                console.log(`Loaded ${parsedProfiles.length} cached profiles!`);
                
                // Show notification only if we have real cached profiles
                if (parsedProfiles.length > 5) {
                    showNotification(`✅ Loaded ${parsedProfiles.length} cached developer profiles!`);
                }
            } else {
                appState.profiles = [...mockProfiles];
            }
        } catch (error) {
            console.error('Error loading cached profiles:', error);
            appState.profiles = [...mockProfiles];
        }
    } else {
        appState.profiles = [...mockProfiles];
        console.log(`Using ${mockProfiles.length} default profiles`);
    }
    
    renderCurrentCard();
    updateMatchBadge();
}

// Fetch real Devfolio profiles from backend
async function fetchDevfolioProfiles() {
    const refreshBtn = document.getElementById('refresh-profiles');
    if (refreshBtn) {
        refreshBtn.classList.add('loading');
        refreshBtn.querySelector('span:last-child').textContent = 'Fetching...';
    }
    
    try {
        showNotification('🔄 Fetching developer profiles...');
        
        // Call our backend API (works locally and in production)
        const apiUrl = window.location.hostname === 'localhost' 
            ? 'http://localhost:3000/api/devfolio/profiles?limit=15'
            : '/api/devfolio/profiles?limit=15';
            
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error('Backend server not responding. Make sure to run: npm start');
        }
        
        const data = await response.json();
        
        console.log('Received data:', data);
        
        if (data.success && data.profiles && data.profiles.length > 0) {
            console.log('Received profiles:', data.profiles.length);
            console.log('First profile:', data.profiles[0]);
            
            // Save to localStorage
            localStorage.setItem('hackstack-devfolio-profiles', JSON.stringify(data.profiles));
            
            // Update app state - REPLACE ALL profiles with fetched ones
            appState.profiles = data.profiles;
            appState.currentProfileIndex = 0;
            
            // Clear any cached state
            localStorage.removeItem('hackstack-auto-fetched');
            
            // Re-render
            renderCurrentCard();
            
            // Show different message based on source
            if (data.source === 'devfolio_api') {
                showNotification(`✅ Loaded ${data.profiles.length} REAL Devfolio profiles! 🎉`);
            } else if (data.source === 'mock') {
                showNotification(`✅ Loaded ${data.profiles.length} developer profiles (demo data)`);
            } else {
                showNotification(`✅ Loaded ${data.profiles.length} developer profiles!`);
            }
            
            console.log(`Successfully loaded ${data.profiles.length} profiles`);
        } else {
            throw new Error('No profiles received from server');
        }
        
    } catch (error) {
        console.error('Error fetching profiles:', error);
        
        let errorMessage = '❌ Could not connect to backend server.\n\n';
        
        if (error.message.includes('Failed to fetch') || error.message.includes('not responding')) {
            errorMessage += 'Please make sure the backend server is running:\n\n';
            errorMessage += '1. Open a new terminal\n';
            errorMessage += '2. cd /Users/karuna/Desktop/game\n';
            errorMessage += '3. npm start\n\n';
            errorMessage += 'The server should be running on port 3000.';
        } else {
            errorMessage += error.message;
        }
        
        alert(errorMessage);
        
        // Show current profiles count
        showNotification(`Using ${appState.profiles.length} default profiles`);
    } finally {
        if (refreshBtn) {
            refreshBtn.classList.remove('loading');
            refreshBtn.querySelector('span:last-child').textContent = 'Fetch Profiles';
        }
    }
}

// Tab Navigation
function showTab(tabName) {
    // Update active tab
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Show corresponding view
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    document.getElementById(`${tabName}-view`).classList.add('active');
    
    // Render content based on tab
    if (tabName === 'matches') {
        renderMatches();
    }
}

// Render Profile Card
function renderCurrentCard() {
    const container = document.getElementById('card-container');
    const filteredProfiles = getFilteredProfiles();
    
    if (appState.currentProfileIndex >= filteredProfiles.length) {
        // No more profiles
        document.getElementById('no-more-cards').classList.remove('hidden');
        document.getElementById('action-buttons').classList.add('hidden');
        return;
    }
    
    document.getElementById('no-more-cards').classList.add('hidden');
    document.getElementById('action-buttons').classList.remove('hidden');
    
    const profile = filteredProfiles[appState.currentProfileIndex];
    
    const card = document.createElement('div');
    card.className = 'profile-card-swipe';
    card.id = 'current-card';
    
    // Calculate team chemistry score (quirky feature!)
    const chemistryScore = calculateChemistry(profile);
    const chemistryClass = chemistryScore >= 80 ? 'high' : chemistryScore >= 60 ? 'medium' : 'low';
    
    // Track chemistry for stats
    appState.stats.totalChemistry += chemistryScore;
    appState.stats.chemistryCount++;
    updateStats();
    
    // Generate project idea based on skills
    const projectIdea = generateProjectIdea(profile);
    
    // Check skill complement
    const skillComplement = checkSkillComplement(profile);
    
    card.innerHTML = `
        <div class="card-image-container" style="background: ${profile.profileImage ? `url('${profile.profileImage}') center/cover` : 'linear-gradient(135deg, #3770FF, #2563EB)'};">
            ${!profile.profileImage ? `<div class="card-avatar">${profile.avatar}</div>` : ''}
            <div class="chemistry-score ${chemistryClass}">
                ⚡ ${chemistryScore}% Match
            </div>
            ${profile.devfolioVerified ? `
                <div class="devfolio-badge">
                    <span class="badge-icon">🏆</span>
                    <span>Devfolio Verified</span>
                </div>
            ` : ''}
            <div class="swipe-indicator left">✕</div>
            <div class="swipe-indicator right">❤️</div>
        </div>
        <div class="card-content">
            <div class="card-header">
                <h2 class="card-name">${profile.name}</h2>
                <p class="card-role">${profile.role}</p>
                <p class="card-location">📍 ${profile.location}</p>
            </div>
            
            <div class="card-section">
                <h4>About</h4>
                <p class="card-bio">${profile.bio}</p>
            </div>
            
            <div class="card-section">
                <h4>Skills</h4>
                <div class="skills-container">
                    ${profile.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            
            <div class="card-section">
                <h4>Interests</h4>
                <div class="skills-container">
                    ${profile.interests.map(interest => `<span class="interest-tag">${interest}</span>`).join('')}
                </div>
            </div>
            
            <div class="card-section">
                <h4>Availability</h4>
                <p class="availability-info">
                    📅 ${formatAvailability(profile.availability)}
                </p>
            </div>
            
            <div class="card-section">
                <h4>Past Hackathons</h4>
                ${profile.hackathons.map(hack => `<div class="hackathon-badge">🏅 ${hack}</div>`).join('')}
            </div>
            
            ${skillComplement ? `
            <div class="skill-complement">
                <span class="skill-complement-icon">🤝</span>
                <span class="skill-complement-text">${skillComplement}</span>
            </div>
            ` : ''}
            
            ${projectIdea ? `
            <div class="project-idea">
                <strong>💡 Project Idea:</strong>
                ${projectIdea}
            </div>
            ` : ''}
            
            <div class="quick-actions">
                <button class="quick-btn" onclick="sendQuickMessage('${profile.id}', 'icebreaker')">
                    💬 Send Icebreaker
                </button>
                <button class="quick-btn" onclick="sendQuickMessage('${profile.id}', 'challenge')">
                    🎯 Coding Challenge
                </button>
            </div>
        </div>
    `;
    
    // Add touch/mouse swipe functionality
    addSwipeListeners(card, profile);
    
    // Remove old cards
    const oldCards = container.querySelectorAll('.profile-card-swipe');
    oldCards.forEach(old => old.remove());
    
    container.insertBefore(card, container.firstChild);
}

// Swipe Functionality
let startX = 0;
let currentX = 0;
let isDragging = false;

function addSwipeListeners(card, profile) {
    const leftIndicator = card.querySelector('.swipe-indicator.left');
    const rightIndicator = card.querySelector('.swipe-indicator.right');
    
    // Mouse events
    card.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        currentX = e.clientX;
        const diff = currentX - startX;
        
        card.style.transform = `translateX(${diff}px) rotate(${diff * 0.1}deg)`;
        
        // Show indicators
        if (diff < -50) {
            leftIndicator.classList.add('visible');
            rightIndicator.classList.remove('visible');
        } else if (diff > 50) {
            rightIndicator.classList.add('visible');
            leftIndicator.classList.remove('visible');
        } else {
            leftIndicator.classList.remove('visible');
            rightIndicator.classList.remove('visible');
        }
    });
    
    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const diff = currentX - startX;
        
        if (diff < -100) {
            swipeLeft(card, profile);
        } else if (diff > 100) {
            swipeRight(card, profile);
        } else {
            card.style.transform = '';
            leftIndicator.classList.remove('visible');
            rightIndicator.classList.remove('visible');
        }
    });
    
    // Touch events
    card.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        
        card.style.transform = `translateX(${diff}px) rotate(${diff * 0.1}deg)`;
        
        if (diff < -50) {
            leftIndicator.classList.add('visible');
            rightIndicator.classList.remove('visible');
        } else if (diff > 50) {
            rightIndicator.classList.add('visible');
            leftIndicator.classList.remove('visible');
        } else {
            leftIndicator.classList.remove('visible');
            rightIndicator.classList.remove('visible');
        }
    });
    
    document.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const diff = currentX - startX;
        
        if (diff < -100) {
            swipeLeft(card, profile);
        } else if (diff > 100) {
            swipeRight(card, profile);
        } else {
            card.style.transform = '';
            leftIndicator.classList.remove('visible');
            rightIndicator.classList.remove('visible');
        }
    });
}

function swipe(direction) {
    const card = document.getElementById('current-card');
    if (!card) return;
    
    const filteredProfiles = getFilteredProfiles();
    const profile = filteredProfiles[appState.currentProfileIndex];
    
    if (direction === 'left') {
        swipeLeft(card, profile);
    } else if (direction === 'right') {
        swipeRight(card, profile);
    }
}

function swipeLeft(card, profile) {
    card.classList.add('swiping-left');
    appState.stats.profilesViewed++;
    updateStats();
    setTimeout(() => {
        appState.currentProfileIndex++;
        renderCurrentCard();
    }, 500);
}

function swipeRight(card, profile) {
    card.classList.add('swiping-right');
    appState.stats.profilesViewed++;
    updateStats();
    
    // Check if it's a match (random for demo, would be based on their swipes in real app)
    const isMatch = Math.random() > 0.5;
    
    if (isMatch) {
        addMatch(profile);
        appState.stats.matchesMade++;
        updateStats();
        setTimeout(() => {
            showMatchModal(profile);
        }, 500);
    }
    
    setTimeout(() => {
        appState.currentProfileIndex++;
        renderCurrentCard();
    }, 500);
}

function superLike() {
    const card = document.getElementById('current-card');
    if (!card) return;
    
    const filteredProfiles = getFilteredProfiles();
    const profile = filteredProfiles[appState.currentProfileIndex];
    
    card.classList.add('super-liking');
    appState.stats.profilesViewed++;
    appState.stats.superLikesUsed++;
    appState.stats.matchesMade++;
    updateStats();
    
    // Super likes have higher match probability
    addMatch(profile);
    
    setTimeout(() => {
        showMatchModal(profile);
        appState.currentProfileIndex++;
        renderCurrentCard();
    }, 500);
}

// Match System
function addMatch(profile) {
    if (!appState.matches.find(m => m.id === profile.id)) {
        appState.matches.push({
            ...profile,
            matchedAt: new Date(),
            unread: 0
        });
        
        // Initialize chat
        appState.chats[profile.id] = [
            {
                sender: 'them',
                message: `Hey! Excited to work together on a hackathon! 🚀`,
                timestamp: new Date()
            }
        ];
        
        updateMatchBadge();
    }
}

function updateMatchBadge() {
    const badge = document.getElementById('match-badge');
    const unreadCount = appState.matches.reduce((sum, m) => sum + m.unread, 0);
    badge.textContent = unreadCount || appState.matches.length;
    badge.style.display = appState.matches.length > 0 ? 'block' : 'none';
}

// Match Modal
function showMatchModal(profile) {
    const modal = document.getElementById('match-modal');
    const matchName = document.getElementById('match-name');
    const matchedAvatar = document.getElementById('matched-avatar');
    
    matchName.textContent = profile.name;
    
    // Use profile image or emoji for matched avatar
    if (profile.profileImage) {
        matchedAvatar.style.backgroundImage = `url('${profile.profileImage}')`;
        matchedAvatar.style.backgroundSize = 'cover';
        matchedAvatar.style.backgroundPosition = 'center';
        matchedAvatar.textContent = '';
    } else {
        matchedAvatar.textContent = profile.avatar;
        matchedAvatar.style.backgroundImage = '';
    }
    
    // Store current match for "Send Message" button
    appState.currentMatch = profile;
    
    modal.classList.remove('hidden');
}

function closeMatchModal() {
    document.getElementById('match-modal').classList.add('hidden');
}

function openChat() {
    closeMatchModal();
    // Use the current match from the modal
    if (appState.currentMatch) {
        showChat(appState.currentMatch);
    }
}

// Matches View
function renderMatches() {
    const grid = document.getElementById('matches-grid');
    
    if (appState.matches.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">💫</span>
                <h3>No matches yet</h3>
                <p>Start swiping to find your perfect teammates!</p>
                <button class="btn-primary" onclick="showTab('swipe')">Start Swiping</button>
            </div>
        `;
        return;
    }
    
    // Clear grid first
    grid.innerHTML = '';
    
    // Create match cards with proper event listeners
    appState.matches.forEach((match) => {
        const matchCard = document.createElement('div');
        matchCard.className = 'match-card';
        matchCard.innerHTML = `
            <div class="match-card-image" style="background: ${match.profileImage ? `url('${match.profileImage}') center/cover` : 'linear-gradient(135deg, #3770FF, #2563EB)'};">
                ${!match.profileImage ? match.avatar : ''}
            </div>
            <div class="match-card-info">
                <h4>${match.name}</h4>
                <p>${match.role}</p>
                ${match.unread > 0 ? `<span class="unread-badge">${match.unread} new</span>` : ''}
            </div>
        `;
        
        // Add click listener properly
        matchCard.addEventListener('click', () => {
            console.log('Match card clicked:', match.name);
            showChat(match);
        });
        
        grid.appendChild(matchCard);
    });
}

// Chat System
function showChat(profile) {
    if (!profile) {
        console.error('No profile provided to showChat');
        return;
    }
    
    console.log('Opening chat with:', profile.name);
    
    appState.currentChat = profile.id;
    profile.unread = 0;
    updateMatchBadge();
    
    const modal = document.getElementById('chat-modal');
    const chatName = document.getElementById('chat-name');
    const chatAvatar = document.getElementById('chat-avatar');
    const chatMessages = document.getElementById('chat-messages');
    
    chatName.textContent = profile.name;
    
    // Use profile image or emoji
    if (profile.profileImage) {
        chatAvatar.style.backgroundImage = `url('${profile.profileImage}')`;
        chatAvatar.style.backgroundSize = 'cover';
        chatAvatar.style.backgroundPosition = 'center';
        chatAvatar.textContent = '';
    } else {
        chatAvatar.textContent = profile.avatar;
        chatAvatar.style.backgroundImage = '';
    }
    
    // Render messages
    const messages = appState.chats[profile.id] || [];
    chatMessages.innerHTML = messages.map(msg => `
        <div class="message ${msg.sender === 'me' ? 'sent' : 'received'}">
            <div class="message-bubble">${msg.message}</div>
        </div>
    `).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    modal.classList.remove('hidden');
    document.getElementById('chat-input').focus();
}

function closeChatModal() {
    document.getElementById('chat-modal').classList.add('hidden');
    appState.currentChat = null;
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message || !appState.currentChat) return;
    
    // Add message
    if (!appState.chats[appState.currentChat]) {
        appState.chats[appState.currentChat] = [];
    }
    
    appState.chats[appState.currentChat].push({
        sender: 'me',
        message: message,
        timestamp: new Date()
    });
    
    // Clear input
    input.value = '';
    
    // Re-render messages
    const profile = appState.matches.find(m => m.id === appState.currentChat);
    if (profile) {
        showChat(profile);
    }
    
    // Simulate response (in real app, this would be from the other user)
    setTimeout(() => {
        const responses = [
            'That sounds great!',
            'I totally agree!',
            'Let\'s do it! 🚀',
            'When should we start?',
            'I have some ideas about that!',
            'Perfect! I\'m excited to work on this.',
        ];
        
        appState.chats[appState.currentChat].push({
            sender: 'them',
            message: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date()
        });
        
        if (profile) {
            showChat(profile);
        }
    }, 1000 + Math.random() * 2000);
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Filters
document.getElementById('role-filter')?.addEventListener('change', applyFilters);
document.getElementById('availability-filter')?.addEventListener('change', applyFilters);

function applyFilters() {
    // Get filter values
    const roleFilter = document.getElementById('role-filter')?.value || 'all';
    const availFilter = document.getElementById('availability-filter')?.value || 'all';
    const locationFilter = document.getElementById('location-filter')?.value || 'all';
    const hackathonFilter = document.getElementById('hackathon-filter')?.value || 'all';
    
    // Update state
    appState.filters = {
        role: roleFilter,
        availability: availFilter,
        location: locationFilter,
        hackathon: hackathonFilter
    };
    
    // Reset index and re-render
    appState.currentProfileIndex = 0;
    renderCurrentCard();
}

function getFilteredProfiles() {
    return appState.profiles.filter(profile => {
        // Role filter
        const roleMatch = appState.filters.role === 'all' || 
                         profile.role.toLowerCase().includes(appState.filters.role);
        
        // Availability filter
        const availMatch = appState.filters.availability === 'all' || 
                          profile.availability === appState.filters.availability;
        
        // Location filter
        let locationMatch = true;
        if (appState.filters.location !== 'all') {
            if (appState.filters.location === 'nearby') {
                // Show India profiles as "nearby"
                locationMatch = profile.location && profile.location.toLowerCase().includes('india');
            } else if (appState.filters.location === 'india') {
                locationMatch = profile.location && profile.location.toLowerCase().includes('india');
            } else if (appState.filters.location === 'usa') {
                locationMatch = profile.location && (
                    profile.location.toLowerCase().includes('usa') ||
                    profile.location.toLowerCase().includes('united states') ||
                    profile.location.toLowerCase().includes('america')
                );
            } else if (appState.filters.location === 'europe') {
                locationMatch = profile.location && (
                    profile.location.toLowerCase().includes('uk') ||
                    profile.location.toLowerCase().includes('spain') ||
                    profile.location.toLowerCase().includes('germany') ||
                    profile.location.toLowerCase().includes('france') ||
                    profile.location.toLowerCase().includes('london') ||
                    profile.location.toLowerCase().includes('barcelona')
                );
            } else if (appState.filters.location === 'asia') {
                locationMatch = profile.location && (
                    profile.location.toLowerCase().includes('india') ||
                    profile.location.toLowerCase().includes('china') ||
                    profile.location.toLowerCase().includes('japan') ||
                    profile.location.toLowerCase().includes('korea') ||
                    profile.location.toLowerCase().includes('singapore') ||
                    profile.location.toLowerCase().includes('seoul')
                );
            }
        }
        
        // Hackathon filter
        let hackathonMatch = true;
        if (appState.filters.hackathon !== 'all' && profile.hackathons) {
            const hackathonList = profile.hackathons.join(' ').toLowerCase();
            if (appState.filters.hackathon === 'ethindia') {
                hackathonMatch = hackathonList.includes('ethindia') || hackathonList.includes('eth india');
            } else if (appState.filters.hackathon === 'devfolio') {
                hackathonMatch = hackathonList.includes('devfolio');
            } else if (appState.filters.hackathon === 'hackmit') {
                hackathonMatch = hackathonList.includes('hackmit') || hackathonList.includes('hack mit');
            } else if (appState.filters.hackathon === 'ethglobal') {
                hackathonMatch = hackathonList.includes('ethglobal') || hackathonList.includes('eth global');
            } else if (appState.filters.hackathon === 'calhacks') {
                hackathonMatch = hackathonList.includes('calhacks') || hackathonList.includes('cal hacks');
            }
        }
        
        return roleMatch && availMatch && locationMatch && hackathonMatch;
    });
}

// Update stats
function updateStats() {
    // Stats removed from UI, but keeping function for compatibility
}

// Helper Functions
function formatAvailability(availability) {
    const formats = {
        'weekend': 'Available on Weekends',
        'fulltime': 'Available Full-Time',
        'flexible': 'Flexible Schedule'
    };
    return formats[availability] || availability;
}

function resetCards() {
    appState.currentProfileIndex = 0;
    renderCurrentCard();
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideDown 0.3s ease-out;
        max-width: 90%;
        text-align: center;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translate(-50%, 0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Quirky Features

/**
 * Calculate team chemistry score
 */
function calculateChemistry(profile) {
    let score = 50; // Base score
    
    // Boost for shared interests
    const myInterests = appState.currentUser.interests;
    const sharedInterests = profile.interests.filter(i => myInterests.includes(i));
    score += sharedInterests.length * 10;
    
    // Boost for complementary skills
    const mySkills = appState.currentUser.skills;
    const hasComplementary = profile.skills.some(s => !mySkills.includes(s));
    if (hasComplementary) score += 15;
    
    // Boost for similar availability
    if (profile.availability === appState.currentUser.availability) score += 10;
    
    // Boost for high experience
    if (profile.pastProjects > 5) score += 10;
    
    // Random factor for fun
    score += Math.floor(Math.random() * 15);
    
    return Math.min(99, Math.max(45, score));
}

/**
 * Check if skills complement user's skills
 */
function checkSkillComplement(profile) {
    const mySkills = appState.currentUser.skills;
    const theirSkills = profile.skills;
    
    // Find skills they have that you don't
    const complementary = theirSkills.filter(s => !mySkills.includes(s));
    
    if (complementary.length >= 2) {
        return `Great complement! They bring ${complementary.slice(0, 2).join(', ')} to your stack.`;
    } else if (complementary.length === 1) {
        return `They can add ${complementary[0]} expertise to your team.`;
    }
    
    return null;
}

/**
 * Generate project idea based on combined skills
 */
function generateProjectIdea(profile) {
    const ideas = [
        'Build a decentralized social platform for hackathon teams',
        'Create an AI-powered code review tool',
        'Develop a Web3 crowdfunding platform',
        'Build a real-time collaboration IDE',
        'Create a blockchain-based credential system',
        'Develop an NFT marketplace for digital art',
        'Build a DAO governance dashboard',
        'Create an AI mentor chatbot for developers',
        'Develop a sustainable tech solution tracker',
        'Build a peer-to-peer learning platform'
    ];
    
    // Check if they have blockchain skills
    const hasWeb3 = profile.skills.some(s => 
        s.toLowerCase().includes('solidity') || 
        s.toLowerCase().includes('web3') ||
        s.toLowerCase().includes('ethereum')
    );
    
    if (hasWeb3) {
        return ideas[Math.floor(Math.random() * 6)]; // Web3 ideas
    }
    
    return ideas[Math.floor(Math.random() * ideas.length)];
}

/**
 * Send quick message (Quirky feature!)
 */
function sendQuickMessage(profileId, type) {
    const profile = appState.profiles.find(p => p.id == profileId);
    if (!profile) return;
    
    const icebreakers = [
        `Hey ${profile.name}! Love your hackathon track record! Want to team up for the next one? 🚀`,
        `Hi ${profile.name}! I see you've got skills in ${profile.skills[0]}. I'm working with ${appState.currentUser.skills[0]}. Let's build something awesome! 💻`,
        `${profile.name}! Your ${profile.pastProjects} projects are impressive! Looking for a teammate? 🤝`,
    ];
    
    const challenges = [
        `🎯 Quick Challenge: Build a button that shows your favorite emoji when clicked. React or Vanilla JS? You pick! 😄`,
        `🎯 Fun Challenge: What's your go-to tech stack for a 24-hour hackathon? Mine is ${appState.currentUser.skills.slice(0, 2).join(' + ')}!`,
        `🎯 Brain Teaser: If you had to build an MVP in 6 hours, would you prioritize features or polish? 🤔`,
    ];
    
    const message = type === 'icebreaker' ? 
        icebreakers[Math.floor(Math.random() * icebreakers.length)] :
        challenges[Math.floor(Math.random() * challenges.length)];
    
    // Auto-match and open chat
    addMatch(profile);
    appState.stats.matchesMade++;
    updateStats();
    
    // Add the message to chat
    if (!appState.chats[profile.id]) {
        appState.chats[profile.id] = [];
    }
    
    appState.chats[profile.id].push({
        sender: 'me',
        message: message,
        timestamp: new Date()
    });
    
    showNotification(`💬 Message sent to ${profile.name}!`);
    
    // Move to next card
    appState.currentProfileIndex++;
    renderCurrentCard();
}

// Initialize app on load
window.addEventListener('DOMContentLoaded', () => {
    init();
    updateStats();
});

