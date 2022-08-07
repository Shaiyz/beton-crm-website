import React from "react";
import SearchTable from "../../components/SearchTable/SearchTable";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const Calls = () => {
  const { calls, loading } = useSelector((state) => state.calls);

  const columns = [
    { field: "id", title: "S#", width: 200, sortable: false },
    {
      field: "from",
      title: "From",
      width: 630,
    },
    {
      field: "client",
      title: "Client",
    },
    {
      field: "clientId",
      title: "Client ID",
      width: 630,
    },
    { field: "verified", title: "Verified" },
    {
      title: "Duration(s)",
      field: "duration",
      width: 630,
    },
    { title: "Created at", field: "createdAt" },
  ];
  let rows = [];
  if (calls) {
    let s = 1;
    calls.forEach((call) => {
      rows.push({
        id: s++,
        from: call.from.first_name + " " + call.from.last_name,
        client: call.to.name,
        clientId: call.to.clientId,
        verified: call.verified == true ? "Yes" : "No",
        duration: call.duration,
        createdAt: call.createdAt
          ? new Date(call.createdAt).toLocaleString()
          : "-",
      });
    });
  }
  return (
    <div className="feature">
      <Helmet title="Calls - CRM"></Helmet>
      <SearchTable
        rows={rows}
        columns={columns}
        header={"Calls"}
        path={"calls"}
        loading={loading}
      />
    </div>
  );
};

export default Calls;
