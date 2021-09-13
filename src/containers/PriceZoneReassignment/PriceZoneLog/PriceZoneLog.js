import React from "react";
import ScrollableTable from "../../../components/ScrollableTable";
import ReviewerSubmitter from "./ReviewerSubmitter";
import PriceZoneStatus from "./PriceZoneStatus";
import PzLogSummery from './PzLogSummery'



export default function PriceZoneLog() {
  const columns = [
    {
      title: "SUBMITTED BY",
      dataIndex: "subName",
      key: "subName",
      width: "15%",
      render: (text, record) => <ReviewerSubmitter un={record.subName}  subn={record.subNameID}/>,
    },
    {
      title: "REVIEWED BY",
      dataIndex: "subNameID",
      key: "subNameID",
      width: "15%",
      render: (text, record) => <ReviewerSubmitter un={record.rev_name} subn={record.revNameID}/>,
    },
    {
      title: "SUMMARY",
      dataIndex: "sum",
      key: "sum",
      width: "45%",
      render: (text, record) => <PzLogSummery/>,
    },
    {
      title: "STATUS",
      dataIndex: "st",
      key: "st",
      width: "15%",
      render: (text, record) => <PriceZoneStatus type={record.status}  />,
    },
  ];

  const data = [
    {
      key: "1",
      subName: "Michael lu",
      rev_name: "David Smith",
      date: "04 Aug 2020",
      subNameID: "milu8609",
      revNameID: "dvsm2351",
      status: "Approved",
    },
    {
      key: "2",
      subName: "David Smith",
      rev_name: "Michael lu",
      date: "04 Aug 2020",
      subNameID: "dvsm2351",
      revNameID: "milu8609",
      status: "Rejected",
    },
    {
      key: "3",
      subName: "Michael lu",
      rev_name: "David Smith",
      date: "04 Aug 2020",
      subNameID: "milu8609",
      revNameID: "dvsm2351",
      status: "Rejected",
    },
    {
      key: "4",
      subName:"David Smith",
      rev_name: "Michael lu",
      date: "04 Aug 2020",
      subNameID: "dvsm2351",
      revNameID: "milu8609",
      status: "Discarded",
    },
  ];
  return (
    <div className="pz-log-table-wrapper">
      <ScrollableTable columns={columns} dataSource={data}></ScrollableTable>
    </div>
  );
}
