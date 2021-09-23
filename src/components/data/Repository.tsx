import { NoEncryption } from "@material-ui/icons";
import { Octokit } from "@octokit/rest";
import { Interface } from "readline";

import RepositoryInfo from "./RepositoryInfo";

class Repository {
  private repository_name: string;
  private owner: string;
  private repository_url: string;
  private branch: string;
  private octokit: Octokit;

  /**
   * getTableData
   */
  public getTableData(): RepositoryInfo {
    return {
      repository: this.repository_name,
      build_status: this.getStatusBadgeUrl("BuildTest.yaml"),
      last_update: this.getLatestCommitDate(),
      url: this.repository_url,
      branch: this.branch,
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
    this.octokit.rest.repos
      .getLatestRelease({ owner: this.owner, repo: this.repository_name })
      .then((response) => {
        tag = response.url;
      })
      .catch((error) => console.log(error.message));
    return tag;
  }
  constructor(repository_name: string, owner: string, branch: string) {
    this.repository_name = repository_name;
    this.owner = owner;
    this.repository_url =
      "https://github.com/" + owner + "/" + this.repository_name;
    this.branch = branch;
    this.octokit = new Octokit();
  }

  private getLatestCommitDate(): string {
    let commit_date: string = "None";
    this.octokit.rest.repos
      .getCommit({
        owner: this.owner,
        repo: this.repository_name,
        ref: this.branch,
      })
      .then((response) => {
        if (response.headers.date != null) {
          commit_date = response.headers.date;
        }
      })
      .catch((error) => console.log(error.message));
    return commit_date;
  }
}

export default Repository;
