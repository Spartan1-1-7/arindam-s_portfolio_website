/*--------------------------------------------------------------
# Main JavaScript File
--------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    console.log('DOM Content Loaded - Starting initialization');
    
    // Initialize AOS with faster duration
    AOS.init({
        duration: 600,  // Reduced from 800 for faster animations
        easing: 'ease-in-out',
        once: false,   // Changed to false to allow reanimating on scroll
        mirror: false,
        offset: 50     // Reduced offset to trigger animations sooner
    });
    
    // Initialize Particles.js
    initParticles();
    
    // Initialize the theme switcher
    console.log('Initializing theme switcher...');
    initThemeSwitcher();
    
    // Initialize the navigation
    initNavigation();
    
    // Initialize the project filter buttons
    initProjectFilters();
    
    // Initialize neural network on homepage
    initNeuralNetwork();
    console.log("Neural network initialized");
    
    // Initialize cursor effect
    initCursorEffect();
    console.log("Cursor effect initialized");
    
    // Skills are now static cards, no progress animation needed
    
    // Log homepage loaded
    if (document.querySelector('.hero-section')) {
        console.log("Homepage loaded successfully");
    }
});

/*--------------------------------------------------------------
# Particles.js Initialization
--------------------------------------------------------------*/
function initParticles() {
    if (document.getElementById('particles-js')) {
        // Get current theme
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const config = currentTheme === 'dark' ? darkModeParticles : lightModeParticles;
        
        // Initialize particles with the appropriate theme configuration
        particlesJS('particles-js', config);
    }
}

/*--------------------------------------------------------------
# Theme Switcher
--------------------------------------------------------------*/
function initThemeSwitcher() {
    const themeButton = document.getElementById('theme-button');
    const themeIcon = document.getElementById('theme-icon');
    
    console.log('Theme button:', themeButton);
    console.log('Theme icon:', themeIcon);
    
    if (!themeButton || !themeIcon) {
        console.error('Theme toggle elements not found');
        return;
    }
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme based on saved preference or default to light theme
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    updateThemeIcon(initialTheme, themeIcon);
    
    // Add theme toggle event listener
    themeButton.addEventListener('click', function() {
        console.log('Theme button clicked');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Switching from', currentTheme, 'to', newTheme);
        
        // Set the new theme
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update the icon
        updateThemeIcon(newTheme, themeIcon);
        
        // Reset and re-initialize particles when theme changes to ensure correct colors
        if (window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
            setTimeout(() => {
                initParticles();
            }, 50);
        }
        
        // Also refresh neural network connections if on homepage
        if (document.querySelector('.neural-network')) {
            setTimeout(() => {
                initNeuralNetwork();
            }, 100);
        }
    });
}

function setTheme(theme) {
    console.log('Setting theme to:', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    
    // Force a style recalculation
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Add the theme class to the body for additional styling
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
}

function updateThemeIcon(theme, iconElement) {
    if (!iconElement) return;
    
    if (theme === 'dark') {
        iconElement.classList.remove('fa-moon');
        iconElement.classList.add('fa-sun');
    } else {
        iconElement.classList.remove('fa-sun');
        iconElement.classList.add('fa-moon');
    }
}

/*--------------------------------------------------------------
# Navigation
--------------------------------------------------------------*/
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Add sticky navigation on scroll
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only for internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });
}

/*--------------------------------------------------------------
# Project Filters
--------------------------------------------------------------*/
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Get all project items
                const projectItems = document.querySelectorAll('.project-item');
                
                // Filter projects
                let visibleProjects = 0;
                
                projectItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'All' || category === filterValue) {
                        item.style.display = 'block';
                        visibleProjects++;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Show/hide no projects message
                const noProjectsMessage = document.querySelector('.no-projects-message');
                if (noProjectsMessage) {
                    if (visibleProjects === 0) {
                        noProjectsMessage.style.display = 'block';
                    } else {
                        noProjectsMessage.style.display = 'none';
                    }
                }
            });
        });
    }
}

/*--------------------------------------------------------------
# Page Transition and Loading
--------------------------------------------------------------*/
function initPageTransition() {
    // Add click event to all internal links
    document.querySelectorAll('a').forEach(link => {
        // Only for internal links that are not anchor links
        if (link.getAttribute('href') && 
            link.hostname === window.location.hostname && 
            !link.getAttribute('href').startsWith('#') &&
            !link.hasAttribute('target')) {
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('href');
                
                // Show loading animation
                document.body.classList.add('page-loading');
                
                // Create loading bar with particles
                const loadingBar = document.createElement('div');
                loadingBar.className = 'loading-bar';
                document.body.appendChild(loadingBar);
                
                // Create particle container
                const particleContainer = document.createElement('div');
                particleContainer.className = 'loading-particles';
                document.body.appendChild(particleContainer);
                
                // Create particles
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        createLoadingParticle(particleContainer);
                    }, i * 200);
                }
                
                // Animate loading bar with more steps for a flashier effect
                setTimeout(() => {
                    loadingBar.style.width = '20%';
                    setTimeout(() => {
                        loadingBar.style.width = '40%';
                        setTimeout(() => {
                            loadingBar.style.width = '60%';
                            setTimeout(() => {
                                loadingBar.style.width = '80%';
                                setTimeout(() => {
                                    loadingBar.style.width = '100%';
                                    // Navigate to the link after animation completes
                                    setTimeout(() => {
                                        window.location.href = target;
                                    }, 300);
                                }, 100);
                            }, 100);
                        }, 100);
                    }, 100);
                }, 10);
            });
        }
    });
    
    // Add loaded class to body when page is loaded
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        document.body.classList.remove('page-loading');
        
        // Cleanup any leftover loading elements
        const loadingBar = document.querySelector('.loading-bar');
        const particleContainer = document.querySelector('.loading-particles');
        
        if (loadingBar) {
            loadingBar.remove();
        }
        
        if (particleContainer) {
            particleContainer.remove();
        }
    });
}

/**
 * Creates an animated particle to enhance the loading animation
 * @param {HTMLElement} container - The container to add the particle to
 */
function createLoadingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'loading-particle';
    
    // Random position along the loading bar
    const posX = Math.random() * window.innerWidth;
    particle.style.left = posX + 'px';
    
    // Random size
    const size = Math.random() * 2 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random animation duration
    const duration = Math.random() * 1 + 2;
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

/*--------------------------------------------------------------
# Cursor Effect
--------------------------------------------------------------*/
function initCursorEffect() {
    // Create cursor follower element if it doesn't exist
    if (!document.querySelector('.cursor-follower')) {
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        document.body.appendChild(follower);
        
        // Add smaller cursor dot
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            // Update position with slight delay for follower (trailing effect)
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
            
            // Update dot position immediately
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
        });
        
        // Add hover effect for links and interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .project-card, .skill-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.classList.add('active');
                dot.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('active');
                dot.classList.remove('active');
            });
        });
        
        // Hide default cursor when moving
        document.body.classList.add('custom-cursor');
        
        // Hide cursor when leaving the window
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                follower.style.opacity = '0';
                dot.style.opacity = '0';
            }
        });
        
        // Show cursor when entering the window
        document.addEventListener('mouseover', () => {
            follower.style.opacity = '1';
            dot.style.opacity = '1';
        });
    }
}

/*--------------------------------------------------------------
# Neural Network Animation
--------------------------------------------------------------*/
function initNeuralNetwork() {
    const neuralNetwork = document.querySelector('.neural-network');
    
    if (neuralNetwork) {
        // Clear existing content
        neuralNetwork.innerHTML = '';
        
        // Create the neural network layers
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 400 200');
        
        // Create layer groups
        createLayer(svg, 60, 3, 'input-layer');
        createLayer(svg, 150, 4, 'hidden-layer-1');
        createLayer(svg, 240, 4, 'hidden-layer-2');
        createLayer(svg, 330, 2, 'output-layer');
        
        neuralNetwork.appendChild(svg);
        
        // Get all nodes after adding to DOM
        const inputLayer = svg.querySelectorAll('.input-layer circle');
        const hiddenLayer1 = svg.querySelectorAll('.hidden-layer-1 circle');
        const hiddenLayer2 = svg.querySelectorAll('.hidden-layer-2 circle');
        const outputLayer = svg.querySelectorAll('.output-layer circle');
        
        // Create connections between layers
        const connections = createConnections(inputLayer, hiddenLayer1, svg);
        connections.push(...createConnections(hiddenLayer1, hiddenLayer2, svg));
        connections.push(...createConnections(hiddenLayer2, outputLayer, svg));
        
        // Animate nodes
        animateNodes(inputLayer);
        animateNodes(hiddenLayer1);
        animateNodes(hiddenLayer2);
        animateNodes(outputLayer);
        
        // Highlight random paths periodically
        setInterval(() => {
            highlightRandomPath(inputLayer, hiddenLayer1, hiddenLayer2, outputLayer, connections);
        }, 3000);
        
        console.log('Neural network initialized');
    }
}

function createConnections(fromLayer, toLayer, parent) {
    const createdConnections = [];
    
    for (let i = 0; i < fromLayer.length; i++) {
        for (let j = 0; j < toLayer.length; j++) {
            const fromNode = fromLayer[i];
            const toNode = toLayer[j];
            
            const x1 = fromNode.getAttribute('cx');
            const y1 = fromNode.getAttribute('cy');
            const x2 = toNode.getAttribute('cx');
            const y2 = toNode.getAttribute('cy');
            
            const connection = document.createElementNS("http://www.w3.org/2000/svg", "line");
            connection.setAttribute('x1', x1);
            connection.setAttribute('y1', y1);
            connection.setAttribute('x2', x2);
            connection.setAttribute('y2', y2);
            connection.setAttribute('class', 'connection');
            connection.dataset.from = i;
            connection.dataset.to = j;
            
            // Add a random delay to the animation
            connection.style.animationDelay = `${Math.random() * 2}s`;
            
            // Insert before nodes to ensure they're drawn on top
            parent.insertBefore(connection, parent.firstChild);
            
            // Store the connection
            createdConnections.push(connection);
        }
    }
    
    return createdConnections;
}

function createLayer(parent, x, nodeCount, className) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute('class', className);
    
    const spacing = 160 / (nodeCount - 1);
    const startY = 20;
    
    for (let i = 0; i < nodeCount; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', startY + (i * spacing));
        circle.setAttribute('r', 7);
        circle.setAttribute('class', 'node');
        group.appendChild(circle);
    }
    
    parent.appendChild(group);
    return group;
}

function animateNodes(nodes) {
    nodes.forEach((node, index) => {
        // Create a pulsing animation
        const animationDelay = index * 0.2;
        node.style.animation = `pulseNode 3s infinite ${animationDelay}s`;
    });
}

function highlightRandomPath(inputLayer, hiddenLayer1, hiddenLayer2, outputLayer, connections) {
    // Reset all connections and nodes
    connections.forEach(conn => {
        conn.classList.remove('active-connection');
    });
    
    const allNodes = [...inputLayer, ...hiddenLayer1, ...hiddenLayer2, ...outputLayer];
    allNodes.forEach(node => {
        node.classList.remove('active-node');
    });
    
    // Select random nodes from each layer
    const inputNode = inputLayer[Math.floor(Math.random() * inputLayer.length)];
    const hidden1Node = hiddenLayer1[Math.floor(Math.random() * hiddenLayer1.length)];
    const hidden2Node = hiddenLayer2[Math.floor(Math.random() * hiddenLayer2.length)];
    const outputNode = outputLayer[Math.floor(Math.random() * outputLayer.length)];
    
    // Highlight the selected nodes
    [inputNode, hidden1Node, hidden2Node, outputNode].forEach(node => {
        node.classList.add('active-node');
    });
    
    // Find and highlight connections between these nodes
    const inputIndex = Array.from(inputLayer).indexOf(inputNode);
    const hidden1Index = Array.from(hiddenLayer1).indexOf(hidden1Node);
    const hidden2Index = Array.from(hiddenLayer2).indexOf(hidden2Node);
    const outputIndex = Array.from(outputLayer).indexOf(outputNode);
    
    // Highlight connections in the path
    connections.forEach(conn => {
        const fromLayer = conn.parentNode.querySelector(`.input-layer circle[cx="${conn.getAttribute('x1')}"]`) ? 'input' :
                        conn.parentNode.querySelector(`.hidden-layer-1 circle[cx="${conn.getAttribute('x1')}"]`) ? 'hidden1' :
                        'hidden2';
        
        const toLayer = conn.parentNode.querySelector(`.hidden-layer-1 circle[cx="${conn.getAttribute('x2')}"]`) ? 'hidden1' :
                       conn.parentNode.querySelector(`.hidden-layer-2 circle[cx="${conn.getAttribute('x2')}"]`) ? 'hidden2' :
                       'output';
        
        if ((fromLayer === 'input' && toLayer === 'hidden1' && 
             conn.getAttribute('x1') === inputNode.getAttribute('cx') && 
             conn.getAttribute('x2') === hidden1Node.getAttribute('cx')) ||
            (fromLayer === 'hidden1' && toLayer === 'hidden2' && 
             conn.getAttribute('x1') === hidden1Node.getAttribute('cx') && 
             conn.getAttribute('x2') === hidden2Node.getAttribute('cx')) ||
            (fromLayer === 'hidden2' && toLayer === 'output' && 
             conn.getAttribute('x1') === hidden2Node.getAttribute('cx') && 
             conn.getAttribute('x2') === outputNode.getAttribute('cx'))) {
            conn.classList.add('active-connection');
        }
    });
    
    // Animate the path
    let delay = 0;
    [inputNode, hidden1Node, hidden2Node, outputNode].forEach(node => {
        setTimeout(() => {
            node.classList.add('pulse-animation');
            setTimeout(() => node.classList.remove('pulse-animation'), 1000);
        }, delay);
        delay += 300;
    });
}

/*--------------------------------------------------------------
# Skills Progress Animation
--------------------------------------------------------------*/
function initSkillsProgress() {
    const skillProgressItems = document.querySelectorAll('.skill-progress-item');
    
    if (skillProgressItems.length === 0) return;
    
    // Create intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressItem = entry.target;
                const progressBar = progressItem.querySelector('.progress-bar');
                const progressFill = progressItem.querySelector('.progress-fill');
                const percentage = progressBar.getAttribute('data-percentage');
                
                // Add animation class and set width
                progressItem.classList.add('animate');
                
                // Animate progress fill
                setTimeout(() => {
                    progressFill.style.width = percentage + '%';
                }, 200);
                
                // Unobserve after animation
                observer.unobserve(progressItem);
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
    });
    
    // Observe all skill progress items
    skillProgressItems.forEach(item => {
        observer.observe(item);
    });
    
    // Add hover effects for better interactivity
    skillProgressItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const progressFill = item.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.transform = 'scaleY(1.2)';
                progressFill.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const progressFill = item.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.transform = 'scaleY(1)';
            }
        });
    });
    
    // Handle tab switching to re-trigger animations
    const skillTabs = document.querySelectorAll('[data-bs-toggle="pill"]');
    skillTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', (event) => {
            const targetPaneId = event.target.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetPaneId);
            
            if (targetPane) {
                const progressItems = targetPane.querySelectorAll('.skill-progress-item');
                progressItems.forEach(item => {
                    const progressBar = item.querySelector('.progress-bar');
                    const progressFill = item.querySelector('.progress-fill');
                    const percentage = progressBar.getAttribute('data-percentage');
                    
                    // Reset and re-animate
                    progressFill.style.width = '0%';
                    item.classList.remove('animate');
                    
                    setTimeout(() => {
                        item.classList.add('animate');
                        progressFill.style.width = percentage + '%';
                    }, 100);
                });
            }
        });
    });
}

/*--------------------------------------------------------------
# Utility Functions
--------------------------------------------------------------*/
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateCountUp(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 1500; // milliseconds (faster than before)
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}