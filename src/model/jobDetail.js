/**
 * Job detail model class
 *
 * @author: cwic0864 on 06/01/2021
 */
class JobDetail {
  jobId;

  bunitId;

  status;

  statusTime;

  startTime;

  endTime;

  fileName;

  submittedUser;

  minorErrorFileName = null;

  constructor(jobId, bunitId, status, statusTime, startTime, endTime, fileName, submittedUser) {
    this.jobId = jobId;
    this.bunitId = bunitId;
    this.status = status;
    this.statusTime = statusTime;
    this.startTime = startTime;
    this.endTime = endTime;
    this.fileName = fileName;
    this.submittedUser = submittedUser;
  }

  static fromJson(obj) {
    return new JobDetail(
        obj.jobId, obj.bunitId, obj.status, obj.statusTime, obj.startTime, obj.endTime, obj.fileName, obj.submittedUser);
  }
}

export default JobDetail;
