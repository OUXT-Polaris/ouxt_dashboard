import { ownerWindow } from "@material-ui/core";
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
    // console.log(info);
    await this.getLatestCommitDate().then((date) => {
      console.log(date);
      info.last_update = date;
    });
    // console.log(info);
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

  private async getLatestCommitDate() {
    const response = await this.octokit.rest.repos.getCommit({
      owner: this.owner,
      repo: this.repository_name,
      ref: this.branch,
    });
    if (response.headers["last-modified"] != null) {
      return response.headers["last-modified"];
    }
    return "Error";
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
