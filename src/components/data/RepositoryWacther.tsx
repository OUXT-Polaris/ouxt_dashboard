import Repository from "./Repository";
import RepositoryInfo from "./RepositoryInfo";
import targets from "./targets.json";

class RepositoryWatcher {
  private repositories: Repository[];
  constructor() {
    this.repositories = [];
    targets.ros2.forEach((repository) => {
      const repo = new Repository(
        repository.name,
        "OUXT-Polaris",
        repository.branch
      );
      this.repositories.push(repo);
    });
  }
  /**
   * getTableData
   */
  public async getTableData() {
    var data = new Array<RepositoryInfo>(0);
    this.repositories.forEach((repository) => {
      repository.getTableData().then((row) => {
        data.push(row);
      });
    });
    return data;
  }
}

export default RepositoryWatcher;
