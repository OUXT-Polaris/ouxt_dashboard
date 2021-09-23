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
  public async getTableData() {
    var info: RepositoryInfo = {
      repository: this.repository_name,
      build_status: this.getStatusBadgeUrl("BuildTest.yaml"),
      last_update: "None",
      url: this.repository_url,
      branch: this.branch,
    };
    this.getLatestCommitDate().then((data) => {
      info.last_update = data;
    });
    return info;
  }

  private getStatusBadgeUrl(workflow_filename: string): string {
    return (
      this.repository_url +
      "/actions/workflows/" +
      workflow_filename +
      "/badge.svg"
    );
  }

  private getLatestCommitDate(): Promise<string> {
    this.octokit.rest.repos
      .getCommit({
        owner: this.owner,
        repo: this.repository_name,
        ref: this.branch,
      })
      .then((response) => {
        if (response.headers["last-modified"] != null) {
          return new Promise((resolve) => {
            resolve(response.headers["last-modified"]);
          });
        }
      })
      .catch((error) => console.log(error.message));
    return new Promise((reject) => {
      reject("Error");
    });
  }

  constructor(repository_name: string, owner: string, branch: string) {
    this.repository_name = repository_name;
    this.owner = owner;
    this.repository_url =
      "https://github.com/" + owner + "/" + this.repository_name;
    this.branch = branch;
    this.octokit = new Octokit();
  }
}

export default Repository;
