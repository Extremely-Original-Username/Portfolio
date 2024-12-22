import GithubListProps from "../model/props/githubListProps";

const GitHubList = (props: GithubListProps) => {
    const getReposUrl = "https://api.github.com/users/" + props.user + "/repos"
    return (
        <div>
            
        </div>
    )
}

export default GitHubList;