// Game State
const gameState = {
    currentChapter: 'intro',
    knowledge: 0,
    tokens: 0,
    inventory: [],
    visitedChapters: new Set(),
    choices: {},
    location: 'Earth Station'
};

// Canvas and Animation
let canvas, ctx;
let particles = [];
let currentEra = 'neutral';

// Initialize Canvas
function initCanvas() {
    canvas = document.getElementById('scene-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Start animation loop
    animate();
}

// Particle system for visual effects
class Particle {
    constructor(x, y, type = 'default') {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = 0.01;
        this.type = type;
        this.size = Math.random() * 3 + 2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        
        if (this.type === 'read') {
            ctx.fillStyle = '#00f3ff';
        } else if (this.type === 'write') {
            ctx.fillStyle = '#8a2be2';
        } else if (this.type === 'own') {
            ctx.fillStyle = '#ff00ff';
        } else {
            ctx.fillStyle = '#ffffff';
        }
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;
        
        ctx.restore();
    }
}

// Draw era-specific visuals
function drawEraScene() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw based on current era
    if (currentEra === 'read') {
        drawReadEra();
    } else if (currentEra === 'write') {
        drawWriteEra();
    } else if (currentEra === 'own') {
        drawOwnEra();
    } else {
        drawNeutralEra();
    }
    
    // Draw particles
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => {
        p.update();
        p.draw(ctx);
    });
}

function drawReadEra() {
    // One-way data streams
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 5; i++) {
        const y = (i + 1) * (canvas.height / 6);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        
        // Animated arrows
        const offset = (Date.now() / 20) % canvas.width;
        ctx.fillStyle = '#00f3ff';
        ctx.beginPath();
        ctx.moveTo(offset, y);
        ctx.lineTo(offset - 10, y - 5);
        ctx.lineTo(offset - 10, y + 5);
        ctx.fill();
    }
}

function drawWriteEra() {
    // Chaotic network with central hub
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Central corporate hub
    ctx.fillStyle = '#8a2be2';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#8a2be2';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Users connecting to center
    const numNodes = 8;
    for (let i = 0; i < numNodes; i++) {
        const angle = (i / numNodes) * Math.PI * 2;
        const radius = 100;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Connection line
        ctx.strokeStyle = '#8a2be2';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // User node
        ctx.fillStyle = '#00f3ff';
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawOwnEra() {
    // Decentralized mesh network
    const numNodes = 12;
    const nodes = [];
    
    for (let i = 0; i < numNodes; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        nodes.push({ x, y });
    }
    
    // Draw connections
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Draw nodes
    nodes.forEach(node => {
        ctx.fillStyle = '#ff00ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff00ff';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function drawNeutralEra() {
    // Gentle particles
    if (Math.random() < 0.1) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            'default'
        ));
    }
}

function animate() {
    drawEraScene();
    requestAnimationFrame(animate);
}

// Add floating token animation
function addFloatingToken(x, y, symbol = '🪙') {
    const container = document.getElementById('floating-tokens');
    const token = document.createElement('div');
    token.className = 'floating-token';
    token.textContent = symbol;
    token.style.left = x + 'px';
    token.style.top = y + 'px';
    container.appendChild(token);
    
    setTimeout(() => token.remove(), 3000);
}

// Mini-Games
const miniGames = {
    // Token Collector Game
    tokenCollector: {
        start: function(callback) {
            const container = document.getElementById('minigame-container');
            container.classList.remove('hidden');
            container.innerHTML = `
                <h3 class="minigame-title">🪙 COLLECT TOKENS 🪙</h3>
                <p style="text-align: center; color: #aaa;">Click the falling tokens before they disappear!</p>
                <div class="game-score">Score: <span id="token-score">0</span> / 20</div>
                <div class="token-game" id="token-game"></div>
            `;
            
            let score = 0;
            const gameArea = document.getElementById('token-game');
            const scoreDisplay = document.getElementById('token-score');
            let interval;
            let gameActive = true;
            
            function spawnToken() {
                if (!gameActive) return;
                
                const token = document.createElement('div');
                token.className = 'falling-token';
                token.textContent = ['🪙', '💎', '⭐'][Math.floor(Math.random() * 3)];
                token.style.left = Math.random() * (gameArea.offsetWidth - 40) + 'px';
                token.style.top = '0px';
                
                gameArea.appendChild(token);
                
                token.addEventListener('click', () => {
                    score += token.textContent === '💎' ? 3 : 1;
                    scoreDisplay.textContent = score;
                    token.remove();
                    
                    if (score >= 20) {
                        gameActive = false;
                        clearInterval(interval);
                        setTimeout(() => {
                            container.classList.add('hidden');
                            callback(score);
                        }, 500);
                    }
                });
                
                // Fall animation
                let top = 0;
                const fall = setInterval(() => {
                    if (!gameActive) {
                        clearInterval(fall);
                        return;
                    }
                    top += 3;
                    token.style.top = top + 'px';
                    
                    if (top > gameArea.offsetHeight) {
                        token.remove();
                        clearInterval(fall);
                    }
                }, 30);
            }
            
            interval = setInterval(spawnToken, 800);
            
            // Auto-complete after 30 seconds
            setTimeout(() => {
                if (gameActive) {
                    gameActive = false;
                    clearInterval(interval);
                    container.classList.add('hidden');
                    callback(score);
                }
            }, 30000);
        }
    },
    
    // Blockchain Builder
    blockchainBuilder: {
        start: function(callback) {
            const container = document.getElementById('minigame-container');
            container.classList.remove('hidden');
            container.innerHTML = `
                <h3 class="minigame-title">⛓️ BUILD A BLOCKCHAIN ⛓️</h3>
                <p style="text-align: center; color: #aaa;">Click blocks in order to chain them together!</p>
                <div class="blockchain-grid" id="blockchain-grid"></div>
            `;
            
            const grid = document.getElementById('blockchain-grid');
            const blocks = [];
            const numBlocks = 6;
            
            for (let i = 0; i < numBlocks; i++) {
                const block = document.createElement('div');
                block.className = 'block';
                block.innerHTML = `
                    <div style="font-size: 2em;">🔗</div>
                    <div style="font-size: 0.9em; margin-top: 5px;">Block ${i + 1}</div>
                `;
                block.dataset.index = i;
                
                if (i > 0) block.classList.add('locked');
                
                block.addEventListener('click', () => {
                    const index = parseInt(block.dataset.index);
                    if (block.classList.contains('locked')) return;
                    
                    block.classList.add('connected');
                    block.innerHTML += '<div style="color: #00ff00; margin-top: 5px;">✓ Connected</div>';
                    
                    // Unlock next block
                    if (index < numBlocks - 1) {
                        const nextBlock = grid.children[index + 1];
                        nextBlock.classList.remove('locked');
                    } else {
                        // All blocks connected!
                        setTimeout(() => {
                            container.classList.add('hidden');
                            callback(true);
                        }, 1000);
                    }
                });
                
                grid.appendChild(block);
                blocks.push(block);
            }
        }
    },
    
    // DAO Voting
    daoVoting: {
        start: function(callback) {
            const container = document.getElementById('minigame-container');
            container.classList.remove('hidden');
            container.innerHTML = `
                <h3 class="minigame-title">🗳️ DAO GOVERNANCE 🗳️</h3>
                <div class="dao-voting">
                    <div class="proposal">
                        <h4>Proposal #1: Allocate 10% treasury to creator grants</h4>
                        <p style="color: #aaa;">As a token holder, your vote matters!</p>
                        <div class="vote-buttons">
                            <button class="vote-btn yes" onclick="miniGames.daoVoting.vote('yes', 1)">✓ Vote YES</button>
                            <button class="vote-btn no" onclick="miniGames.daoVoting.vote('no', 1)">✗ Vote NO</button>
                        </div>
                        <div class="vote-progress" id="progress-1"></div>
                    </div>
                    <div class="proposal">
                        <h4>Proposal #2: Implement community moderation system</h4>
                        <p style="color: #aaa;">This affects how the network operates.</p>
                        <div class="vote-buttons">
                            <button class="vote-btn yes" onclick="miniGames.daoVoting.vote('yes', 2)">✓ Vote YES</button>
                            <button class="vote-btn no" onclick="miniGames.daoVoting.vote('no', 2)">✗ Vote NO</button>
                        </div>
                        <div class="vote-progress" id="progress-2"></div>
                    </div>
                </div>
            `;
            
            this.callback = callback;
            this.votesNeeded = 2;
            this.votesCast = 0;
        },
        
        vote: function(choice, proposalId) {
            const progress = document.getElementById(`progress-${proposalId}`);
            progress.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 100%;">
                        ${choice === 'yes' ? 'PASSED ✓' : 'REJECTED ✗'}
                    </div>
                </div>
            `;
            
            // Disable buttons
            const buttons = progress.parentElement.querySelectorAll('.vote-btn');
            buttons.forEach(btn => btn.disabled = true);
            
            this.votesCast++;
            
            if (this.votesCast >= this.votesNeeded) {
                setTimeout(() => {
                    document.getElementById('minigame-container').classList.add('hidden');
                    this.callback(true);
                }, 1500);
            }
        }
    },
    
    // Network Builder
    networkBuilder: {
        start: function(callback) {
            const container = document.getElementById('minigame-container');
            container.classList.remove('hidden');
            container.innerHTML = `
                <h3 class="minigame-title">🌐 BUILD A DECENTRALIZED NETWORK 🌐</h3>
                <p style="text-align: center; color: #aaa;">Click to add nodes. Connect at least 6 nodes!</p>
                <div class="game-score">Nodes: <span id="node-count">0</span> / 6</div>
                <div class="network-canvas" id="network-canvas"></div>
            `;
            
            const networkCanvas = document.getElementById('network-canvas');
            const nodeCountDisplay = document.getElementById('node-count');
            const nodes = [];
            
            networkCanvas.addEventListener('click', (e) => {
                const rect = networkCanvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Create node
                const node = document.createElement('div');
                node.className = 'network-node';
                node.textContent = '🌐';
                node.style.left = (x - 30) + 'px';
                node.style.top = (y - 30) + 'px';
                
                networkCanvas.appendChild(node);
                nodes.push({ x, y, element: node });
                
                nodeCountDisplay.textContent = nodes.length;
                
                // Draw connections
                drawConnections(networkCanvas, nodes);
                
                if (nodes.length >= 6) {
                    setTimeout(() => {
                        container.classList.add('hidden');
                        callback(true);
                    }, 1000);
                }
            });
        }
    }
};

function drawConnections(canvas, nodes) {
    // Remove old connections
    canvas.querySelectorAll('.network-connection').forEach(c => c.remove());
    
    // Draw new connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const line = document.createElement('div');
                line.className = 'network-connection';
                line.style.left = nodes[i].x + 'px';
                line.style.top = nodes[i].y + 'px';
                line.style.width = distance + 'px';
                line.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
                canvas.appendChild(line);
            }
        }
    }
}

// Story Chapters (updated with mini-games)
const chapters = {
    intro: {
        location: 'Earth Station',
        era: 'neutral',
        text: `
            <p>Year 2157. You are <span class="highlight">Nova</span>, a Digital Archaeologist aboard the Earth Station.</p>
            <p>Your mission: explore the three legendary sectors of the <span class="important">Decentralized Galaxy</span> to understand how humanity evolved from passive consumers to true digital citizens.</p>
            <p>Your AI companion, <span class="highlight">PROTO</span>, materializes beside you:</p>
            <p><em>"Commander Nova, we've detected strange temporal signals from three sectors: The READ Nebula, The WRITE Constellation, and The OWN Expanse. Each holds secrets about the evolution of the digital universe."</em></p>
            <p>You check your star map. Where will you begin your journey?</p>
        `,
        choices: [
            { text: 'Travel to the READ Nebula (The Ancient Web)', next: 'read_intro', knowledge: 0 },
            { text: 'Jump to the WRITE Constellation (The Social Web)', next: 'write_intro', knowledge: 0 },
            { text: 'Learn about the mission from PROTO', next: 'mission_briefing', knowledge: 0 }
        ]
    },

    mission_briefing: {
        location: 'Earth Station - Command Center',
        era: 'neutral',
        text: `
            <p>PROTO projects a holographic timeline in front of you:</p>
            <p><em>"The ancient humans went through three major digital eras. Understanding these will help us build a better future."</em></p>
            <p><span class="highlight">The READ Era (Web1):</span> Information flowed in one direction. Humans could only consume content created by a few.</p>
            <p><span class="highlight">The WRITE Era (Web2):</span> Everyone could create, but powerful corporations controlled everything. Users built value but didn't own it.</p>
            <p><span class="important">The OWN Era (Web3):</span> The revolution. Creators and users finally owned their digital assets through decentralized networks.</p>
            <p><em>"Each sector holds artifacts and lessons. Ready to begin?"</em></p>
        `,
        choices: [
            { text: 'Visit the READ Nebula first', next: 'read_intro', knowledge: 5 },
            { text: 'Visit the WRITE Constellation first', next: 'write_intro', knowledge: 5 }
        ]
    },

    read_intro: {
        location: 'READ Nebula',
        era: 'read',
        text: `
            <p>Your ship materializes in the <span class="highlight">READ Nebula</span>, a vast field of one-way data streams.</p>
            <p>Ancient websites float like frozen monuments: static pages, unchanging, eternal. Information flows in only one direction - from server to viewer.</p>
            <p>PROTO scans the area: <em>"This is Web1, Commander. The internet's first era, 1990-2004. Pure, simple, read-only."</em></p>
            <p>You see one-way information streams flowing across the viewscreen. No interaction. No feedback. Just pure data transmission.</p>
            <p><span class="highlight">Web1 Lesson:</span> The internet started as a library - you could read, but not write back.</p>
        `,
        choices: [
            { text: 'Examine the data streams more closely', next: 'read_deep', knowledge: 10, item: 'HTML Fragment' },
            { text: 'Move on to the WRITE Constellation', next: 'write_intro', knowledge: 0 }
        ]
    },

    read_deep: {
        location: 'READ Nebula - Ancient Core',
        era: 'read',
        text: `
            <p>In the heart of the nebula, you find something remarkable: the original vision.</p>
            <p>Tim Berners-Lee's proposal for the World Wide Web. Open. Decentralized. Permissionless.</p>
            <p>PROTO whispers: <em>"This is important, Commander. The internet STARTED with Web3 principles - open protocols, no gatekeepers, free information."</em></p>
            <p><em>"But creation was hard. Only those who could code could publish. The READ era was democratic in consumption but aristocratic in creation."</em></p>
            <p><span class="important">Critical Understanding:</span> Web3 isn't new - it's returning to the internet's original vision with better tools.</p>
        `,
        choices: [
            { text: 'Journey to the WRITE Constellation', next: 'write_intro', knowledge: 20, item: 'Original Vision Data' }
        ]
    },

    write_intro: {
        location: 'WRITE Constellation',
        era: 'write',
        text: `
            <p>The <span class="important">WRITE Constellation</span> explodes with color and chaos!</p>
            <p>Billions of voices shouting simultaneously. Videos, tweets, posts, likes, shares, comments flowing in torrential streams.</p>
            <p>But beneath the creative explosion, you notice something dark: massive corporate planets, each with gravity wells pulling all the data toward them.</p>
            <p>PROTO alerts: <em>"Web2, Commander. 2004-2020. Everyone can create... but look who owns it all."</em></p>
            <p>You see the pattern: users create → platforms capture → shareholders profit.</p>
        `,
        choices: [
            { text: 'Investigate the corporate structure', next: 'write_corporate', knowledge: 10 },
            { text: 'Skip to the OWN Expanse', next: 'own_intro', knowledge: 0 }
        ]
    },

    write_corporate: {
        location: 'WRITE Constellation - Corporate Core',
        era: 'write',
        text: `
            <p>You approach Platform Prime - the heart of Web2.</p>
            <p>Inside: user content being processed, packaged, monetized. But profits flow upward to shareholders, not creators.</p>
            <p>PROTO analyzes: <em>"The paradox of Web2: democratized creation, centralized ownership. Billions of users created value, but a few companies captured it."</em></p>
            <p><span class="important">Web2's Trap:</span> Free tools, but you build on their land. They own everything. They control the rules.</p>
            <p><em>"YouTube creators made the content but owned nothing. Twitter users created the network but had no stake. It was exploitation disguised as opportunity."</em></p>
        `,
        choices: [
            { text: 'This needs to change. Go to the OWN Expanse', next: 'own_intro', knowledge: 20, item: 'Web2 Blueprint' }
        ]
    },

    own_intro: {
        location: 'OWN Expanse',
        era: 'own',
        text: `
            <p>The <span class="important">OWN Expanse</span> is unlike anything you've seen.</p>
            <p>No corporate planets. Instead: interconnected networks - DAOs, protocols, communities - operating independently but interoperably.</p>
            <p>No single point of control. No overlords. Just code, cryptography, and community.</p>
            <p>PROTO explains: <em>"Welcome to Web3. Here, users ARE the network. Ownership is programmable. Value flows to creators."</em></p>
            <p>Tokens flow freely. Smart contracts execute transparently. Communities govern themselves.</p>
            <p><span class="highlight">The Vision:</span> What if users owned the networks they help build?</p>
        `,
        choices: [
            { text: 'Learn about tokens by collecting some!', next: 'own_tokens_game', knowledge: 10 },
            { text: 'Understand blockchain', next: 'own_blockchain_game', knowledge: 10 }
        ]
    },

    own_tokens_game: {
        location: 'OWN Expanse - Token Network',
        era: 'own',
        text: `
            <p>PROTO smiles: <em>"Let's make this interactive! Tokens are everywhere here - catch some!"</em></p>
            <p>Get ready to collect tokens...</p>
        `,
        minigame: 'tokenCollector',
        afterGame: function(score) {
            gameState.tokens += score;
            updateStats();
            displayChapter('own_tokens_explain');
        },
        choices: []
    },

    own_tokens_explain: {
        location: 'OWN Expanse - Token Network',
        era: 'own',
        text: `
            <p>Great work! You collected tokens through action, not just reading about them.</p>
            <p>PROTO explains: <em>"Tokens are programmable ownership. They represent your stake in a network, your voting power, your share of value."</em></p>
            <p><em>"Imagine if early Facebook users got Facebook tokens. As the network grew, so would your ownership. You'd have voting rights. You'd earn from the value YOU helped create."</em></p>
            <p><span class="highlight">Token Insight:</span> Tokens turn users into stakeholders. When the network wins, everyone wins.</p>
        `,
        choices: [
            { text: 'Learn how blockchain works', next: 'own_blockchain_game', knowledge: 15 },
            { text: 'Experience DAO governance', next: 'own_dao_game', knowledge: 0 }
        ]
    },

    own_blockchain_game: {
        location: 'OWN Expanse - Blockchain Core',
        era: 'own',
        text: `
            <p>PROTO: <em>"Let me show you how blockchain works. Build a chain!"</em></p>
        `,
        minigame: 'blockchainBuilder',
        afterGame: function(success) {
            if (success) {
                gameState.knowledge += 20;
                updateStats();
            }
            displayChapter('own_blockchain_explain');
        },
        choices: []
    },

    own_blockchain_explain: {
        location: 'OWN Expanse - Blockchain Core',
        era: 'own',
        text: `
            <p>You built a blockchain! Each block connected to the previous one, forming an unbreakable chain.</p>
            <p>PROTO: <em>"That's the genius of blockchain. Each block is cryptographically linked. Change one block, and the whole chain breaks."</em></p>
            <p><em>"This creates trust without intermediaries. No bank needed. No platform needed. Just math and cryptography."</em></p>
            <p><span class="important">Blockchain Insight:</span> Decentralized truth through distributed consensus.</p>
        `,
        choices: [
            { text: 'Experience DAO voting', next: 'own_dao_game', knowledge: 15 },
            { text: 'Build a decentralized network', next: 'own_network_game', knowledge: 0 }
        ]
    },

    own_dao_game: {
        location: 'OWN Expanse - DAO Sphere',
        era: 'own',
        text: `
            <p>PROTO: <em>"Time to participate in governance. You're a token holder - your voice matters!"</em></p>
        `,
        minigame: 'daoVoting',
        afterGame: function(success) {
            if (success) {
                gameState.knowledge += 20;
                gameState.tokens += 30;
                updateStats();
            }
            displayChapter('own_dao_explain');
        },
        choices: []
    },

    own_dao_explain: {
        location: 'OWN Expanse - DAO Sphere',
        era: 'own',
        text: `
            <p>You just participated in decentralized governance!</p>
            <p>PROTO: <em>"In Web2, platforms made decisions behind closed doors. In Web3, governance is transparent and participatory."</em></p>
            <p><em>"Every token holder can vote. Smart contracts execute decisions automatically. No CEO can override. No board can veto."</em></p>
            <p><span class="important">Governance Insight:</span> Code is law, and the community writes the code.</p>
            <p>You earned 30 tokens for participating! 🎉</p>
        `,
        choices: [
            { text: 'Build a decentralized network', next: 'own_network_game', knowledge: 15 },
            { text: 'See how it all connects', next: 'own_synthesis', knowledge: 0 }
        ]
    },

    own_network_game: {
        location: 'OWN Expanse - Network Builder',
        era: 'own',
        text: `
            <p>PROTO: <em>"Now build a network. In Web3, you're not just a user - you're an owner and architect!"</em></p>
        `,
        minigame: 'networkBuilder',
        afterGame: function(success) {
            if (success) {
                gameState.knowledge += 25;
                gameState.tokens += 50;
                updateStats();
            }
            displayChapter('own_network_explain');
        },
        choices: []
    },

    own_network_explain: {
        location: 'OWN Expanse - Network Builder',
        era: 'own',
        text: `
            <p>You built a decentralized network! Notice how there's no central hub?</p>
            <p>PROTO: <em>"In Web2, everything flowed through corporate servers. One point of failure. One point of control."</em></p>
            <p><em>"In Web3, the network is peer-to-peer. Resilient. Censorship-resistant. Owned by the community."</em></p>
            <p><span class="important">Network Insight:</span> Decentralization creates resilience and true ownership.</p>
            <p>You earned 50 tokens for building! 🚀</p>
        `,
        choices: [
            { text: 'I understand now. Show me the big picture', next: 'own_synthesis', knowledge: 20 }
        ]
    },

    own_synthesis: {
        location: 'OWN Expanse - Central Node',
        era: 'own',
        text: `
            <p>Everything clicks into place.</p>
            <p>PROTO creates a holographic visualization:</p>
            <p><span class="highlight">READ (Web1):</span> Open protocols, limited participation → "Here's information"</p>
            <p><span class="highlight">WRITE (Web2):</span> Easy creation, corporate capture → "Express yourself, we'll profit"</p>
            <p><span class="important">OWN (Web3):</span> Decentralized ownership, aligned incentives → "Build together, own together"</p>
            <p><em>"The arc of the internet is bending toward ownership. Not as an end, but as a foundation for sustainable, equitable networks."</em></p>
            <p>You've earned ${gameState.knowledge} knowledge points and ${gameState.tokens} tokens through active participation!</p>
        `,
        choices: [
            { text: 'Complete the journey', next: 'finale', knowledge: 25, tokens: 50 }
        ]
    },

    finale: {
        location: 'The Nexus - Between All Eras',
        era: 'own',
        text: `
            <p>You find yourself in a space between all three sectors.</p>
            <p>PROTO speaks: <em>"Commander Nova, you didn't just READ about these eras - you EXPERIENCED them."</em></p>
            <p><em>"You collected tokens. Built blockchains. Voted in DAOs. Created networks. You understand through doing."</em></p>
            <p>A message appears in the stars:</p>
            <p class="important">"Networks need to reward the people who make them valuable. That's how you build things that last." - Chris Dixon</p>
            <p><strong>Final Score:</strong></p>
            <p>💡 Knowledge: ${gameState.knowledge}</p>
            <p>🪙 Tokens: ${gameState.tokens}</p>
            <p>🎒 Artifacts: ${gameState.inventory.join(', ')}</p>
        `,
        choices: [
            { text: 'Return to Earth with this knowledge', next: 'ending', knowledge: 30 }
        ]
    },

    ending: {
        location: 'Earth Station - Your Future',
        era: 'neutral',
        text: `
            <p>Mission complete! You've journeyed through the evolution of the internet.</p>
            <p>PROTO: <em>"What will you build, Commander?"</em></p>
            <p><strong>You've learned:</strong></p>
            <p>✓ Why the internet started decentralized (Web1)</p>
            <p>✓ How centralization captured value (Web2)</p>
            <p>✓ Why ownership matters (Web3)</p>
            <p>✓ How tokens align incentives</p>
            <p>✓ What blockchains enable</p>
            <p>✓ How DAOs govern</p>
            <p>✓ Why decentralized networks are resilient</p>
            <p class="highlight">🎉 MISSION COMPLETE! 🎉</p>
            <p><em>"The future of the internet isn't written yet. But now you understand the principles: openness, ownership, and aligned incentives."</em></p>
        `,
        choices: [
            { text: '🚀 Play again', next: 'intro', knowledge: 0, reset: true }
        ]
    }
};

// Update UI functions
function updateStats() {
    document.getElementById('location').textContent = gameState.location;
    document.getElementById('knowledge').textContent = gameState.knowledge;
    document.getElementById('tokens').textContent = gameState.tokens;
}

function updateInventory() {
    const inventoryDiv = document.getElementById('inventory-items');
    if (gameState.inventory.length === 0) {
        inventoryDiv.innerHTML = '<div style="color: #888;">No items yet...</div>';
    } else {
        inventoryDiv.innerHTML = gameState.inventory
            .map(item => `<div class="inventory-item">${item}</div>`)
            .join('');
    }
}

function displayChapter(chapterId) {
    const chapter = chapters[chapterId];
    if (!chapter) return;

    // Update game state
    gameState.currentChapter = chapterId;
    gameState.location = chapter.location;
    gameState.visitedChapters.add(chapterId);
    
    // Update visual era
    if (chapter.era) {
        currentEra = chapter.era;
    }

    // Update story text with fade-in animation
    const storyDiv = document.getElementById('story-text');
    storyDiv.style.opacity = '0';
    
    setTimeout(() => {
        storyDiv.innerHTML = chapter.text;
        storyDiv.style.opacity = '1';
    }, 150);

    // Check for minigame
    if (chapter.minigame && miniGames[chapter.minigame]) {
        // Hide choices temporarily
        document.getElementById('choices-container').innerHTML = '';
        
        // Start minigame after a short delay
        setTimeout(() => {
            miniGames[chapter.minigame].start(chapter.afterGame);
        }, 1000);
    } else {
        // Display regular choices
        displayChoices(chapter);
    }

    updateStats();
    updateInventory();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function displayChoices(chapter) {
    const choicesDiv = document.getElementById('choices-container');
    choicesDiv.innerHTML = '';

    chapter.choices.forEach((choice) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        
        button.addEventListener('click', () => {
            // Handle choice
            if (choice.knowledge) {
                gameState.knowledge += choice.knowledge;
                // Visual feedback
                addFloatingToken(Math.random() * 300, 100, '💡');
            }
            if (choice.tokens) {
                gameState.tokens += choice.tokens;
                // Visual feedback
                addFloatingToken(Math.random() * 300, 100, '🪙');
            }
            if (choice.item && !gameState.inventory.includes(choice.item)) {
                gameState.inventory.push(choice.item);
            }
            if (choice.reset) {
                // Reset game
                gameState.knowledge = 0;
                gameState.tokens = 0;
                gameState.inventory = [];
                gameState.visitedChapters.clear();
            }

            // Update UI
            updateStats();
            updateInventory();

            // Go to next chapter
            displayChapter(choice.next);
        });

        choicesDiv.appendChild(button);
    });
}

// Initialize game
window.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    displayChapter('intro');
});

// Handle window resize
window.addEventListener('resize', () => {
    if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
});
