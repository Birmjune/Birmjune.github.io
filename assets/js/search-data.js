// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-news",
          title: "News",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-research",
          title: "Research",
          description: "Research interests and publications.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A collection of things I&#39;ve built.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "My curriculum vitae. Use the button above to download the PDF.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "news-won-a-gold-medal-at-the-korean-mathematical-olympiad-kmo",
          title: 'Won a Gold Medal at the Korean Mathematical Olympiad (KMO).',
          description: "",
          section: "News",},{id: "news-selected-for-the-national-science-amp-amp-technology-scholarship",
          title: 'Selected for the National Science &amp;amp;amp; Technology Scholarship.',
          description: "",
          section: "News",},{id: "news-placed-8th-in-the-team-division-of-the-simon-marais-mathematics-competition",
          title: 'Placed 8th in the Team division of the Simon Marais Mathematics Competition.',
          description: "",
          section: "News",},{id: "news-launched-my-personal-website",
          title: 'Launched my personal website.',
          description: "",
          section: "News",},{id: "news-reached-the-finals-of-the-samsung-collegiate-programming-challenge-ai-track-with-image2answer",
          title: 'Reached the finals of the Samsung Collegiate Programming Challenge (AI track) with Image2Answer....',
          description: "",
          section: "News",},{id: "news-placed-in-the-top-100-at-the-2025-nypc-code-battle",
          title: 'Placed in the top 100 at the 2025 NYPC Code Battle.',
          description: "",
          section: "News",},{id: "news-won-the-entrepreneur-award-best-idea-at-the-3rd-skyst-joint-hackathon",
          title: 'Won the Entrepreneur Award (Best Idea) at the 3rd SKYST Joint Hackathon.',
          description: "",
          section: "News",},{id: "news-started-a-research-internship-at-the-snu-machine-learning-lab-prof-hyun-oh-song",
          title: 'Started a research internship at the SNU Machine Learning Lab (Prof. Hyun Oh...',
          description: "",
          section: "News",},{id: "projects-easy-arc-agi-challenge-solver",
          title: 'Easy ARC-AGI Challenge Solver',
          description: "A solver for ARC-AGI abstract reasoning tasks on grids up to 10x10. Private score 63/100.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/arc_agi_solver/";
            },},{id: "projects-image2answer-4-option-mcq-solver",
          title: 'Image2Answer: 4-Option MCQ Solver',
          description: "A vision-language pipeline that answers image-based multiple-choice questions. Advanced to the finals of the Samsung Collegiate Programming Challenge (AI track).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/image2answer/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%6F%68%6E%62%69%65%30%36%32%37@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Birmjune", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },];
