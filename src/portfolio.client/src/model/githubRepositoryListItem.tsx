class GithubRepositoryListItem {
    name: string;
    description: string;
    readme: string;
    constructor(name: string, description: string, readme: string) {
        this.name = name;
        this.description = description;
        this.readme = readme;
    }
}

export default GithubRepositoryListItem;