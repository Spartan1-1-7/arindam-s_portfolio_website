import os
import logging
from flask import Flask, render_template, request, redirect, url_for, send_file, abort
from models import db, Project, Achievement, Skill, Experience, Education, ContactMessage

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "default_secret_key_for_development")

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()

# Data for the portfolio
projects = [
    {
        "id": 1,
        "title": "MathInk",
        "description": "A CNN model to solve math equations from images, using OpenCV for preprocessing, Keras/TensorFlow for prediction and evaluation, and a Django-based frontend/backend for smooth user interaction.",
        "date": "April 2025",
        "technologies": ["Python", "Keras", "NumPy", "Pandas", "TensorFlow", "OpenCV", "Django"],
        "category": "Computer Vision",
        "github": "https://github.com/Spartan1-1-7/MathInk",
        "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
    },
    {
        "id": 2,
        "title": "PetVision",
        "description": "A CNN-based image classifier with data preprocessing and hyperparameter tuning, achieving 80% accuracy on the Kaggle Cats and Dogs dataset, and a prediction API for real-time inference.",
        "date": "March 2025",
        "technologies": ["Python", "Keras", "TensorFlow", "NumPy", "Pandas", "CNN"],
        "category": "Computer Vision",
        "github": "https://github.com/Spartan1-1-7/PetVision",
        "image": "https://images.unsplash.com/photo-1524351543168-8e38787614e9"
    },
    {
        "id": 3,
        "title": "Medical Chatbot",
        "description": "An NLP-based medical chatbot using Chainlit, LangChain, Hugging Face, and FAISS, with SQL querying, data preprocessing, and model evaluation for accurate, context-aware health responses.",
        "date": "September 2024",
        "technologies": ["Chainlit", "Python", "NLP", "LangChain", "FAISS", "Hugging Face"],
        "category": "Natural Language Processing",
        "github": "https://github.com/Spartan1-1-7/MedicalChatbot",
        "image": "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1"
    },
    {
        "id": 4,
        "title": "Seametry",
        "description": "A predictive model using Linear Regression and SVM with 85% accuracy to estimate oceanic salinity from temperature data, applying EDA, preprocessing, and evaluation on 50,000+ Kaggle entries.",
        "date": "June 2024",
        "technologies": ["pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"],
        "category": "Machine Learning",
        "github": "https://github.com/Spartan1-1-7/Seametry",
        "image": "https://images.unsplash.com/photo-1496715976403-7e36dc43f17b"
    },
    {
        "id": 5,
        "title": "Insight AI",
        "description": "Optimized business operations by developing predictive models with Scikit-learn, applying preprocessing, evaluation, and tuning, and building a scalable system that improved efficiency and increased market share by 15%.",
        "date": "April 2024",
        "technologies": ["Seaborn", "Scikit-learn", "MongoDB"],
        "category": "Machine Learning",
        "github": "https://github.com/Spartan1-1-7/InsightAI",
        "image": "https://images.unsplash.com/photo-1616161560417-66d4db5892ec"
    }
]

# Skills represented with a unified approach to avoid expertise categorization
skills = [
    {"name": "Python", "level": "Proficient", "category": "Languages", "icon": "fab fa-python"},
    {"name": "C/C++", "level": "Proficient", "category": "Languages", "icon": "fas fa-code"},
    {"name": "SQL", "level": "Proficient", "category": "Languages", "icon": "fas fa-database"},
    {"name": "Java", "level": "Proficient", "category": "Languages", "icon": "fab fa-java"},
    {"name": "DBMS", "level": "Proficient", "category": "Languages", "icon": "fas fa-server"},
    
    {"name": "Pandas", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-table"},
    {"name": "NumPy", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-calculator"},
    {"name": "Matplotlib", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-chart-line"},
    {"name": "Seaborn", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-chart-bar"},
    {"name": "Scikit-learn", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-robot"},
    {"name": "Django", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fab fa-python"},
    {"name": "Keras", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-brain"},
    {"name": "TensorFlow", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-network-wired"},
    {"name": "OpenCV", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-camera"},
    {"name": "LangChain", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-link"},
    {"name": "Hugging Face", "level": "Proficient", "category": "Libraries & Frameworks", "icon": "fas fa-robot"},
    
    {"name": "AI", "level": "Proficient", "category": "Concepts & Techniques", "icon": "fas fa-robot"},
    {"name": "ML", "level": "Proficient", "category": "Concepts & Techniques", "icon": "fas fa-cogs"},
    {"name": "CNN", "level": "Proficient", "category": "Concepts & Techniques", "icon": "fas fa-brain"},
    {"name": "NLP", "level": "Proficient", "category": "Concepts & Techniques", "icon": "fas fa-comment-alt"},
    {"name": "EDA", "level": "Proficient", "category": "Concepts & Techniques", "icon": "fas fa-search"},
    {"name": "Data Preprocessing", "level": "Proficient", "category": "Concepts & Techniques", "icon": "fas fa-filter"},
    {"name": "Model Evaluation", "level": "Proficient", "category": "Concepts & Techniques", "icon": "fas fa-check-circle"},
    {"name": "Hyperparameter Tuning", "level": "Proficient", "category": "Concepts & Techniques", "icon": "fas fa-sliders-h"},
    
    {"name": "Git/GitHub", "level": "Proficient", "category": "Developer Tools", "icon": "fab fa-github"},
    {"name": "VS Code", "level": "Proficient", "category": "Developer Tools", "icon": "fas fa-code"},
    {"name": "Jupyter Notebooks", "level": "Proficient", "category": "Developer Tools", "icon": "fas fa-book-open"},
    {"name": "PyCharm", "level": "Proficient", "category": "Developer Tools", "icon": "fas fa-laptop-code"},
    {"name": "Power BI", "level": "Proficient", "category": "Developer Tools", "icon": "fas fa-chart-pie"},
    {"name": "Excel", "level": "Proficient", "category": "Developer Tools", "icon": "fas fa-file-excel"},
    
    {"name": "Linux", "level": "Proficient", "category": "Operating Systems & Tools", "icon": "fab fa-linux"},
    {"name": "Bash", "level": "Proficient", "category": "Operating Systems & Tools", "icon": "fas fa-terminal"},
    {"name": "Shell Scripting", "level": "Proficient", "category": "Operating Systems & Tools", "icon": "fas fa-file-code"},
    {"name": "AWS", "level": "Proficient", "category": "Operating Systems & Tools", "icon": "fab fa-aws"},
    {"name": "Google Cloud", "level": "Proficient", "category": "Operating Systems & Tools", "icon": "fab fa-google"}
]

experiences = [
    {
        "title": "Team Lead, Web-Development and Design Team",
        "company": "Training and Placement Cell, Faculty of Engineering and Technology, University of Lucknow",
        "location": "Lucknow, India",
        "period": "Dec 2022 – Present",
        "description": "Orchestrated a team of 8 to revamp web content for placement drives, which resulted in a 25% increase in student participation and a 15% rise in corporate engagement."
    },
    {
        "title": "Team Lead (Intern), Graphic Designing and Video Editing Team",
        "company": "Brain Bytes",
        "location": "Lucknow, India",
        "period": "May 2023 – July 2023",
        "description": "Led and mentored a team of 5 creatives, managing end-to-end content creation workflows, task delegation, and performance tracking to ensure timely delivery of high-quality visual assets aligned with company goals."
    }
]

achievements = [
    {
        "title": "Qualified GATE-DA 2025",
        "description": "Data Science and Artificial Intelligence | RANK: 6505",
        "date": "March 2025",
        "icon": "fas fa-award"
    },
    {
        "title": "Qualified for Smart India Hackathon",
        "description": "Qualified at University level",
        "location": "Lucknow, India",
        "date": "November 2024",
        "icon": "fas fa-trophy"
    },
    {
        "title": "Qualified for the Penultimate Round of Hackofiesta",
        "description": "Hackathon held at IIIT Lucknow",
        "location": "Lucknow, India",
        "date": "April 2024",
        "icon": "fas fa-medal"
    }
]

education = [
    {
        "degree": "Bachelor of Technology",
        "institution": "University of Lucknow",
        "field": "Computer Science and Technology with Specialization in Artificial Intelligence",
        "location": "Lucknow, India",
        "period": "November 2022 – Present"
    },
    {
        "degree": "Class 12",
        "institution": "Delhi Public School, Jankipuram",
        "field": "Central Board of Secondary Education",
        "location": "Lucknow, India",
        "achievement": "94.6%"
    }
]

personal_info = {
    "name": "Arindam Shukla",
    "title": "Computer Science & AI Student",
    "email": "arindamshrish@gmail.com",
    # Phone number removed as requested
    "linkedin": "linkedin.com/in/arindam-shukla",
    "github": "github.com/Spartan1-1-7",
    "bio": "I'm a Computer Science student specializing in Artificial Intelligence with a focus on machine learning, deep learning, and data science. I'm passionate about developing solutions that leverage AI to solve real-world problems."
}

# Routes
@app.route('/')
def index():
    featured_projects = projects[:3]  # Get first 3 projects for homepage
    # Now also include achievements on the homepage
    return render_template('index.html', 
                           projects=featured_projects, 
                           info=personal_info,
                           skills=skills,
                           experiences=experiences,
                           achievements=achievements)

@app.route('/about')
def about():
    return render_template('about.html', 
                           info=personal_info, 
                           education=education,
                           experiences=experiences,
                           achievements=achievements)

@app.route('/projects')
def all_projects():
    category = request.args.get('category', None)
    
    if category and category != 'All':
        filtered_projects = [project for project in projects if project['category'] == category]
    else:
        filtered_projects = projects
        
    # Get unique categories for filtering
    categories = list(set(project['category'] for project in projects))
    categories.insert(0, 'All')
    
    return render_template('projects.html', 
                           projects=filtered_projects, 
                           categories=categories,
                           selected_category=category if category else 'All')

@app.route('/projects/<int:project_id>')
def project_detail(project_id):
    # Find the project by id
    project = None
    for p in projects:
        if p['id'] == project_id:
            project = p
            break
    
    if not project:
        abort(404)
    
    # For the selected projects, prepare detailed content
    if project['title'] == 'Seametry':
        project['content'] = """
        <h3>Project Details</h3>
        <p>Seametry is an innovative machine learning project focused on predicting oceanic salinity from temperature data. Using a combination of linear regression and support vector machines (SVM), the model achieves an impressive 85% accuracy in its predictions.</p>
        
        <h3>Dataset</h3>
        <p>The project utilizes a comprehensive dataset containing over 50,000 entries from Kaggle, representing various ocean temperature and salinity measurements across different regions and depths.</p>
        
        <h3>Methodology</h3>
        <ul>
            <li><strong>Exploratory Data Analysis (EDA):</strong> Thorough analysis of data distributions, correlations, and patterns.</li>
            <li><strong>Data Preprocessing:</strong> Handling missing values, outlier detection, and feature engineering.</li>
            <li><strong>Model Development:</strong> Implementation of both linear regression and SVM models for comparison.</li>
            <li><strong>Model Evaluation:</strong> Comprehensive evaluation using metrics like MSE, RMSE, and R² score.</li>
        </ul>
        
        <h3>Results</h3>
        <p>The final model demonstrates strong predictive capability with 85% accuracy on unseen data, making it a valuable tool for oceanographers and climate scientists who need to estimate salinity when direct measurements are unavailable.</p>
        """
        project['highlights'] = [
            "85% prediction accuracy on test data",
            "Processed 50,000+ data points",
            "Combined linear regression with SVM for optimal results",
            "Comprehensive data visualization components"
        ]
    
    elif project['title'] == 'Medical Chatbot':
        project['content'] = """
        <h3>Project Overview</h3>
        <p>The Medical Chatbot is an advanced natural language processing (NLP) application designed to provide accurate, context-aware responses to health-related queries. Built using state-of-the-art language models and retrieval techniques, this chatbot serves as a reliable first point of contact for medical information.</p>
        
        <h3>Key Technologies</h3>
        <p>The project leverages several cutting-edge technologies:</p>
        <ul>
            <li><strong>Chainlit:</strong> For creating an interactive chat interface with minimal code.</li>
            <li><strong>LangChain:</strong> To build complex conversational chains that maintain context.</li>
            <li><strong>Hugging Face Transformers:</strong> Providing the underlying language models for understanding and generating text.</li>
            <li><strong>FAISS:</strong> Facebook AI Similarity Search for efficient vector search to retrieve relevant medical information.</li>
        </ul>
        
        <h3>Development Process</h3>
        <p>The chatbot was developed through a systematic process:</p>
        <ol>
            <li>Collection and curation of medical information from reliable sources</li>
            <li>Preprocessing and vectorization of the knowledge base</li>
            <li>Integration of retrieval-augmented generation techniques</li>
            <li>Implementation of SQL querying for structured medical data</li>
            <li>Rigorous testing and evaluation against medical standards</li>
        </ol>
        
        <h3>Impact</h3>
        <p>This chatbot represents a significant step forward in accessible healthcare information. By providing accurate, contextualized responses to health queries, it helps users make more informed decisions about when to seek professional medical care.</p>
        """
        project['highlights'] = [
            "Context-aware responses to complex medical queries",
            "Retrieval-augmented generation for factual accuracy",
            "Integration with structured medical databases",
            "Privacy-first design with no storage of user health data"
        ]
        
    elif project['title'] == 'PetVision':
        project['content'] = """
        <h3>Project Description</h3>
        <p>PetVision is a sophisticated image classification system that can accurately distinguish between cats and dogs in photographs. Leveraging convolutional neural networks (CNNs), the project demonstrates the practical application of deep learning techniques to solve real-world computer vision problems.</p>
        
        <h3>Technical Implementation</h3>
        <p>The system is built using a multi-layered CNN architecture:</p>
        <ul>
            <li><strong>Data Preprocessing:</strong> Image normalization, augmentation, and resizing to enhance model robustness.</li>
            <li><strong>Model Architecture:</strong> Custom CNN with multiple convolutional layers, max-pooling, dropout for regularization, and dense layers.</li>
            <li><strong>Hyperparameter Tuning:</strong> Systematic optimization of learning rate, batch size, and network depth using grid search.</li>
            <li><strong>Inference API:</strong> RESTful API for real-time classification of new images.</li>
        </ul>
        
        <h3>Performance</h3>
        <p>The model achieves 80% accuracy on the challenging Kaggle Cats and Dogs dataset, which contains a wide variety of breeds, poses, and backgrounds. This performance demonstrates the system's robustness to real-world variability in pet imagery.</p>
        
        <h3>Applications</h3>
        <p>Beyond the academic exercise, PetVision has practical applications in:</p>
        <ul>
            <li>Automated pet monitoring systems</li>
            <li>Content moderation for pet-related social media</li>
            <li>Assisting animal shelters in cataloging rescued animals</li>
        </ul>
        """
        project['highlights'] = [
            "80% classification accuracy on Kaggle dataset",
            "Custom CNN architecture optimized for pet recognition",
            "Data augmentation to handle varied poses and backgrounds",
            "Real-time inference API for integration with other systems"
        ]
    
    # Find previous and next projects
    project_ids = [p['id'] for p in projects]
    current_index = project_ids.index(project_id)
    
    prev_project = projects[current_index - 1] if current_index > 0 else None
    next_project = projects[current_index + 1] if current_index < len(projects) - 1 else None
    
    # Get related projects (same category, excluding current)
    related_projects = [p for p in projects if p['category'] == project['category'] and p['id'] != project_id]
    # Limit to 3 related projects
    related_projects = related_projects[:3]
    
    return render_template('project_detail.html',
                          project=project,
                          prev_project=prev_project,
                          next_project=next_project,
                          related_projects=related_projects)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # In a real application, you would process the form data here
        # For now, we'll just redirect back to the contact page
        logging.debug(f"Received contact form submission: {request.form}")
        return redirect(url_for('contact', status='success'))
    
    status = request.args.get('status', None)
    return render_template('contact.html', info=personal_info, status=status)

@app.route('/download-resume')
def download_resume():
    try:
        return send_file('static/resume/Arindam_Resume.pdf', 
                         download_name='Arindam_Shukla_Resume.pdf', 
                         as_attachment=True)
    except FileNotFoundError:
        abort(404)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html', info=personal_info, error="Page not found"), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
