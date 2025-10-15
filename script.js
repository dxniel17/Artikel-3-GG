// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeQuiz();
    initializeTimeline();
    initializeSmoothScrolling();
    initializeHeroAnimations();
    initializeIntersectionObserver();
}

// Navigation Functionality
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.15)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Enhanced Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add visual feedback for CTA button
                if (this.classList.contains('cta-button')) {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                }
                
                // Smooth scroll with custom easing
                const targetPosition = targetSection.offsetTop - 80;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function easeInOutCubic(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t*t + b;
                    t -= 2;
                    return c/2*(t*t*t + 2) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// Scroll to section function for CTA button
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Hero Animations
function initializeHeroAnimations() {
    const heroText = document.querySelector('.hero-text');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroText && heroVisual) {
        // Animate hero elements on load
        setTimeout(() => {
            heroText.style.animation = 'fadeInLeft 1s ease-out forwards';
            heroVisual.style.animation = 'fadeInRight 1s ease-out forwards';
        }, 500);
    }
    
    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Enhanced Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.card, .quiz-option, .timeline-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section, .section').forEach(section => {
        observer.observe(section);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe cards and other animated elements
    document.querySelectorAll('.card, .fade-in, .slide-in').forEach(element => {
        observer.observe(element);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Intersection Observer for various animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('law-article')) {
                    entry.target.style.animation = 'fadeInUp 1s ease-out forwards';
                }
                
                if (entry.target.classList.contains('diversity-grid')) {
                    const cards = entry.target.querySelectorAll('.person-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                        }, index * 200);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elementsToObserve = document.querySelectorAll('.law-article, .diversity-grid, .key-points, .call-to-action');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Timeline Animations
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                
                // Animate timeline marker
                const marker = entry.target.querySelector('.timeline-marker');
                if (marker) {
                    setTimeout(() => {
                        marker.style.animation = 'pulse 1s ease-in-out';
                    }, 400);
                }
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        timelineObserver.observe(item);
        
        // Add click event for scroll animation
        item.addEventListener('click', function() {
            // Add click animation
            this.classList.add('clicked');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
            
            // Scroll to next timeline item or next section
            const nextItem = timelineItems[index + 1];
            if (nextItem) {
                // Scroll to next timeline item
                const targetPosition = nextItem.offsetTop - 100;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                // If it's the last item, scroll to next section
                const timelineSection = document.querySelector('.timeline-section');
                const nextSection = timelineSection ? timelineSection.nextElementSibling : null;
                if (nextSection) {
                    const targetPosition = nextSection.offsetTop - 80;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Quiz Functionality
function initializeQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    
    let currentQuestion = 1;
    let score = 0;
    let answers = {};
    const totalQuestions = 5;
    
    const questions = document.querySelectorAll('.quiz-question');
    const prevButton = document.querySelector('.quiz-prev');
    const nextButton = document.querySelector('.quiz-next');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const resultSection = document.querySelector('.quiz-result');
    const restartButton = document.querySelector('.quiz-restart');
    
    // Initialize quiz
    updateQuizDisplay();
    
    // Quiz option selection
    questions.forEach((question, questionIndex) => {
        const options = question.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove previous selections
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Add selection to clicked option
                this.classList.add('selected');
                
                // Store answer
                answers[questionIndex + 1] = {
                    selected: this,
                    correct: this.dataset.correct === 'true'
                };
                
                // Enable next button
                nextButton.disabled = false;
                
                // Auto-advance after short delay
                setTimeout(() => {
                    if (currentQuestion < totalQuestions) {
                        nextQuestion();
                    } else {
                        showResults();
                    }
                }, 1000);
            });
        });
    });
    
    // Navigation buttons
    prevButton.addEventListener('click', prevQuestion);
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);
    
    function updateQuizDisplay() {
        // Hide all questions
        questions.forEach(q => q.classList.remove('active'));
        
        // Show current question
        const currentQ = document.querySelector(`[data-question="${currentQuestion}"]`);
        if (currentQ) {
            currentQ.classList.add('active');
        }
        
        // Update progress
        const progress = (currentQuestion / totalQuestions) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${currentQuestion} / ${totalQuestions}`;
        
        // Update navigation buttons
        prevButton.disabled = currentQuestion === 1;
        nextButton.disabled = !answers[currentQuestion];
        
        // Hide result section
        resultSection.style.display = 'none';
    }
    
    function nextQuestion() {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            updateQuizDisplay();
            animateQuestionTransition();
        } else {
            showResults();
        }
    }
    
    function prevQuestion() {
        if (currentQuestion > 1) {
            currentQuestion--;
            updateQuizDisplay();
            animateQuestionTransition();
        }
    }
    
    function animateQuestionTransition() {
        const activeQuestion = document.querySelector('.quiz-question.active');
        if (activeQuestion) {
            activeQuestion.style.animation = 'fadeInRight 0.5s ease-out';
        }
    }
    
    function showResults() {
        // Calculate score
        score = 0;
        Object.values(answers).forEach(answer => {
            if (answer.correct) score++;
        });
        
        // Hide questions and navigation
        questions.forEach(q => q.style.display = 'none');
        document.querySelector('.quiz-navigation').style.display = 'none';
        
        // Show results
        resultSection.style.display = 'block';
        
        // Update score display
        const scoreNumber = document.querySelector('.score-number');
        const resultMessage = document.querySelector('.result-message');
        
        if (scoreNumber) {
            scoreNumber.textContent = score;
        }
        
        // Set result message based on score
        let message = '';
        if (score === 5) {
            message = 'Perfekt! Du bist ein echter Grundrechts-Experte! 🎉';
        } else if (score >= 4) {
            message = 'Sehr gut! Du kennst dich super mit Artikel 3 aus! 👏';
        } else if (score >= 3) {
            message = 'Gut gemacht! Du hast die wichtigsten Punkte verstanden! 👍';
        } else if (score >= 2) {
            message = 'Nicht schlecht! Mit etwas mehr Übung wirst du noch besser! 💪';
        } else {
            message = 'Das war ein guter Anfang! Lies dir die Inhalte nochmal durch! 📚';
        }
        
        if (resultMessage) {
            resultMessage.textContent = message;
        }
        
        // Animate result display
        resultSection.style.animation = 'fadeInUp 0.8s ease-out';
        
        // Show correct/incorrect answers
        showAnswerFeedback();
    }
    
    function showAnswerFeedback() {
        Object.entries(answers).forEach(([questionNum, answer]) => {
            const question = document.querySelector(`[data-question="${questionNum}"]`);
            const options = question.querySelectorAll('.quiz-option');
            
            options.forEach(option => {
                if (option.dataset.correct === 'true') {
                    option.classList.add('correct');
                } else if (option === answer.selected && !answer.correct) {
                    option.classList.add('incorrect');
                }
            });
        });
    }
    
    function restartQuiz() {
        // Reset variables
        currentQuestion = 1;
        score = 0;
        answers = {};
        
        // Reset UI
        questions.forEach(q => {
            q.style.display = 'block';
            q.classList.remove('active');
            
            // Reset option styles
            const options = q.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.classList.remove('selected', 'correct', 'incorrect');
            });
        });
        
        document.querySelector('.quiz-navigation').style.display = 'flex';
        resultSection.style.display = 'none';
        
        updateQuizDisplay();
    }
}

// Interactive Elements Enhancement
function enhanceInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.meaning-card, .example-card, .person-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to key points
    const keyPoints = document.querySelectorAll('.key-point');
    keyPoints.forEach(point => {
        point.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    // Add interactive timeline markers
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const content = this.parentElement.querySelector('.timeline-content');
            content.style.animation = 'pulse 0.8s ease-in-out';
            setTimeout(() => {
                content.style.animation = '';
            }, 800);
        });
    });
}

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add keyboard navigation for quiz
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.querySelector('.quiz-prev');
            if (prevBtn && !prevBtn.disabled) {
                prevBtn.click();
            }
        } else if (e.key === 'ArrowRight') {
            const nextBtn = document.querySelector('.quiz-next');
            if (nextBtn && !nextBtn.disabled) {
                nextBtn.click();
            }
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, .quiz-option');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Performance Optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
}

// Error Handling
function setupErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript Error:', e.error);
        // Graceful degradation - ensure basic functionality still works
    });
    
    // Handle missing elements gracefully
    function safeQuerySelector(selector) {
        try {
            return document.querySelector(selector);
        } catch (e) {
            console.warn(`Element not found: ${selector}`);
            return null;
        }
    }
    
    // Make safeQuerySelector available globally
    window.safeQuerySelector = safeQuerySelector;
}

// Analytics and Tracking (Privacy-friendly)
function initializeAnalytics() {
    // Track quiz completion
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        const restartButton = document.querySelector('.quiz-restart');
        if (restartButton) {
            restartButton.addEventListener('click', function() {
                // Track quiz restart (without personal data)
                console.log('Quiz restarted');
            });
        }
    }
    
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Section viewed: ${entry.target.id}`);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

// Mobile-specific enhancements
function enhanceMobileExperience() {
    // Touch gestures for quiz navigation
    let touchStartX = 0;
    let touchEndX = 0;
    
    const quizContainer = document.querySelector('.quiz-container');
    if (quizContainer) {
        quizContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        quizContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next question
                    const nextBtn = document.querySelector('.quiz-next');
                    if (nextBtn && !nextBtn.disabled) {
                        nextBtn.click();
                    }
                } else {
                    // Swipe right - previous question
                    const prevBtn = document.querySelector('.quiz-prev');
                    if (prevBtn && !prevBtn.disabled) {
                        prevBtn.click();
                    }
                }
            }
        }
    }
    
    // Optimize for mobile viewport
    function handleViewportChange() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', handleViewportChange);
    handleViewportChange();
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function() {
    enhanceInteractiveElements();
    enhanceAccessibility();
    optimizePerformance();
    setupErrorHandling();
    initializeAnalytics();
    enhanceMobileExperience();
});

// CSS Animation Keyframes (added via JavaScript for dynamic control)
function addDynamicAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-10px); }
            70% { transform: translateY(-5px); }
            90% { transform: translateY(-2px); }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px var(--primary-color); }
            50% { box-shadow: 0 0 20px var(--primary-color), 0 0 30px var(--primary-color); }
        }
    `;
    document.head.appendChild(style);
}

// Call dynamic animations
addDynamicAnimations();

// Export functions for potential external use
window.QuizApp = {
    scrollToSection,
    initializeQuiz,
    enhanceInteractiveElements
};