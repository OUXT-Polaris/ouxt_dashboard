import { NoEncryption } from "@material-ui/icons";
import { Octokit } from "@octokit/rest";

class Repository {
  private repository_name: string;
  private owner: string;
  private repository_url: string;
  private octokit: Octokit;

  /**
   * getTableData
   */
  public getTableData() {
    return {
      repository: this.repository_name,
      build_status: this.getStatusBadgeUrl("BuildTest.yaml"),
      latest_version: this.getLatestRelease(),
      url: this.repository_url,
    };
  }

  private getStatusBadgeUrl(workflow_filename: string): string {
    return (
      this.repository_url +
      "/actions/workflows/" +
      workflow_filename +
      "/badge.svg"
    );
  }
  private getLatestRelease(): string {
    let tag: string = "None";
    console.log({ owner: this.owner, repo: this.repository_name });
    this.octokit.rest.repos
      .getLatestRelease({ owner: this.owner, repo: this.repository_name })
      .then((response) => {
        tag = response.url;
      })
      .catch((error) => console.log(error.message));
    return tag;
  }
  constructor(repository_name: string, owner: string = "OUXT-Polaris") {
    this.repository_name = repository_name;
    this.owner = owner;
    this.repository_url =
      "https://github.com/" + owner + "/" + this.repository_name;
    this.octokit = new Octokit();
  }
}

export default Repository;
