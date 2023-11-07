function dataFetcher() {
    return {
      articles: [],
      topics: [],
      selectedTag: null,
      async init() {
        await this.fetchData();
      },
      async fetchData() {
        const url = 'https://neutgwolrftsfsvfhutp.supabase.co/rest/v1/articles';
        const headers = {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldXRnd29scmZ0c2ZzdmZodXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNjY4ODYsImV4cCI6MjAxNDk0Mjg4Nn0.jeV6s1rVlm-l-Tgny8lPq0CQheCq10ch7xyjQ0P2G84',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldXRnd29scmZ0c2ZzdmZodXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNjY4ODYsImV4cCI6MjAxNDk0Mjg4Nn0.jeV6s1rVlm-l-Tgny8lPq0CQheCq10ch7xyjQ0P2G84',
          'Content-Type': 'application/json'
        };
  
        try {
          const response = await fetch(url, { headers });
          if (!response.ok) throw new Error('Network response was not ok');
          this.articles = await response.json();
          this.extractTopics();
        } catch (error) {
          console.error('Error fetching data from Supabase:', error);
        }
      },
      extractTopics() {
        this.topics = Array.from(new Set(this.articles.flatMap(article => article.tags)));
      },
      get filteredArticles() {
        return this.selectedTag 
          ? this.articles.filter(article => article.tags.includes(this.selectedTag))
          : this.articles;
      }
    };
  }
  
  // In your HTML, after Alpine.js is loaded:
  document.addEventListener('alpine:init', () => {
    Alpine.data('dataFetcher', dataFetcher);
  });
  