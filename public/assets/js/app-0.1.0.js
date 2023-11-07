// Initialize Supabase client
const supabaseUrl = 'https://neutgwolrftsfsvfhutp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldXRnd29scmZ0c2ZzdmZodXRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNjY4ODYsImV4cCI6MjAxNDk0Mjg4Nn0.jeV6s1rVlm-l-Tgny8lPq0CQheCq10ch7xyjQ0P2G84';
const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey);

document.addEventListener('alpine:init', () => {
  Alpine.data('dataFetcher', () => ({
    articles: [],
    topics: [],
    selectedTag: null,
    async fetchData() {
      let { data: articles, error } = await supabase
        .from('articles')
        .select('*');

      if (error) {
        console.error('Error fetching articles:', error);
        return;
      }

      this.articles = articles;
      this.topics = this.extractTopics(articles);
    },
    extractTopics(articles) {
      const topics = new Set();
      articles.forEach(article => {
        article.tags.forEach(tag => topics.add(tag));
      });
      return Array.from(topics);
    },
    get filteredArticles() {
      if (!this.selectedTag) {
        return this.articles;
      }
      return this.articles.filter(article => article.tags.includes(this.selectedTag));
    },
    init() {
      this.fetchData();
    },
  }));
});
