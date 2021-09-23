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
  public getTableData(): RepositoryInfo[] {
    var data = new Array<RepositoryInfo>(0);
    this.repositories.forEach((repository) => {
      data.push(repository.getTableData());
    });
    return data;
  }
}

export default RepositoryWatcher;
