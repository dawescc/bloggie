function dataFetcher() {
    return {
        articles: [],
        topics: [],
        selectedTag: null,
        async fetchData() {
            await this.fetchArticles();
            this.fetchTopics();
        },
        async fetchArticles() {
            try {
                const response = await fetch("/api/articles");
                if (!response.ok) throw new Error("Network response was not ok.");
                let data = await response.json();
                // Assuming your timestamp is in a field called 'timestamp' and is ISO formatted
                data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                this.articles = data.map(article => ({
                    ...article,
                    // Ensure tags field exists and is a string before splitting
                    tags: article.tags ? article.tags.split(",") : [],
                }));
            } catch (error) {
                console.error("Fetch error:", error);
            }
        },        
        fetchTopics() {
            const allTags = new Set(this.articles.flatMap(article => article.tags));
            this.topics = Array.from(allTags).map(tag =>
                tag.charAt(0).toUpperCase() + tag.slice(1)
            );
        },
        get filteredArticles() {
            if (this.selectedTag === null) return this.articles;
            
            // Uncapitalize the tag before filtering
            const tagToCheck = this.selectedTag[0].toLowerCase() + this.selectedTag.substring(1);
            
            return this.articles.filter(article =>
                article.tags.includes(tagToCheck)
            );
        }        
    };
}