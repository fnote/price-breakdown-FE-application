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

  minorErrorFileName;

  isProcessing;

  constructor(obj) {
    this.jobId = obj.jobId;
    this.bunitId = obj.bunitId;
    this.status = obj.status;
    this.statusTime = obj.statusTime;
    this.startTime = obj.startTime;
    this.endTime = obj.endTime;
    this.fileName = obj.fileName;
    this.submittedUser = obj.submittedUser;
    this.minorErrorFileName = obj.minorErrorFileName || null;
    this.isProcessing = false;
  }

  static fromJson(obj) {
    return new JobDetail(obj);
  }
}

export default JobDetail;
